import { Suspense } from "react";
import { CheckCircle, Crown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { getUserPurchasedProducts } from "@/lib/db";

async function SuccessContent() {
  const user = await currentUser();
  let purchasedProducts: any[] = [];
  let hasPremium = false;

  if (user) {
    try {
      purchasedProducts = await getUserPurchasedProducts(user.id);
      hasPremium = purchasedProducts.some((p) =>
        p.name.toLowerCase().includes("premium")
      );
    } catch (error) {
      console.log("Error fetching purchased products:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-3xl text-green-600">
                Paiement réussi !
              </CardTitle>
              <CardDescription className="text-lg">
                Votre achat a été confirmé avec succès
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {purchasedProducts.length > 0 && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                    <Crown className="h-5 w-5" />
                    Vous avez maintenant accès à :
                  </h3>
                  <ul className="space-y-2">
                    {purchasedProducts.map((product) => (
                      <li
                        key={product.id}
                        className="flex items-center gap-2 text-green-700"
                      >
                        <CheckCircle className="h-4 w-4" />
                        {product.name} - {product.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="text-center text-gray-600">
                <p className="mb-4">
                  {hasPremium
                    ? "Vous pouvez maintenant accéder à toutes les fonctionnalités premium dans votre dashboard."
                    : "Vos nouvelles fonctionnalités sont maintenant disponibles dans votre dashboard."}
                </p>
                <p className="text-sm">
                  Un email de confirmation a été envoyé à votre adresse.
                </p>
              </div>

              <div className="space-y-3">
                <Link href={hasPremium ? "/premium" : "/dashboard"}>
                  <Button className="w-full" size="lg">
                    {hasPremium ? (
                      <>
                        <Crown className="h-4 w-4 mr-2" />
                        Explorer le contenu Premium
                      </>
                    ) : (
                      <>
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Accéder au Dashboard
                      </>
                    )}
                  </Button>
                </Link>

                <Link href="/">
                  <Button variant="outline" className="w-full">
                    Retour à l'accueil
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Chargement...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
