import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { webhookRateLimit } from "@/lib/rate-limit";
import { stripeWebhookSchema } from "@/lib/validations";
import Stripe from "stripe";
import { headers } from "next/headers";
import PurchaseConfirmationEmail from "@/emails/purchase-confirmation";

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

    // Créer l'enregistrement Purchase
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

    // 📧 ENVOI DE L'EMAIL DE CONFIRMATION AVEC RESEND
    try {
      // Générer un numéro de commande unique
      const orderNumber = `SW-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

      // URL du dashboard
      const dashboardLink = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`;

      console.log("📧 Envoi de l'email de confirmation avec Resend...");

      // 🚀 CONFIGURATION PROD/DEV
      const isProduction = process.env.NODE_ENV === "production";

      // En dev: utilise ton email, en prod: email du vrai client
      const emailToSend = isProduction
        ? user.email
        : "developpeur.olive@gmail.com";

      // En dev: resend.dev, en prod: ton domaine vérifié
      const fromEmail = isProduction
        ? "SwiftFast <noreply@swiftfast.com>" // 👈 REMPLACE par ton vrai domaine
        : "SwiftFast <onboarding@resend.dev>";

      const emailResult = await resend.emails.send({
        from: fromEmail,
        to: emailToSend,
        subject: "🎉 Merci pour votre achat - SwiftFast",
        react: PurchaseConfirmationEmail({
          customerName: user.firstName || user.email.split("@")[0],
          productName: dbProduct.name,
          amount: session.amount_total || 0,
          currency: session.currency || "EUR",
          orderNumber: orderNumber,
          dashboardLink: dashboardLink,
        }),
      });

      if (isProduction) {
        console.log(`✅ Email PROD envoyé à ${user.email}`);
      } else {
        console.log(
          `✅ Email DEV envoyé à ${emailToSend} (original: ${user.email})`
        );
      }

      console.log(`📧 ID Email Resend: ${emailResult.data?.id}`);

      // Optionnel : sauvegarder l'ID de l'email dans la purchase
      if (emailResult.data?.id) {
        await tx.purchase.update({
          where: { id: purchase.id },
          data: {
            // Si tu as un champ emailId dans ton schema Prisma
            // emailId: emailResult.data.id
          },
        });
      }
    } catch (emailError) {
      console.error("❌ Erreur lors de l'envoi de l'email:", emailError);

      // Log détaillé de l'erreur pour debugging
      if (emailError instanceof Error) {
        console.error("❌ Message d'erreur:", emailError.message);
        console.error("❌ Stack trace:", emailError.stack);
      }

      // En production, tu pourrais vouloir envoyer une notification d'erreur
      if (process.env.NODE_ENV === "production") {
        // TODO: Envoyer notification Slack/Discord d'échec email
        // ou sauvegarder dans une table "failed_emails" pour retry
      }

      // L'email échoue mais on ne fait pas échouer tout le processus
      // Le paiement et la purchase sont quand même enregistrés
    }
  });

  console.log(`✅ Achat enregistré avec succès pour l'utilisateur ${userId}`);
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
