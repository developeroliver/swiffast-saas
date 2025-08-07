import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/themes/theme-provider";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Mon SaaS - Solution innovante pour votre business",
    template: "%s | Mon SaaS",
  },
  description:
    "Découvrez Mon SaaS, la solution tout-en-un pour booster votre productivité. Fonctionnalités premium, dashboard intuitif, support 24/7.",
  keywords: ["saas", "productivité", "business", "solution", "premium"],
  authors: [{ name: "Équipe Mon SaaS" }],
  creator: "Mon SaaS",
  publisher: "Mon SaaS",

  // Open Graph (réseaux sociaux)
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://monssaas.com", // Change par ton domaine
    title: "Mon SaaS - Solution innovante pour votre business",
    description:
      "Découvrez Mon SaaS, la solution tout-en-un pour booster votre productivité. Fonctionnalités premium, dashboard intuitif, support 24/7.",
    siteName: "Mon SaaS",
    images: [
      {
        url: "https://monssaas.com/og-image.png", // Tu créeras cette image
        width: 1200,
        height: 630,
        alt: "Mon SaaS - Solution innovante",
      },
    ],
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "Mon SaaS - Solution innovante pour votre business",
    description:
      "Découvrez Mon SaaS, la solution tout-en-un pour booster votre productivité.",
    images: ["https://monssaas.com/og-image.png"],
    creator: "@monssaas", // Change par ton Twitter
  },

  // Configuration robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="fr" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main>{children}</main>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
