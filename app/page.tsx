import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Hero from "@/components/layout/Hero";
import Demo from "@/components/layout/Demo";

export default function Home() {
  return (
    <div className="min-h-screen bg-background to-muted">
      {/* HEADER SECTION */}
      <Header />

      {/* HERO SECTION */}
      <Hero />
      <div className="container mx-auto px-4 py-16">
        {/* HERO SECTION */}
        <Demo />

        {/* FOOTER SECTION */}
        <Footer />
      </div>
    </div>
  );
}
