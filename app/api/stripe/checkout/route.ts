import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return NextResponse.json(
        { error: "Authentification requise" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const priceId = formData.get("priceId") as string;

    if (!priceId) {
      return NextResponse.json({ error: "Price ID manquant" }, { status: 400 });
    }

    // Vérifier que le prix existe dans Stripe
    let price;
    try {
      price = await stripe.prices.retrieve(priceId);
      if (!price.active) {
        return NextResponse.json(
          { error: "Ce produit n'est plus disponible" },
          { status: 400 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }

    // Créer ou récupérer l'utilisateur en base
    let dbUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: userId,
          email: user.emailAddresses[0]?.emailAddress || "",
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        },
      });
    }

    // Vérifier si l'utilisateur n'a pas déjà acheté ce produit
    if (price.product && typeof price.product === "string") {
      const existingPurchase = await prisma.purchase.findFirst({
        where: {
          userId: userId,
          product: {
            stripeId: price.product,
          },
          status: "COMPLETED",
        },
        include: {
          product: true,
        },
      });

      if (existingPurchase) {
        // Rediriger vers une belle page au lieu de renvoyer du JSON
        const redirectUrl = new URL("/already-purchased", req.url);
        redirectUrl.searchParams.set("product", existingPurchase.product.name);
        return NextResponse.redirect(redirectUrl);
      }
    }

    // Créer la session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      customer_email: dbUser.email,
      client_reference_id: userId,
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      metadata: {
        userId: userId,
      },
    });

    return NextResponse.redirect(session.url!, 303);
  } catch (error) {
    console.error("Erreur lors de la création de la session Checkout:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la session de paiement" },
      { status: 500 }
    );
  }
}
