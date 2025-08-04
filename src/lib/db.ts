import { prisma } from "./prisma";
import { currentUser } from "@clerk/nextjs/server";

// Créer ou récupérer un utilisateur depuis Clerk
export async function createOrGetUser() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    throw new Error("Utilisateur non connecté");
  }

  // Vérifier si l'utilisateur existe déjà
  let user = await prisma.user.findUnique({
    where: { id: clerkUser.id },
  });

  // Si pas trouvé, créer l'utilisateur
  if (!user) {
    user = await prisma.user.create({
      data: {
        id: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        imageUrl: clerkUser.imageUrl,
      },
    });
  }

  return user;
}

// Vérifier si un utilisateur a acheté un produit
export async function userHasPurchased(userId: string, productId: string) {
  const purchase = await prisma.purchase.findFirst({
    where: {
      userId,
      productId,
      status: "COMPLETED",
    },
  });

  return !!purchase;
}

// Récupérer tous les achats d'un utilisateur
export async function getUserPurchases(userId: string) {
  return await prisma.purchase.findMany({
    where: { userId },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// Récupérer l'abonnement actif d'un utilisateur
export async function getUserActiveSubscription(userId: string) {
  return await prisma.subscription.findFirst({
    where: {
      userId,
      status: "ACTIVE",
    },
  });
}

// Vérifier si un utilisateur a acheté un produit spécifique
export async function userHasPurchasedProduct(
  userId: string,
  productStripeId: string
) {
  const product = await prisma.product.findUnique({
    where: { stripeId: productStripeId },
  });

  if (!product) return false;

  const purchase = await prisma.purchase.findFirst({
    where: {
      userId,
      productId: product.id,
      status: "COMPLETED",
    },
  });

  return !!purchase;
}

// Récupérer tous les produits achetés par un utilisateur
export async function getUserPurchasedProducts(userId: string) {
  const purchases = await prisma.purchase.findMany({
    where: {
      userId,
      status: "COMPLETED",
    },
    include: {
      product: true,
    },
  });

  return purchases.map((p) => p.product);
}
