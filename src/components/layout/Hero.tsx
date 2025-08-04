import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import AnimationContainer from "../shared/AnimationContainer";
import { Button } from "../ui/button";
import Link from "next/link";

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
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-slide-up">
              Develop your iOS apps{" "}
              <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                10x faster
              </span>
            </h1>
          </AnimationContainer>

          <AnimationContainer delay={0.6}>
            <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto animate-slide-up">
              The ultimate SwiftUI boilerplate with modern architecture,
              ready-to-use components, and everything you need to create
              exceptional iOS apps.
            </p>
          </AnimationContainer>

          <AnimationContainer
            delay={0.8}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-up"
          >
            <SignedOut>
              <Link href="/sign-up">
                <Button variant="outline" size="lg">
                  Start now
                </Button>
              </Link>
            </SignedOut>
          </AnimationContainer>

          <AnimationContainer
            delay={1.0}
            className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 animate-fade-in"
          >
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>iOS 17+ Compatible</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>SwiftUI 6 Ready</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Lifetime updated</span>
            </div>
          </AnimationContainer>
        </AnimationContainer>
      </div>
    </section>
  );
}
