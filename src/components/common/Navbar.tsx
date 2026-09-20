"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useHideOnScroll } from "@/hooks/useHideOnScroll";
import { CommandPalette } from "@/components/CommandPalette";

export interface NavbarProps {
  credentialCount?: number;
}

export const Navbar = ({ credentialCount }: NavbarProps = {}) => {
  const { isScrolled } = useHideOnScroll();
  const [count, setCount] = useState<number | null>(
    typeof credentialCount === "number" ? credentialCount : null
  );

  useEffect(() => {
    if (typeof credentialCount === "number") {
      setCount(credentialCount);
      return;
    }

    let isMounted = true;
    fetch("/api/credentials/count")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data && typeof data.count === "number") {
          setCount(data.count);
        }
      })
      .catch(() => {
        if (isMounted) {
          setCount(0);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [credentialCount]);

  return (
    <nav
      aria-label="Primary Navigation"
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-black/95" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2 group"
          aria-label="Go to homepage"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
            <Image
              src="/images/logo.svg"
              alt="Tushar Kanti Dey logo"
              width={34}
              height={34}
              priority
              fetchPriority="high"
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        </Link>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href="/credentials"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl border border-white/20 hover:border-white/45 text-white transition-colors duration-200 font-medium text-xs sm:text-sm whitespace-nowrap"
            aria-label="Credentials"
          >
            <span>Credentials</span>
            <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-white/70 font-mono leading-none">
              {count !== null ? count : 0}
            </span>
          </Link>
          <Link
            href="/engineering-notes"
            className="px-3 py-1.5 sm:py-2 rounded-xl border border-white/20 hover:border-white/45 text-white transition-colors duration-200 font-medium text-xs sm:text-sm whitespace-nowrap"
            aria-label="Read Engineering Notes"
          >
            Engineering Notes
          </Link>
          <CommandPalette />
        </div>
      </div>
    </nav>
  );
};

