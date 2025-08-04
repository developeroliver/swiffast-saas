interface LogContext {
  userId?: string;
  action?: string;
  metadata?: Record<string, unknown>;
}

class Logger {
  private isDev = process.env.NODE_ENV === "development";

  info(message: string, context?: LogContext) {
    console.log(this.formatMessage("INFO", message, context));
  }

  error(message: string, error?: Error, context?: LogContext) {
    console.error(this.formatMessage("ERROR", message, context));
    if (error) console.error(error.stack);

    // En production, tu peux envoyer vers un service comme Sentry
    if (!this.isDev) {
      this.sendToMonitoring("error", message, error, context);
    }
  }

  warn(message: string, context?: LogContext) {
    console.warn(this.formatMessage("WARN", message, context));
  }

  private formatMessage(level: string, message: string, context?: LogContext) {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` | Context: ${JSON.stringify(context)}` : "";
    return `[${timestamp}] ${level}: ${message}${contextStr}`;
  }

  private sendToMonitoring(
    level: string,
    message: string,
    error?: Error,
    context?: LogContext
  ) {
    // Implémente l'envoi vers ton service de monitoring
    // Ex: Sentry, LogRocket, etc.
  }
}

export const logger = new Logger();
