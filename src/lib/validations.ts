import { z } from "zod";

// Validation pour les webhooks Stripe
export const stripeWebhookSchema = z.object({
  id: z.string(),
  type: z.string(),
  data: z.object({
    object: z.any(),
  }),
});

// Validation pour les données utilisateur
export const userSchema = z.object({
  id: z.string().min(1),
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  imageUrl: z.string().url().optional(),
});

// Validation pour les achats
export const purchaseSchema = z.object({
  userId: z.string().min(1),
  productId: z.string().min(1),
  amount: z.number().positive(),
  currency: z.string().length(3),
  status: z.enum(["PENDING", "COMPLETED", "FAILED", "REFUNDED"]),
});

// Validation pour les paramètres de checkout
export const checkoutSchema = z.object({
  priceId: z.string().min(1, "Price ID est requis"),
});

// Validation pour les paramètres de query
export const queryParamsSchema = z.object({
  sessionId: z.string().optional(),
  canceled: z.string().optional(),
});
