import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { webhookRateLimit } from "@/lib/rate-limit";
import { stripeWebhookSchema, userSchema } from "@/lib/validations";
import Stripe from "stripe";
import { headers } from "next/headers";
import { sendPurchaseSuccessEmail } from "@/lib/email-service";

export async function POST(req: NextRequest) {
  // Rate limiting
  const rateLimitResult = webhookRateLimit.check(req);
  if (!rateLimitResult.success) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const body = await req.text();

  // FIX: Await headers() avant d'utiliser .get()
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    console.error("Signature Stripe manquante");
    return NextResponse.json({ error: "Signature manquante" }, { status: 400 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("STRIPE_WEBHOOK_SECRET non configuré");
    return NextResponse.json(
      { error: "Configuration serveur manquante" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    const error = err as Error;
    console.error("Erreur de signature webhook Stripe:", error.message);
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  // Validation du schéma de base
  const validatedEvent = stripeWebhookSchema.safeParse(event);
  if (!validatedEvent.success) {
    console.error("Format d'événement invalide:", validatedEvent.error);
    return NextResponse.json(
      { error: "Format d'événement invalide" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(
          event.data.object as Stripe.Checkout.Session
        );
        break;

      case "payment_intent.payment_failed":
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      case "invoice.payment_succeeded":
        // Pour les abonnements récurrents (future étape)
        console.log("Invoice payment succeeded:", event.data.object.id);
        break;

      default:
        console.log(`Type d'événement non géré: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erreur lors du traitement du webhook:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid") {
    console.log("Session non payée, ignorée:", session.id);
    return;
  }

  // Validation des métadonnées
  const userId = session.metadata?.userId || session.client_reference_id;
  if (!userId) {
    throw new Error("User ID manquant dans les métadonnées");
  }

  // Récupérer les détails de la session
  const sessionWithDetails = await stripe.checkout.sessions.retrieve(
    session.id,
    { expand: ["line_items", "line_items.data.price.product"] }
  );

  const lineItem = sessionWithDetails.line_items?.data[0];
  const product = lineItem?.price?.product as Stripe.Product;

  if (!lineItem || !product) {
    throw new Error("Détails du produit manquants");
  }

  // Récupérer l'utilisateur depuis la base de données
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error(`Utilisateur non trouvé: ${userId}`);
  }

  // Transaction pour assurer la cohérence
  await prisma.$transaction(async (tx) => {
    // Créer ou récupérer le produit en base
    let dbProduct = await tx.product.findUnique({
      where: { stripeId: product.id },
    });

    if (!dbProduct) {
      dbProduct = await tx.product.create({
        data: {
          name: product.name,
          description: product.description || "",
          price: lineItem.amount_total || 0,
          currency: session.currency || "EUR",
          stripeId: product.id,
          active: product.active,
        },
      });
    }

    // 🚀 AJOUT MANQUANT : Créer l'enregistrement Purchase
    const purchase = await tx.purchase.create({
      data: {
        userId: userId,
        productId: dbProduct.id,
        stripeSessionId: session.id,
        stripePaymentId: session.payment_intent as string,
        amount: session.amount_total || 0,
        currency: session.currency || "EUR",
        status: "COMPLETED",
      },
    });

    console.log("💾 Purchase créé avec l'ID:", purchase.id);

    try {
      const isPremium = dbProduct.name.toLowerCase().includes("premium");

      console.log("📧 Envoi de l'email de confirmation...");

      const emailResult = await sendPurchaseSuccessEmail({
        userFirstName: user.firstName || "Cher utilisateur",
        userEmail: user.email,
        productName: dbProduct.name,
        productDescription: dbProduct.description || "",
        purchaseAmount: session.amount_total || 0,
        currency: session.currency || "EUR",
        purchaseDate: new Date(),
        isPremium,
      });

      if (emailResult.success) {
        console.log(
          `✅ Email de confirmation envoyé à ${user.email} (ID: ${emailResult.id})`
        );
      } else {
        console.error(`❌ Échec envoi email:`, emailResult.error);
      }
    } catch (emailError) {
      console.error("❌ Erreur lors de l'envoi de l'email:", emailError);
    }

    // 🔍 LOGS POUR TESTER L'EMAIL (temporaire)
    try {
      const isPremium = dbProduct.name.toLowerCase().includes("premium");

      console.log("🎉 ===== DONNÉES POUR L'EMAIL =====");
      console.log("📧 Email utilisateur:", user.email);
      console.log("👤 Prénom:", user.firstName || "Utilisateur");
      console.log("📦 Produit:", dbProduct.name);
      console.log("📝 Description:", dbProduct.description);
      console.log(
        "💰 Montant:",
        (session.amount_total || 0) / 100,
        session.currency
      );
      console.log("👑 Est Premium:", isPremium);
      console.log("📅 Date:", new Date().toLocaleDateString("fr-FR"));
      console.log(
        "🌐 Dashboard URL:",
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`
      );
      console.log(
        "⭐ Premium URL:",
        `${process.env.NEXT_PUBLIC_APP_URL}/premium`
      );
      console.log("=====================================");

      console.log("✅ Email sera envoyé à:", user.email);
    } catch (emailError) {
      console.error("Erreur lors de la préparation de l'email:", emailError);
    }
  });

  console.log(`Achat enregistré avec succès pour l'utilisateur ${userId}`);
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  const userId = paymentIntent.metadata?.userId;

  if (!userId) {
    console.log("User ID manquant pour le paiement échoué:", paymentIntent.id);
    return;
  }

  // Marquer les achats en attente comme échoués
  await prisma.purchase.updateMany({
    where: {
      stripePaymentId: paymentIntent.id,
      status: "PENDING",
    },
    data: {
      status: "FAILED",
    },
  });

  console.log(`Paiement échoué traité pour l'utilisateur ${userId}`);
}
