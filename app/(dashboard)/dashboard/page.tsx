import type { Metadata } from "next";
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
  getUserPurchasedProducts,
} from "@/lib/db";
import { Crown, ShoppingBag, Github, Download } from "lucide-react";
import Link from "next/link";
import GitHubForm from "@/components/shared/GithubForm";

type PurchasedProduct = {
  id: string;
  name: string;
};

type Purchase = {
  amount: number;
};

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Accédez à votre tableau de bord personnel et gérez votre compte.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Dashboard() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/sign-in");
  }

  const user = await createOrGetUser();
  const purchases = await getUserPurchases(user.id);
  const purchasedProducts = await getUserPurchasedProducts(user.id);

  const hasPremium = purchasedProducts.some((p: PurchasedProduct) =>
    p.name.toLowerCase().includes("premium")
  );
  const hasStarter = purchasedProducts.some((p: PurchasedProduct) =>
    p.name.toLowerCase().includes("starter")
  );
  const totalSpent = purchases.reduce(
    (sum: number, p: Purchase) => sum + p.amount,
    0
  );
  // ✅ LOGIQUE : Accès au boilerplate si Premium OU Starter
  const hasBoilerplateAccess = hasPremium || hasStarter;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome, {user.firstName} !
              </h1>
              <p className="text-muted-foreground mt-2">
                {hasBoilerplateAccess
                  ? "Access your SwiftFast boilerplate"
                  : "Here is your personal dashboard"}
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
              {!hasBoilerplateAccess && (
                <Badge variant="outline">No purchase</Badge>
              )}
            </div>
          </div>
        </div>

        {/* CTA pour les utilisateurs sans achat */}
        {!hasBoilerplateAccess && (
          <Card className="mb-8 border-blue-200 bg-blue-50 dark:bg-blue-950/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Crown className="h-8 w-8 text-blue-600" />
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                    Unlock SwiftFast
                  </h3>
                  <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                    Purchase SwiftFast to access the private GitHub repository
                    with the complete SwiftUI boilerplate.
                  </p>
                </div>
                <Link href="/pricing">
                  <Button>
                    <Github className="mr-2 h-4 w-4" />
                    Buy SwiftFast
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Message de félicitations pour les acheteurs */}
        {hasBoilerplateAccess && (
          <Card className="mb-8 border-green-200 bg-green-50 dark:bg-green-950/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Github className="h-8 w-8 text-green-600" />
                <div className="flex-1">
                  <h3 className="font-semibold text-green-900 dark:text-green-100">
                    🎉 SwiftFast enabled !
                  </h3>
                  <p className="text-green-700 dark:text-green-300 text-sm mt-1">
                    Thank you for your purchase! Request access to the GitHub
                    repository to download your SwiftUI boilerplate.
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  <Download className="mr-1 h-3 w-3" />
                  Access unlocked
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Statut du compte */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                SwiftFast Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {hasPremium
                  ? "Premium"
                  : hasStarter
                    ? "Starter"
                    : "No purchase"}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Member since{" "}
                {new Date(user.createdAt).toLocaleDateString("fr-FR")}
              </p>
              {hasBoilerplateAccess && (
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs">
                    ✅ Authorized GitHub access
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Total dépensé */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total invested
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {(totalSpent / 100).toFixed(2)}€
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {purchases.length} purchase{purchases.length > 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>

          {/* Boilerplates disponibles */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Boilerplate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {hasBoilerplateAccess ? purchasedProducts.length : "0"}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {hasBoilerplateAccess ? "Available" : "Not unlocked"}
              </p>
            </CardContent>
          </Card>

          {/* Action suggérée */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Suggested action
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!hasBoilerplateAccess ? (
                <div>
                  <div className="text-lg font-semibold text-blue-600 mb-1">
                    Buy
                  </div>
                  <Link href="/pricing">
                    <Button size="sm" variant="outline" className="text-xs">
                      See the pack
                    </Button>
                  </Link>
                </div>
              ) : (
                <div>
                  <div className="text-lg font-semibold text-green-600 mb-1">
                    Download
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Request GitHub access
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Layout conditionnel selon l'accès */}
        <div
          className={`grid gap-6 ${hasBoilerplateAccess ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}
        >
          {/* GitHubForm - VISIBLE SEULEMENT SI ACHETÉ */}
          {hasBoilerplateAccess && (
            <div className="lg:col-span-2">
              <GitHubForm />
            </div>
          )}

          {/* Historique des achats */}
          <Card className={!hasBoilerplateAccess ? "lg:col-span-2" : ""}>
            <CardHeader>
              <CardTitle>My SwiftFast purchases</CardTitle>
              <CardDescription>
                {hasBoilerplateAccess
                  ? "Your purchased boilerplates"
                  : "Purchase history"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {purchases.length > 0 ? (
                <div className="space-y-3">
                  {purchases.slice(0, 3).map((purchase) => (
                    <div
                      key={purchase.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                    >
                      <div className="flex items-center gap-3">
                        <Github className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium text-sm">
                            {purchase.product.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(purchase.createdAt).toLocaleDateString(
                              "fr-FR"
                            )}
                          </div>
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
                    <div className="text-center pt-3 border-t">
                      <Link href="/purchases">
                        <Button variant="ghost" size="sm">
                          See complete history ({purchases.length})
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
                  <p className="text-sm mb-2">No SwiftFast purchases</p>
                  <p className="text-xs mb-4">Unlock the SwiftUI boilerplate</p>
                  <Link href="/pricing">
                    <Button size="sm">
                      <Github className="mr-2 h-4 w-4" />
                      Discover SwiftFast
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
