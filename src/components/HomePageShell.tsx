/**
 * HomePageShell
 *
 * Client wrapper that handles the preloader → content transition.
 * Extracted from (main)/page.tsx so the route file stays minimal
 * and this component owns the only client-side state on the page.
 */

"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { Navbar, Footer, Background, PreLoader } from "@/components/common";
import { Hero } from "@/components/sections";

// Lazy-load below-the-fold sections for faster initial paint
const About = dynamic(() => import("@/components/sections/About").then((mod) => mod.About));
const Experience = dynamic(() => import("@/components/sections/Experience").then((mod) => mod.Experience));
const Skills = dynamic(() => import("@/components/sections/Skills").then((mod) => mod.Skills));
const Projects = dynamic(() => import("@/components/sections/Projects").then((mod) => mod.Projects));
const DevOps = dynamic(() => import("@/components/sections/DevOps").then((mod) => mod.DevOps));
const Contact = dynamic(() => import("@/components/sections/Contact").then((mod) => mod.Contact));

const PRELOADER_DURATION_MS = 1500;

export function HomePageShell() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), PRELOADER_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.slice(1);
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const navOffset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;
          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: "smooth",
          });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading) return <PreLoader />;

  return (
    <div className="min-h-screen relative">
      <Background />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <DevOps />
        <div id="work">
          <Skills />
        </div>
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
