"use client";

import {
  UserButton,
  SignInButton,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/themes/theme-toggle";
import Link from "next/link";
import { Crown } from "lucide-react";
import { useEffect, useState } from "react";
import type { PurchaseStatus } from "@/lib/types";

interface UserStatus {
  hasPremium: boolean;
  hasStarter: boolean;
}

export default function Header() {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userStatus, setUserStatus] = useState<UserStatus>({
    hasPremium: false,
    hasStarter: false,
  });

  useEffect(() => {
    if (user) {
      fetch("/api/user/purchase-status")
        .then((res) => res.json())
        .then((data: PurchaseStatus) => {
          if (data.hasPremium !== undefined) {
            setUserStatus({
              hasPremium: data.hasPremium,
              hasStarter: data.hasStarter,
            });
          }
        })
        .catch((err) => {
          console.log("Erreur lors du chargement du statut utilisateur:", err);
        });
    }
  }, [user]);

  return (
    <header className="border-b bg-background z-50 relative">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-foreground">
          SwiftFast
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/pricing"
            className="text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            Price
            <SignedOut>
              <Badge variant="secondary" className="text-xs">
                New
              </Badge>
            </SignedOut>
          </Link>
          <SignedIn>
            <Link
              href="/dashboard"
              className="text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </Link>
            {(userStatus.hasPremium || userStatus.hasStarter) && (
              <Link
                href="/premium"
                className="text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                Premium
                <Crown className="h-4 w-4 text-yellow-500" />
              </Link>
            )}
          </SignedIn>
        </nav>

        {/* Right-side controls */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-foreground focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Auth Buttons */}
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost">Se connecter</Button>
            </SignInButton>
            <SignInButton
              mode="modal"
              fallbackRedirectUrl="/dashboard"
              signUpFallbackRedirectUrl="/dashboard"
            >
              <Button>S&apos;inscrire</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="hidden md:flex items-center gap-3">
              {userStatus.hasPremium && (
                <Badge variant="secondary" className="text-xs">
                  Premium
                </Badge>
              )}
              {userStatus.hasStarter && !userStatus.hasPremium && (
                <Badge variant="secondary" className="text-xs">
                  Starter
                </Badge>
              )}
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-background border-t">
          <Link
            href="/"
            className="block text-muted-foreground hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/pricing"
            className="block text-muted-foreground hover:text-foreground"
          >
            Price
          </Link>
          <SignedIn>
            <Link
              href="/dashboard"
              className="block text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </Link>
            {(userStatus.hasPremium || userStatus.hasStarter) && (
              <Link
                href="/premium"
                className="block text-muted-foreground hover:text-foreground"
              >
                Premium
              </Link>
            )}
          </SignedIn>
        </div>
      )}
    </header>
  );
}
