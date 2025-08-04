import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Connexion à Mon SaaS
          </h1>
          <p className="text-gray-600 mt-2">
            Connectez-vous pour accéder à votre compte
          </p>
        </div>
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: "bg-slate-900 hover:bg-slate-800 text-white",
              card: "shadow-lg",
            },
          }}
        />
      </div>
    </div>
  );
}
