import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-6xl font-bold text-muted-foreground mb-4">404</h1>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Page not found
          </h2>
          <p className="text-muted-foreground mb-8">
            Sorry, the page you are looking for does not exist.
          </p>
          <div className="space-y-4">
            <Link href="/">
              <Button className="w-full">Back to home</Button>
            </Link>
            <div className="mt-2">
              <Link href="/pricing">
                <Button variant="outline" className="w-full">
                  See our prices
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
