"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

import { quentine } from "@/app/fonts";

import { createBlurDataURL } from "@/lib/BlurDataURL";

export const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Optimize state updates to avoid unnecessary re-renders
      if (currentScrollY > 100 && !isScrolled) {
        setIsScrolled(true);
      } else if (currentScrollY <= 100 && isScrolled) {
        setIsScrolled(false);
      }

      if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
        if (!isVisible) setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        if (isVisible) {
          setIsVisible(false);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled, isVisible]);

  return (
    <nav
      className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isScrolled ? "pt-0 px-2 sm:px-4" : "px-2 sm:px-2"
      } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div
        className={`floating-nav rounded-2xl px-4 sm:px-6 py-3 bg-glass-bg transition-all duration-300 max-w-7xl mx-auto ${
          isScrolled ? "shadow-xl" : "shadow-lg"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 sm:space-x-3 group"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-glass-bg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/images/logo.svg"
                alt="logo"
                width={40}
                height={40}
                placeholder="blur"
                loading="lazy"
                quality={100}
                blurDataURL={`${createBlurDataURL({
                  width: 40,
                  height: 40,
                })}`}
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          </Link>
        </div>


      </div>
    </nav>
  );
};
