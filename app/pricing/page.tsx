import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Tarifs et Plans - Mon SaaS",
  description:
    "Découvrez nos tarifs transparents. Pack Starter à 9,99€ et Accès Premium à 29,99€. Fonctionnalités complètes, support inclus.",
  keywords: [
    "tarifs",
    "prix",
    "abonnement",
    "premium",
    "starter",
    "9.99",
    "299",
  ],
  openGraph: {
    title: "Tarifs et Plans - Mon SaaS",
    description:
      "Pack Starter 9,99€ et Accès Premium 29,99€. Fonctionnalités complètes, support inclus.",
    url: "https://www.swiftfast.me/pricing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarifs et Plans - Mon SaaS",
    description:
      "Pack Starter 9,99€ et Accès Premium 29,99€. Fonctionnalités complètes, support inclus.",
  },
};

const plans = [
  // {
  //   name: "Pack Starter",
  //   description: "Parfait pour commencer",
  //   price: 9.99,
  //   priceId: "price_1RsNIaPp891p9SBjdw4aJgmV", // Remplace par ton vrai Price ID Stripe
  //   features: [
  //     "Accès aux fonctionnalités de base",
  //     "Support par email",
  //     "5 projets maximum",
  //     "Stockage 1GB",
  //   ],
  // },
  {
    name: "Full Access",
    description: "For advanced users",
    price: 299,
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
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Select your plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the plan that best suits your needs
          </p>
        </div>

        <div className="flex justify-center max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative w-full max-w-md ${
                plan.popular ? "bg-muted/30 ring-2 ring-blue-400" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                    PopulaPopularire
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
                      Log in to purchase
                    </Button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  <form action="/api/stripe/checkout" method="POST">
                    <input type="hidden" name="priceId" value={plan.priceId} />
                    <Button
                      type="submit"
                      className="w-full hover:scale-105"
                      size="lg"
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Buy now
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
