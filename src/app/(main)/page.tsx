"use client";

import { useState, useEffect } from "react";

import { Navbar, Footer } from "@/components/common";
import {
  Hero,
  About,
  Experience,
  Skills,
  Projects,
  GitHub,
  DevOps,
  Contact,
} from "@/components/sections";
import { PreLoader, Background } from "@/components/common";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTimer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(loadTimer);
  }, []);

  if (loading) return <PreLoader />;

  return (
    <div className="min-h-screen relative">
      <Background />
      <Navbar />
      <main>
        {/* Hero — id="hero" */}
        <Hero />

        {/* About */}
        <About />

        {/* Experience */}
        <Experience />

        {/* Tech Stack — id="tech" */}
        <div id="work">
          <Skills />
        </div>

        {/* Projects */}
        <Projects />

        {/* GitHub */}
        <GitHub />

        {/* DevOps */}
        <DevOps />

        {/* Contact — id="contact" */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
