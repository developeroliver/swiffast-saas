"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";
import type { PurchaseStatus, Product } from "@/lib/types";

interface CheckoutFormProps {
  priceId: string;
  productName: string;
  disabled?: boolean;
}

export default function CheckoutForm({
  priceId,
  productName,
  disabled,
}: CheckoutFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [alreadyPurchased, setAlreadyPurchased] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      // Vérifier si l'utilisateur a déjà acheté ce produit
      fetch("/api/user/purchase-status")
        .then((res) => res.json())
        .then((data: PurchaseStatus) => {
          if (data.products) {
            const hasProduct =
              (productName.toLowerCase().includes("premium") &&
                data.hasPremium) ||
              (productName.toLowerCase().includes("starter") &&
                data.hasStarter);
            setAlreadyPurchased(hasProduct);
          }
          setCheckingStatus(false);
        })
        .catch((err) => {
          console.log("Erreur lors de la vérification:", err);
          setCheckingStatus(false);
        });
    } else {
      setCheckingStatus(false);
    }
  }, [isSignedIn, user, productName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSignedIn) {
      toast.error("Vous devez être connecté pour effectuer un achat");
      return;
    }

    if (!priceId) {
      toast.error("Erreur de configuration du produit");
      return;
    }

    if (alreadyPurchased) {
      toast.info("Vous avez déjà acheté ce produit !");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("priceId", priceId);

      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors du paiement");
      }

      // La redirection se fait automatiquement côté serveur
    } catch (error) {
      console.error("Erreur checkout:", error);
      toast.error(
        error instanceof Error ? error.message : "Erreur lors du paiement"
      );
      setIsLoading(false);
    }
  };

  if (checkingStatus) {
    return (
      <Button className="w-full" size="lg" disabled>
        Vérification...
      </Button>
    );
  }

  if (alreadyPurchased) {
    return (
      <Button className="w-full" size="lg" variant="outline" disabled>
        <CheckCircle className="h-4 w-4 mr-2" />
        Déjà acheté
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={disabled || isLoading}
      >
        {isLoading ? "Redirection..." : `Acheter ${productName}`}
      </Button>
    </form>
  );
}
