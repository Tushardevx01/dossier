"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { Navbar, Footer } from "@/components/common";
import { Hero } from "@/components/sections";
import { Background, PreLoader } from "@/components/common";

const About = dynamic(() => import("@/components/sections/About").then((mod) => mod.About));
const Experience = dynamic(() => import("@/components/sections/Experience").then((mod) => mod.Experience));
const Skills = dynamic(() => import("@/components/sections/Skills").then((mod) => mod.Skills));
const Projects = dynamic(() => import("@/components/sections/Projects").then((mod) => mod.Projects));
const GitHub = dynamic(() => import("@/components/sections/GitHub").then((mod) => mod.GitHub));
const DevOps = dynamic(() => import("@/components/sections/DevOps").then((mod) => mod.DevOps));
const Contact = dynamic(() => import("@/components/sections/Contact").then((mod) => mod.Contact));

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
