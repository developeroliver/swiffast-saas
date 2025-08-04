import { currentUser } from "@clerk/nextjs/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import { redirect } from "next/navigation";
import {
  createOrGetUser,
  getUserPurchases,
  getUserActiveSubscription,
  getUserPurchasedProducts,
} from "@/lib/db";
import { Crown, ShoppingBag, Calendar, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function Dashboard() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/sign-in");
  }

  const user = await createOrGetUser();
  const purchases = await getUserPurchases(user.id);
  const subscription = await getUserActiveSubscription(user.id);
  const purchasedProducts = await getUserPurchasedProducts(user.id);

  const hasPremium = purchasedProducts.some((p) =>
    p.name.toLowerCase().includes("premium")
  );
  const hasStarter = purchasedProducts.some((p) =>
    p.name.toLowerCase().includes("starter")
  );
  const totalSpent = purchases.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Bienvenue, {user.firstName} !
              </h1>
              <p className="text-muted-foreground mt-2">
                Voici votre tableau de bord personnel
              </p>
            </div>
            <div className="flex gap-2">
              {hasPremium && (
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-800"
                >
                  Premium
                </Badge>
              )}
              {hasStarter && (
                <Badge
                  variant="secondary"
                  className="bg-orange-100 text-orange-800"
                >
                  Starter
                </Badge>
              )}
              {!hasPremium && !hasStarter && (
                <Badge variant="outline">Gratuit</Badge>
              )}
            </div>
          </div>
        </div>

        {/* Alertes et CTAs */}
        {!hasPremium && !hasStarter && (
          <Card className="mb-8 border-blue-200 bg-background">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Crown className="h-8 w-8 text-blue-600" />
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900">
                    Débloquez tout le potentiel
                  </h3>
                  <p className="text-blue-700 text-sm mt-1">
                    Accédez aux fonctionnalités premium et boostez votre
                    productivité
                  </p>
                </div>
                <Link href="/pricing">
                  <Button>Voir les tarifs</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Statut du compte */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400">
                Statut
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {hasPremium ? "Premium" : hasStarter ? "Starter" : "Gratuit"}
              </div>
              <p className="text-sm text-gray-400 mt-1">
                Acheté le {new Date(user.createdAt).toLocaleDateString("fr-FR")}
              </p>
            </CardContent>
          </Card>

          {/* Total dépensé */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total dépensé
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {(totalSpent / 100).toFixed(2)}€
              </div>
              <p className="text-sm text-gray-400 mt-1">
                {purchases.length} achat{purchases.length > 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Derniers achats</CardTitle>
              <CardDescription>Vos achats récents</CardDescription>
            </CardHeader>
            <CardContent>
              {purchases.length > 0 ? (
                <div className="space-y-3">
                  {purchases.slice(0, 3).map((purchase) => (
                    <div
                      key={purchase.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium text-sm">
                          {purchase.product.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(purchase.createdAt).toLocaleDateString(
                            "fr-FR"
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sm">
                          {(purchase.amount / 100).toFixed(2)}€
                        </div>
                        <Badge
                          variant={
                            purchase.status === "COMPLETED"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {purchase.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {purchases.length > 3 && (
                    <div className="text-center">
                      <Link href="/purchases">
                        <Button variant="ghost" size="sm">
                          Voir l&apos;historique complet ({purchases.length})
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <ShoppingBag className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Aucun achat</p>
                  <Link href="/pricing">
                    <Button size="sm" className="mt-2">
                      Découvrir nos produits
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
