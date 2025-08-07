import { currentUser } from "@clerk/nextjs/server";
import { userHasPurchasedProduct } from "@/lib/db";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock } from "lucide-react";
import Link from "next/link";

interface PremiumContentProps {
  productStripeId: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default async function PremiumContent({
  productStripeId,
  children,
  fallback,
}: PremiumContentProps) {
  const user = await currentUser();

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <Lock className="h-8 w-8 text-gray-400 mb-2" />
          <CardTitle>Contenu premium</CardTitle>
          <CardDescription>
            Connectez-vous pour accéder à ce contenu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/sign-in">
            <Button>Se connecter</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  const hasPurchased = await userHasPurchasedProduct(user.id, productStripeId);

  if (!hasPurchased) {
    return (
      fallback || (
        <Card>
          <CardHeader>
            <Lock className="h-8 w-8 text-gray-400 mb-2" />
            <CardTitle>Contenu premium</CardTitle>
            <CardDescription>
              Achetez ce produit pour accéder à ce contenu exclusif
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/pricing">
              <Button>Voir les tarifs</Button>
            </Link>
          </CardContent>
        </Card>
      )
    );
  }

  return <>{children}</>;
}
