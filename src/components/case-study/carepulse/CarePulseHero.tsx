"use client";

import Link from "next/link";
import { nasalization } from "@/app/fonts";
import { Project } from "@/types/project";
import { LuArrowLeft, LuArrowUpRight, LuFolderGit2, LuWorkflow } from "react-icons/lu";
import { motion, useReducedMotion } from "motion/react";

interface CarePulseHeroProps {
  project: Project;
}

export const CarePulseHero = ({ project }: CarePulseHeroProps) => {
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
          <LuArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO SELECTED WORK</span>
        </Link>

        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-neutral-500">SYSTEM TYPE:</span>
          <span className="text-emerald-400 font-medium">FULL-STACK HEALTHCARE WORKFLOW ENGINE</span>
          <span className="text-neutral-700">|</span>
          <span className="text-neutral-500">STATUS:</span>
          <span className="text-white font-medium">PRODUCTION READY</span>
        </div>
      </motion.div>

      {/* Title & Core Subtitle */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-widest uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            NEXT.JS 14 + APPWRITE
          </span>
          <span className="text-xs font-mono text-neutral-500">CASE STUDY // 2024–2025</span>
        </div>

        <h1
          className={`${nasalization.className} text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase`}
        >
          CAREPULSE
        </h1>

        <p className="text-lg sm:text-xl text-neutral-400 font-sans max-w-3xl leading-relaxed">
          Healthcare operations and patient scheduling engine. Orchestrates multi-step validated patient onboarding, clinical records, state-driven appointment transitions, Appwrite document storage, and Twilio SMS notifications via Next.js server actions.
        </p>
      </motion.div>

      {/* Action Links Bar */}
      <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-2">
        <a
          href={project.githubUrl || "https://github.com/Tushardevx01/carepulse"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-white hover:bg-neutral-800 hover:border-neutral-700 transition-all focus-visible:ring-1 focus-visible:ring-emerald-400"
        >
          <LuFolderGit2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>VIEW REPOSITORY</span>
          <LuArrowUpRight className="w-3 h-3 text-neutral-500" />
        </a>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all focus-visible:ring-1 focus-visible:ring-emerald-400"
          >
            <span>LIVE DEMO</span>
            <LuArrowUpRight className="w-3 h-3 text-emerald-400" />
          </a>
        )}

        <button
          onClick={handleScrollToArchitecture}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black border border-neutral-800/80 text-xs font-mono text-neutral-400 hover:text-white hover:border-neutral-700 transition-all"
        >
          <LuWorkflow className="w-3.5 h-3.5 text-emerald-400" />
          <span>EXPLORE ARCHITECTURE</span>
          <span>↓</span>
        </button>
      </motion.div>

      {/* Technical Metadata Matrix */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-4 border-t border-neutral-900"
      >
        <div className="p-3 rounded-lg border border-neutral-900 bg-[#09090b]">
          <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1">
            CORE ARCHITECTURE
          </div>
          <div className="text-xs font-mono text-white font-medium">Next.js 14 App Router</div>
          <div className="text-[11px] text-neutral-500 mt-0.5">Server Actions + Node/Edge</div>
        </div>

        <div className="p-3 rounded-lg border border-neutral-900 bg-[#09090b]">
          <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1">
            BACKEND PLATFORM
          </div>
          <div className="text-xs font-mono text-emerald-400 font-medium">Appwrite BaaS</div>
          <div className="text-[11px] text-neutral-500 mt-0.5">Users · DB · Storage · Messages</div>
        </div>

        <div className="p-3 rounded-lg border border-neutral-900 bg-[#09090b]">
          <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1">
            VALIDATION ENGINE
          </div>
          <div className="text-xs font-mono text-white font-medium">Zod + React Hook Form</div>
          <div className="text-[11px] text-neutral-500 mt-0.5">Centralized Schema Resolver</div>
        </div>

        <div className="p-3 rounded-lg border border-neutral-900 bg-[#09090b]">
          <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1">
            NOTIFICATIONS
          </div>
          <div className="text-xs font-mono text-white font-medium">Twilio SMS</div>
          <div className="text-[11px] text-neutral-500 mt-0.5">Appwrite Messaging Bridge</div>
        </div>

        <div className="p-3 rounded-lg border border-neutral-900 bg-[#09090b] col-span-2 sm:col-span-1">
          <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1">
            OBSERVABILITY
          </div>
          <div className="text-xs font-mono text-white font-medium">Sentry + Vercel</div>
          <div className="text-[11px] text-neutral-500 mt-0.5">Production Exception Telemetry</div>
        </div>
      </motion.div>
    </motion.header>
  );
};
