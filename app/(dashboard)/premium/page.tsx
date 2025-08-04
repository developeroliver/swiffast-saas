import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Download, BarChart3, Settings, Users } from "lucide-react";
import Header from "@/components/layout/Header";
import PremiumContent from "@/components/layout/PremiumContent";
import { getUserPurchasedProducts } from "@/lib/db";

export default async function PremiumPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const purchasedProducts = await getUserPurchasedProducts(user.id);
  const hasPremium = purchasedProducts.some((p) =>
    p.name.toLowerCase().includes("premium")
  );
  const hasStarter = purchasedProducts.some((p) =>
    p.name.toLowerCase().includes("starter")
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Crown className="h-8 w-8 text-yellow-500" />
            <h1 className="text-3xl font-bold text-foreground">
              Contenu Premium
            </h1>
          </div>
          <p className="text-gray-400">
            Accédez à vos fonctionnalités exclusives selon vos achats
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contenu Premium */}
          <PremiumContent
            productStripeId="prod_test_1" // Remplace par ton vrai Product ID Premium
            fallback={
              <Card className="border-purple-200">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Crown className="h-6 w-6 text-purple-500" />
                    <CardTitle>Fonctionnalités Premium</CardTitle>
                  </div>
                  <CardDescription>
                    Achetez l&apos;Accès Premium pour débloquer toutes les
                    fonctionnalités
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4 text-sm text-gray-400">
                    <li>• Analytics avancés</li>
                    <li>• Projets illimités</li>
                    <li>• API Access</li>
                    <li>• Support prioritaire 24/7</li>
                    <li>• Stockage 100GB</li>
                  </ul>
                  <Button className="w-full">
                    Acheter Accès Premium - 29,99€
                  </Button>
                </CardContent>
              </Card>
            }
          >
            {/* <Card className="border-purple-200">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Crown className="h-6 w-6 text-purple-500" />
                  <CardTitle className="text-purple-700">
                    Fonctionnalités Premium
                  </CardTitle>
                </div>
                <CardDescription>
                  ✅ Vous avez accès à toutes les fonctionnalités premium
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">
                    Analytics Avancés
                  </h3>
                  <p className="text-purple-700 text-sm mb-3">
                    Analysez vos performances en détail
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="bg-white p-2 rounded border text-center">
                      <div className="text-lg font-bold text-blue-600">
                        1.2k
                      </div>
                      <div className="text-xs text-gray-600">Vues</div>
                    </div>
                    <div className="bg-white p-2 rounded border text-center">
                      <div className="text-lg font-bold text-green-600">
                        89%
                      </div>
                      <div className="text-xs text-gray-600">Conversion</div>
                    </div>
                    <div className="bg-white p-2 rounded border text-center">
                      <div className="text-lg font-bold text-purple-600">
                        €247
                      </div>
                      <div className="text-xs text-gray-600">Revenus</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" size="sm">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Rapport détaillé
                  </Button>
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Gestion équipe
                  </Button>
                </div>

                <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Crown className="h-4 w-4 text-yellow-600" />
                    <span className="font-semibold text-yellow-800">
                      API Access
                    </span>
                  </div>
                  <p className="text-yellow-700 text-sm">
                    Votre clé API :{" "}
                    <code className="bg-yellow-100 px-1 rounded">
                      sk_live_abc123...
                    </code>
                  </p>
                </div>
              </CardContent>
            </Card> */}
          </PremiumContent>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Mes achats</CardTitle>
              <CardDescription>Aperçu de vos produits achetés</CardDescription>
            </CardHeader>
            <CardContent>
              {purchasedProducts.length > 0 ? (
                <div className="space-y-3">
                  {purchasedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
                    >
                      <div>
                        <div className="font-semibold text-green-800">
                          {product.name}
                        </div>
                        <div className="text-sm text-green-600">
                          {product.description}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          {(product.price / 100).toFixed(2)}€
                        </div>
                        <div className="text-sm text-green-600">✅ Acheté</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <Crown className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Aucun achat pour le moment</p>
                  <Button className="mt-4" asChild>
                    <a href="/pricing">Voir nos tarifs</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
