import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Check } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

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
    name: "Accès Premium",
    description: "Pour les utilisateurs avancés",
    price: 299.0,
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

export default function Pricing() {
  return (
    <section className="py-20 px-4 bg-bacground">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Investment that pays for itself from the very first project
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the package that suits your development needs
          </p>
        </div>

        <div className="flex justify-center max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative w-full max-w-md ${
                plan.popular ? "bg-muted/30 ring-2 ring-blue-500" : ""
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
                      <Check className="h-5 w-5 text-blue-400 mr-3" />
                      <span className="text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>

                <SignedOut>
                  <SignInButton>
                    <Button className="w-full hover:scale-105" size="lg">
                      Sign in to buy
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
    </section>
  );
}
