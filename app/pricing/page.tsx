import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import Header from "@/components/layout/Header";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

const plans = [
  {
    name: "Pack Starter",
    description: "Parfait pour commencer",
    price: 9.99,
    priceId: "price_1RsNIaPp891p9SBjdw4aJgmV", // Remplace par ton vrai Price ID Stripe
    features: [
      "Accès aux fonctionnalités de base",
      "Support par email",
      "5 projets maximum",
      "Stockage 1GB",
    ],
  },
  {
    name: "Accès Premium",
    description: "Pour les utilisateurs avancés",
    price: 29.99,
    priceId: "price_1RsNHuPp891p9SBjxstpIdZv", // Remplace par ton vrai Price ID Stripe
    popular: true,
    features: [
      "Toutes les fonctionnalités",
      "Support prioritaire 24/7",
      "Projets illimités",
      "Stockage 100GB",
      "Analytics avancés",
      "API access",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-bacground">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Choisissez votre plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sélectionnez le plan qui correspond le mieux à vos besoins
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${
                plan.popular ? "ring-2 ring-blue-500" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Populaire
                  </span>
                </div>
              )}

              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}€
                  </span>
                  <span className="text-muted-foreground ml-1">une fois</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>

                <SignedOut>
                  <SignInButton>
                    <Button className="w-full" size="lg">
                      Se connecter pour acheter
                    </Button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  <form action="/api/stripe/checkout" method="POST">
                    <input type="hidden" name="priceId" value={plan.priceId} />
                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Acheter maintenant
                    </Button>
                  </form>
                </SignedIn>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
