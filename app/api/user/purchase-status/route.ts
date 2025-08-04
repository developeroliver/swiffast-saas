import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getUserPurchasedProducts } from "@/lib/db";
import type { PurchaseStatus } from "@/lib/types";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const purchasedProducts = await getUserPurchasedProducts(userId);

    const status: PurchaseStatus = {
      hasPremium: purchasedProducts.some((p) =>
        p.name.toLowerCase().includes("premium")
      ),
      hasStarter: purchasedProducts.some((p) =>
        p.name.toLowerCase().includes("starter")
      ),
      productsCount: purchasedProducts.length,
      products: purchasedProducts.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        stripeId: p.stripeId,
      })),
    };

    return NextResponse.json(status);
  } catch (error) {
    console.error("Erreur lors de la vérification du statut:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
