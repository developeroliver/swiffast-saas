import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Créer un compte</h1>
          <p className="text-gray-600 mt-2">
            Rejoignez Mon SaaS dès aujourd&apos;hui
          </p>
        </div>
        <SignUp
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
