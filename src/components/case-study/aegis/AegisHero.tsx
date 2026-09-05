"use client";

import Link from "next/link";
import { nasalization, mono } from "@/app/fonts";
import { Project } from "@/types/project";
import { LuArrowLeft, LuArrowUpRight, LuFolderGit2, LuNetwork } from "react-icons/lu";
import { motion, useReducedMotion } from "motion/react";

interface AegisHeroProps {
  project: Project;
}

export const AegisHero = ({ project }: AegisHeroProps) => {
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

        {/* System Status Indicators */}
        <div className="flex items-center gap-3 font-mono text-xs text-neutral-400">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>LOCAL-FIRST</span>
          </span>
          <span className="text-neutral-700">•</span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>CLOSED-LOOP</span>
          </span>
        </div>
      </motion.div>

      {/* Editorial Title & Subtitle */}
      <div className="space-y-6">
        <motion.div variants={itemVariants} className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`${mono.className} text-[11px] uppercase tracking-[0.25em] text-neutral-500 font-semibold`}>
              01 // CASE STUDY
            </span>
            <span className="text-neutral-700">/</span>
            <span className={`${mono.className} text-[11px] uppercase tracking-[0.2em] text-emerald-400 font-medium`}>
              AIR-GAPPED AIOPS & SELF-HEALING INFRASTRUCTURE
            </span>
          </div>

          <h1
            className={`${nasalization.className} text-5xl sm:text-7xl md:text-8xl font-bold text-white uppercase tracking-tight leading-none`}
          >
            AEGIS
          </h1>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl text-neutral-300 font-sans leading-relaxed max-w-3xl font-light"
        >
          Closed-loop, local-first SRE platform for detecting container failures, diagnosing incidents, and executing policy-controlled remediation.
        </motion.p>
      </div>

      {/* Compact Metadata Strip */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-5 gap-4 py-5 px-6 rounded-xl border border-neutral-800/80 bg-neutral-950 font-mono text-xs"
      >
        <div className="space-y-1">
          <span className="text-[10px] text-neutral-500 block uppercase tracking-wider font-semibold">ROLE</span>
          <span className="text-neutral-200 font-medium block leading-tight">Lead Systems Architect & Core Developer</span>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] text-neutral-500 block uppercase tracking-wider font-semibold">SYSTEM</span>
          <span className="text-neutral-200 font-medium block leading-tight">Distributed SRE / AIOps Platform</span>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] text-neutral-500 block uppercase tracking-wider font-semibold">RUNTIME</span>
          <span className="text-emerald-400 font-medium block leading-tight">Fully Local / Air-Gapped</span>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] text-neutral-500 block uppercase tracking-wider font-semibold">STATUS</span>
          <span className="text-emerald-400 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Active
          </span>
        </div>
        <div className="space-y-1 col-span-2 md:col-span-1">
          <span className="text-[10px] text-neutral-500 block uppercase tracking-wider font-semibold">PRIMARY STACK</span>
          <span className="text-neutral-200 font-medium block leading-tight">
            NestJS · Kafka · MongoDB · Python · Docker
          </span>
        </div>
      </motion.div>

      {/* Quick Action CTAs */}
      <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-2">
        <a
          href={project.githubUrl || "https://github.com/Tushardevx01/aegis"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-neutral-200 text-black font-medium text-xs font-mono tracking-wider transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
        >
          <LuFolderGit2 className="w-4 h-4" />
          <span>INSPECT SOURCE CODE</span>
          <LuArrowUpRight className="w-3.5 h-3.5" />
        </a>

        <button
          onClick={handleScrollToArchitecture}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-800/80 hover:border-neutral-700 bg-neutral-950 text-neutral-400 hover:text-white text-xs font-mono tracking-wider transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none cursor-pointer"
        >
          <LuNetwork className="w-3.5 h-3.5 text-emerald-400" />
          <span>EXPLORE ARCHITECTURE ↓</span>
        </button>
      </motion.div>
    </motion.header>
  );
};
