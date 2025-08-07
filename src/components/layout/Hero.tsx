import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import AnimationContainer from "../shared/AnimationContainer";
import { Button } from "../ui/button";
import Link from "next/link";
import { Zap, CheckCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-background">
      {/* Grille de fond pleine largeur uniquement sur Hero */}
      <div
        className="absolute top-0 left-0 w-full h-full
        dark:bg-[linear-gradient(to_right,#4a5568_1px,transparent_1px),linear-gradient(to_bottom,#4a5568_1px,transparent_1px)]
        bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)]
        bg-[size:3rem_3rem]
        [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]
        opacity-20 pointer-events-none z-0"
      />

      {/* Contenu Hero */}
      <div className="relative container-custom z-10 mx-auto px-4">
        <AnimationContainer className="max-w-4xl mx-auto text-center">
          <AnimationContainer delay={0.2} className="mb-8 animate-fade-in">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-6 hover-lift">
              🚀 New : Support iOS 17 & SwiftUI 6
            </span>
          </AnimationContainer>

          <AnimationContainer delay={0.4}>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              From <span className="text-blue-600">Code</span> to the
              <span className="text-blue-600">App Store</span>
              <br />
              in{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                5 days
              </span>
            </h1>
          </AnimationContainer>

          <AnimationContainer delay={0.6}>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              The SwiftUI boilerplate that saves freelance developers{" "}
              <strong>3 months</strong> of work. Clean Architecture, Auth,
              Payments, and Push Notifications{" "}
              <strong>already integrated</strong>.
            </p>
          </AnimationContainer>

          <AnimationContainer
            delay={0.8}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <SignedOut>
              <SignInButton>
                <Button size="lg" className="px-8 py-4 text-lg">
                  <Zap className="mr-2 h-5 w-5" />
                  Start now
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/pricing">
                <Button size="lg" className="px-8 py-4 text-lg hover:scale-105">
                  <Zap className="mr-2 h-5 w-5" />
                  Download SwiftFast
                </Button>
              </Link>
            </SignedIn>
          </AnimationContainer>

          <AnimationContainer
            delay={1.0}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Clean Architecture include
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              MVVM + Dependency Injection
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Ready for the App Store
            </div>
          </AnimationContainer>
        </AnimationContainer>
      </div>
    </section>
  );
}
