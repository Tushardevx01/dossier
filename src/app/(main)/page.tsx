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
        {/* 1️⃣ Hero — Identity & Positioning */}
        <Hero />

        {/* 7️⃣ Engineering Philosophy — Values & Principles */}
        <About />

        {/* 2️⃣ Selected Work — Proof of capability */}
        <Projects />

        {/* 3️⃣ Infrastructure / DevOps — Deployment ownership */}
        <DevOps />

        {/* 4️⃣ Core Stack — Technical depth */}
        <div id="work">
          <Skills />
        </div>

        {/* 5️⃣ Experience — Credibility & Impact */}
        <Experience />

        {/* 6️⃣ GitHub — Consistency & Contribution */}
        <GitHub />
        
        {/* 8️⃣ Contact — Call-to-Action */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
