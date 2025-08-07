import { NextRequest } from "next/server";

interface RateLimitConfig {
  interval: number; // en millisecondes
  uniqueTokenPerInterval: number; // nombre de requêtes autorisées
}

class RateLimiter {
  private cache = new Map();

  constructor(private config: RateLimitConfig) {}

  check(request: NextRequest, limit = this.config.uniqueTokenPerInterval) {
    const token = this.getToken(request);
    const tokenCount = (this.cache.get(token) || [0, Date.now()]) as [
      number,
      number,
    ];

    if (Date.now() - tokenCount[1] > this.config.interval) {
      this.cache.set(token, [1, Date.now()]);
      return { success: true };
    }

    if (tokenCount[0] >= limit) {
      return {
        success: false,
        resetTime: new Date(tokenCount[1] + this.config.interval),
      };
    }

    tokenCount[0] += 1;
    this.cache.set(token, tokenCount);
    return { success: true };
  }

  private getToken(request: NextRequest) {
    // Récupérer l'IP client via les headers
    const forwarded = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const cfConnectingIp = request.headers.get("cf-connecting-ip"); // Cloudflare

    // Priorité: Cloudflare > Real-IP > Forwarded > connexion directe
    const ip =
      cfConnectingIp ||
      realIp ||
      (forwarded ? forwarded.split(",")[0].trim() : null) ||
      request.nextUrl.hostname ||
      "anonymous";

    return ip;
  }

  // Méthode utilitaire pour nettoyer le cache périodiquement
  cleanup() {
    const now = Date.now();
    for (const [token, [timestamp]] of this.cache.entries()) {
      if (now - timestamp > this.config.interval) {
        this.cache.delete(token);
      }
    }
  }
}

// Limiteurs pour différents endpoints
export const generalRateLimit = new RateLimiter({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 30, // 30 requêtes par minute
});

export const checkoutRateLimit = new RateLimiter({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 5, // 5 tentatives de checkout par minute
});

export const webhookRateLimit = new RateLimiter({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 100, // 100 webhooks par minute
});

// Fonction utilitaire pour obtenir l'IP client (optionnel)
export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");

  return (
    cfConnectingIp ||
    realIp ||
    (forwarded ? forwarded.split(",")[0].trim() : null) ||
    request.nextUrl.hostname ||
    "anonymous"
  );
}

// Nettoyage automatique du cache toutes les 5 minutes
setInterval(
  () => {
    generalRateLimit.cleanup();
    checkoutRateLimit.cleanup();
    webhookRateLimit.cleanup();
  },
  5 * 60 * 1000
);
