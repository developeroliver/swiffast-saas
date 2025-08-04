import { NextResponse } from "next/server";
import { PurchaseSuccessEmail } from "@/emails/PurchaseSuccessEmail";
import { render } from "@react-email/render";

export async function GET() {
  const html = await render(
    PurchaseSuccessEmail({
      userFirstName: "John",
      productName: "Accès Premium",
      productDescription: "Accès complet à toutes les fonctionnalités premium",
      purchaseAmount: "29,99€",
      purchaseDate: "15 décembre 2024",
      isPremium: true,
      dashboardUrl: "http://localhost:3000/dashboard",
      premiumUrl: "http://localhost:3000/premium",
      supportEmail: "support@monssaas.com",
      appName: "Mon SaaS",
    })
  );

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
