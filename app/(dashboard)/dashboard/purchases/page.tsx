import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import { getUserPurchases } from "@/lib/db";
import { Download, Receipt } from "lucide-react";

export default async function PurchasesPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const purchases = await getUserPurchases(user.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Historique des achats
          </h1>
          <p className="text-gray-600 mt-2">
            Retrouvez tous vos achats et téléchargez vos reçus
          </p>
        </div>

        {purchases.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Receipt className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Aucun achat pour le moment
              </h3>
              <p className="text-gray-600 mb-6">
                Découvrez nos produits et débloquez de nouvelles fonctionnalités
              </p>
              <Button asChild>
                <a href="/pricing">Voir nos tarifs</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {purchases.map((purchase) => (
              <Card key={purchase.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">
                          {purchase.product.name}
                        </h3>
                        <Badge
                          variant={
                            purchase.status === "COMPLETED"
                              ? "default"
                              : purchase.status === "FAILED"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {purchase.status}
                        </Badge>
                      </div>

                      <p className="text-gray-600 mb-3">
                        {purchase.product.description}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-500">
                            Date d&apos;achat
                          </span>
                          <div>
                            {new Date(purchase.createdAt).toLocaleDateString(
                              "fr-FR"
                            )}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-500">
                            Montant
                          </span>
                          <div className="font-semibold">
                            {(purchase.amount / 100).toFixed(2)}{" "}
                            {purchase.currency.toUpperCase()}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-500">
                            ID Transaction
                          </span>
                          <div className="font-mono text-xs">
                            {purchase.id.slice(0, 8)}...
                          </div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-500">
                            Méthode
                          </span>
                          <div>Stripe</div>
                        </div>
                      </div>
                    </div>

                    <div className="ml-6 flex flex-col gap-2">
                      <Button variant="outline" size="sm" disabled>
                        <Download className="h-4 w-4 mr-2" />
                        Reçu PDF
                      </Button>

                      {purchase.status === "COMPLETED" && (
                        <Button variant="outline" size="sm" asChild>
                          <a href="/premium">Accéder au contenu</a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Statistiques */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Résumé</CardTitle>
                <CardDescription>Vos statistiques d&apos;achat</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {purchases.length}
                    </div>
                    <div className="text-sm text-gray-600">Achats total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {(
                        purchases.reduce((sum, p) => sum + p.amount, 0) / 100
                      ).toFixed(2)}
                      €
                    </div>
                    <div className="text-sm text-gray-600">Total dépensé</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {purchases.filter((p) => p.status === "COMPLETED").length}
                    </div>
                    <div className="text-sm text-gray-600">Achats réussis</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {new Set(purchases.map((p) => p.productId)).size}
                    </div>
                    <div className="text-sm text-gray-600">
                      Produits uniques
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
