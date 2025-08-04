import { resend, EMAIL_CONFIG } from "./resend";
import { PurchaseSuccessEmail } from "@/emails/PurchaseSuccessEmail";
import { render } from "@react-email/render";

export interface EmailData {
  userFirstName: string;
  userEmail: string;
  productName: string;
  productDescription: string;
  purchaseAmount: number; // en centimes
  currency: string;
  purchaseDate: Date;
  isPremium: boolean;
}

export async function sendPurchaseSuccessEmail(data: EmailData) {
  try {
    // Formater le montant
    const formattedAmount = `${(data.purchaseAmount / 100).toFixed(2)}${data.currency === "EUR" ? "€" : data.currency}`;

    // Formater la date
    const formattedDate = data.purchaseDate.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // URLs
    const dashboardUrl = `${EMAIL_CONFIG.baseUrl}/dashboard`;
    const premiumUrl = `${EMAIL_CONFIG.baseUrl}/premium`;

    // Générer l'email HTML
    const emailHtml = await render(
      PurchaseSuccessEmail({
        userFirstName: data.userFirstName,
        productName: data.productName,
        productDescription: data.productDescription,
        purchaseAmount: formattedAmount,
        purchaseDate: formattedDate,
        isPremium: data.isPremium,
        dashboardUrl,
        premiumUrl,
        supportEmail: EMAIL_CONFIG.supportEmail,
        appName: EMAIL_CONFIG.appName,
      })
    );

    // Envoyer l'email
    const result = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: [data.userEmail],
      subject: `🎉 Votre achat ${data.productName} est confirmé !`,
      html: emailHtml,
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
      },
    });

    console.log("✅ Email envoyé avec succès ! ID:", result.data?.id);
    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi de l'email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue",
    };
  }
}
