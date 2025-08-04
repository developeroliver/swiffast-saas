import { Suspense } from "react";
import { CheckCircle, ArrowLeft, Eye } from "lucide-react";
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

// Types pour éviter any
interface Product {
  id: string;
  name: string;
  description: string | null;
  stripeId: string;
}

async function AlreadyPurchasedContent({
  searchParams,
}: {
  searchParams: { product?: string };
}) {
  const user = await currentUser();
  let purchasedProducts: Product[] = [];
  let productName = "ce produit";

  if (user) {
    try {
      purchasedProducts = await getUserPurchasedProducts(user.id);

      // Si un produit spécifique est mentionné, le trouver
      const productParam = searchParams.product;
      if (productParam) {
        const foundProduct = purchasedProducts.find(
          (p: Product) =>
            p.stripeId === productParam ||
            p.name.toLowerCase().includes(productParam.toLowerCase())
        );
        if (foundProduct) {
          productName = foundProduct.name;
        }
      }
    } catch (error) {
      console.log("Erreur lors du chargement des produits:", error);
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
                <CheckCircle className="h-16 w-16 text-blue-500" />
              </div>
              <CardTitle className="text-3xl text-blue-600">
                Produit déjà acheté !
              </CardTitle>
              <CardDescription className="text-lg">
                Vous avez déjà accès à {productName}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Bonne nouvelle !
                </h3>
                <p className="text-blue-700">
                  Vous avez déjà acheté ce produit et pouvez accéder à tout son
                  contenu dès maintenant.
                </p>
              </div>

              {purchasedProducts.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">
                    Vos produits achetés :
                  </h4>
                  {purchasedProducts.map((product: Product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
                    >
                      <div>
                        <div className="font-medium text-green-800">
                          {product.name}
                        </div>
                        <div className="text-sm text-green-600">
                          {product.description}
                        </div>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  ))}
                </div>
              )}

              <div className="text-center text-gray-600">
                <p className="mb-4">
                  Accédez à votre contenu premium ou explorez vos autres
                  options.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Link href="/premium">
                  <Button className="w-full" size="lg">
                    <Eye className="h-4 w-4 mr-2" />
                    Voir mon contenu
                  </Button>
                </Link>

                <Link href="/dashboard">
                  <Button variant="outline" className="w-full" size="lg">
                    Mon Dashboard
                  </Button>
                </Link>
              </div>

              <div className="pt-4 border-t">
                <Link href="/pricing">
                  <Button variant="ghost" className="w-full">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Retour aux tarifs
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

export default function AlreadyPurchasedPage({
  searchParams,
}: {
  searchParams: { product?: string };
}) {
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
      <AlreadyPurchasedContent searchParams={searchParams} />
    </Suspense>
  );
}
