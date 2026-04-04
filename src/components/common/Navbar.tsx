"use client";

import Image from "next/image";
import Link from "next/link";

import { useHideOnScroll } from "@/hooks/useHideOnScroll";

export const Navbar = () => {
  const { isVisible, isScrolled } = useHideOnScroll();

  return (
    <nav
      aria-label="Primary"
      className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 ease-out ${isScrolled ? "pt-0 px-2 sm:px-4" : "px-2 sm:px-3"
        } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div
        className={`floating-nav rounded-2xl px-3 sm:px-6 py-2.5 sm:py-3 bg-glass-bg transition-all duration-300 max-w-7xl mx-auto ${isScrolled ? "shadow-xl" : "shadow-lg"
          }`}
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 sm:space-x-3 group"
            aria-label="Go to homepage"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-glass-bg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/images/logo.svg"
                alt="Tushar Kanti Dey logo"
                width={40}
                height={40}
                priority
                fetchPriority="high"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/engineering-notes"
              className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-white/20 hover:border-white/45 text-white transition-colors duration-200 font-medium text-xs sm:text-sm whitespace-nowrap"
              aria-label="Read Engineering Notes"
            >
              Engineering Notes
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
