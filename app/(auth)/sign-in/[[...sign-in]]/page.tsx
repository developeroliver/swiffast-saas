import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="min-h-screen relative">
      {/* Bouton de retour avec shadcn/ui */}
      <div className="fixed top-8 left-4 z-30">
        <Button variant="outline" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </Button>
      </div>

      <div className="mt-24 flex items-center justify-center flex-col space-y-12 px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">
            Bienvenue de retour
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Connectez-vous à votre compte
          </p>
        </div>

        <SignIn
          appearance={{
            elements: {
              card: "bg-card border border-border shadow-lg rounded-xl p-6",
              headerTitle: "hidden",
              headerSubtitle: "text-muted-foreground",
              socialButtonsBlockButton__google:
                "bg-white hover:bg-white/60 border border-border",
              socialButtonsBlockButtonText: "text-foreground font-medium",
              dividerText: "text-muted-foreground",
              dividerLine: "bg-border",
              formFieldLabel: "text-foreground font-medium",
              formFieldInput:
                "border border-border bg-background text-foreground rounded-md focus:ring focus:ring-primary/40",
              formButtonPrimary:
                "bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-md py-2 px-4",
              footerActionLink:
                "text-primary hover:underline font-medium transition",
              footer: "hidden",
              formFieldWarningText: "text-amber-600",
              formFieldErrorText: "text-red-600",
              formFieldSuccessText: "text-green-600",
              identityPreviewText: "text-muted-foreground",
              identityPreviewEditButton:
                "text-primary hover:text-primary/80 font-medium",
              formResendCodeLink:
                "text-primary hover:text-primary/80 font-medium",
              otpCodeFieldInput:
                "border border-border rounded-md text-foreground",
              alertText: "text-foreground",
            },
          }}
          forceRedirectUrl="/dashboard"
        />

        <p className="mt-2 text-lg text-muted-foreground">
          Pas encore de compte ?{" "}
          <Link href="/sign-up" className="underline">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
