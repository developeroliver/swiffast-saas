import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Créer des produits de test
  const product1 = await prisma.product.upsert({
    where: { stripeId: "prod_test_1" },
    update: {},
    create: {
      name: "Accès Premium",
      description: "Accès complet à toutes les fonctionnalités premium",
      price: 2999, // 29,99€
      currency: "EUR",
      stripeId: "prod_test_1",
      active: true,
    },
  });

  const product2 = await prisma.product.upsert({
    where: { stripeId: "prod_test_2" },
    update: {},
    create: {
      name: "Pack Starter",
      description: "Pack d'entrée avec les fonctionnalités essentielles",
      price: 999, // 9,99€
      currency: "EUR",
      stripeId: "prod_test_2",
      active: true,
    },
  });

  console.log("Produits créés:", { product1, product2 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
