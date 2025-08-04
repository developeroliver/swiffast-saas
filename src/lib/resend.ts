import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not defined");
}

export const resend = new Resend(process.env.RESEND_API_KEY);

// Configuration par défaut
export const EMAIL_CONFIG = {
  from: "Mon SaaS <noreply@monssaas.com>", // Change par ton domaine plus tard
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@monssaas.com",
  appName: process.env.NEXT_PUBLIC_APP_NAME || "Mon SaaS",
  baseUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
};
