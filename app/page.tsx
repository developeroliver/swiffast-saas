import { Footer } from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import Demo from "@/components/layout/Demo";
import Problem from "@/components/layout/Problem";
import Pricing from "@/components/layout/Pricing";
import FAQ from "@/components/layout/FAQ";
import Features from "@/components/layout/Features";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Mon SaaS",
    description: "Solution tout-en-un pour booster votre productivité",
    url: "https://monssaas.com",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: [
      {
        "@type": "Offer",
        name: "Pack Starter",
        price: "9.99",
        priceCurrency: "EUR",
        description: "Fonctionnalités de base pour commencer",
      },
      {
        "@type": "Offer",
        name: "Accès Premium",
        price: "29.99",
        priceCurrency: "EUR",
        description: "Toutes les fonctionnalités premium",
      },
    ],
    creator: {
      "@type": "Organization",
      name: "Mon SaaS",
      url: "https://monssaas.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-background to-muted">
        {/* HEADER SECTION */}
        <Header />
        {/* HERO SECTION */}
        <Hero />
        <div className="container mx-auto px-4 py-16">
          {/* HERO SECTION */}
          <Demo />

          {/* PROBLEM SECTION */}
          <Problem />

          {/* FEATURES SECTION */}
          <Features />

          {/* PRICING SECTION */}
          <Pricing />

          {/* FAQ SECTION */}
          <FAQ />

          {/* FOOTER SECTION */}
          <Footer />
        </div>
      </div>
    </>
  );
}
