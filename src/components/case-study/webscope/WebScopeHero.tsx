"use client";

import Link from "next/link";
import { nasalization } from "@/app/fonts";
import { Project } from "@/types/project";
import { LuArrowLeft, LuArrowUpRight, LuFolderGit2, LuGlobe } from "react-icons/lu";
import { motion, useReducedMotion } from "motion/react";

interface WebScopeHeroProps {
  project: Project;
}

export const WebScopeHero = ({ project }: WebScopeHeroProps) => {
  const shouldReduceMotion = useReducedMotion();

  const handleScrollToArchitecture = () => {
    const el = document.getElementById("architecture");
    if (!el) return;
    const offset = 90;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = el.getBoundingClientRect().top;
    const offsetPosition = elementRect - bodyRect - offset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <motion.header
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 sm:space-y-10"
    >
      {/* Top Meta Bar */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-900"
      >
        <Link
          href="/#selected-work"
          className="inline-flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-white transition-colors group focus-visible:ring-1 focus-visible:ring-emerald-400 focus-visible:outline-none rounded"
        >
          <LuArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>BACK TO SELECTED WORK</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
            ROLE: FULL-STACK ENGINEER
          </span>
          <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
            TIMELINE: 2024
          </span>
          <span className="px-2.5 py-1 rounded bg-emerald-950/40 border border-emerald-800/60 text-emerald-400 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            WEBSITE INTELLIGENCE PLATFORM
          </span>
        </div>
      </motion.div>

      {/* Main Title & Tagline */}
      <motion.div variants={itemVariants} className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-400">
          <LuGlobe className="w-3.5 h-3.5 text-emerald-400" />
          <span>PIPELINE ARCHITECTURE // AXIOS + CHEERIO + PRISMA</span>
        </div>

        <h1
          className={`${nasalization.className} text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase`}
        >
          WEBSCOPE PRO
        </h1>

        <p className="text-lg sm:text-xl text-neutral-300 font-light leading-relaxed">
          A website intelligence and analysis platform that accepts a URL, safely fetches and
          analyzes the site, calculates SEO and performance signals, persists scan history,
          supports side-by-side comparisons and monitoring, and produces structured insights with
          deterministic AI fallbacks.
        </p>
      </motion.div>

      {/* Action Buttons & Links */}
      <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-2">
        <a
          href={project.githubUrl || "https://github.com/Tushardevx01/webscope"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs border border-neutral-800 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
        >
          <LuFolderGit2 className="w-4 h-4 text-emerald-400" />
          <span>VIEW REPOSITORY</span>
          <LuArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
        </a>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-mono text-xs border border-emerald-500/30 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
          >
            <LuArrowUpRight className="w-4 h-4 text-emerald-400" />
            <span>LIVE DEMO</span>
          </a>
        )}

        <button
          onClick={handleScrollToArchitecture}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-950 hover:bg-neutral-900 text-neutral-400 hover:text-neutral-200 font-mono text-xs border border-neutral-900 hover:border-neutral-800 transition-colors"
        >
          <span>EXPLORE PIPELINE TOPOLOGY</span>
          <span className="text-emerald-500 font-mono">↓</span>
        </button>
      </motion.div>

      {/* Quick Specs Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-neutral-900"
      >
        <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-900">
          <div className="font-mono text-[11px] text-neutral-400 uppercase">SCRAPER RUNTIME</div>
          <div className="mt-1 font-mono text-sm sm:text-base font-semibold text-white">
            Axios + Cheerio
          </div>
          <div className="text-xs text-neutral-400 mt-0.5">Lightweight Serverless DOM Parsing</div>
        </div>

        <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-900">
          <div className="font-mono text-[11px] text-neutral-400 uppercase">CONCURRENCY LIMIT</div>
          <div className="mt-1 font-mono text-sm sm:text-base font-semibold text-emerald-400">
            4 Parallel Slots
          </div>
          <div className="text-xs text-neutral-400 mt-0.5">Bounded Queue & Slot Release</div>
        </div>

        <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-900">
          <div className="font-mono text-[11px] text-neutral-400 uppercase">DATA PERSISTENCE</div>
          <div className="mt-1 font-mono text-sm sm:text-base font-semibold text-white">
            Prisma + PostgreSQL
          </div>
          <div className="text-xs text-neutral-400 mt-0.5">Relational Scans, Alerts & Monitors</div>
        </div>

        <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-900">
          <div className="font-mono text-[11px] text-neutral-400 uppercase">AI RESILIENCE</div>
          <div className="mt-1 font-mono text-sm sm:text-base font-semibold text-white">
            Deterministic Fallback
          </div>
          <div className="text-xs text-neutral-400 mt-0.5">6s AI Timeout with Pre-computed Output</div>
        </div>
      </motion.div>
    </motion.header>
  );
};
