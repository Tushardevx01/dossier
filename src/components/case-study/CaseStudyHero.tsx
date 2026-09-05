"use client";

import Link from "next/link";
import { nasalization, mono } from "@/app/fonts";
import { Project } from "@/types/project";
import { LuArrowLeft, LuArrowUpRight, LuFolderGit2, LuGlobe, LuNetwork } from "react-icons/lu";
import { motion, useReducedMotion } from "motion/react";

interface CaseStudyHeroProps {
  project: Project;
}

export const CaseStudyHero = ({ project }: CaseStudyHeroProps) => {
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

        <div className="flex items-center gap-3 font-mono text-xs text-neutral-500">
          <span className="text-emerald-400 font-bold uppercase tracking-wider">
            {project.category}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="uppercase">{project.status}</span>
          </span>
        </div>
      </motion.div>

      {/* Editorial Title & Deck */}
      <div className="space-y-6">
        <motion.div variants={itemVariants} className="space-y-3">
          <div className="flex items-center gap-2">
            <span className={`${mono.className} text-[11px] uppercase tracking-[0.25em] text-neutral-500 font-semibold`}>
              CASE STUDY
            </span>
            <span className="text-neutral-700">/</span>
            <span className={`${mono.className} text-[11px] uppercase tracking-[0.2em] text-neutral-500`}>
              {project.year}
            </span>
          </div>

          <h1
            className={`${nasalization.className} text-5xl sm:text-7xl md:text-8xl font-bold text-white uppercase tracking-tight leading-none`}
          >
            {project.name}
          </h1>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl text-neutral-300 font-sans leading-relaxed max-w-3xl font-light"
        >
          {project.subtitle}. {project.description}
        </motion.p>

        {/* Lightweight Platform Scope Badges */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-1 max-w-3xl">
          {[
            "One-Off Job Execution",
            "Node Management",
            "Long-Running App Deployment",
            "Container Lifecycle",
            "Service Routing",
            "Failure Recovery",
          ].map((scope) => (
            <span
              key={scope}
              className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-300"
            >
              {scope}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Metadata 4-Column Strip */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 py-5 px-6 rounded-xl border border-neutral-800/80 bg-neutral-950 font-mono text-xs"
      >
        <div className="space-y-1">
          <span className="text-[10px] text-neutral-500 block uppercase tracking-wider font-semibold">ROLE</span>
          <span className="text-neutral-200 font-medium block leading-tight">{project.role}</span>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] text-neutral-500 block uppercase tracking-wider font-semibold">TIMELINE</span>
          <span className="text-neutral-200 font-medium block leading-tight">{project.timeline}</span>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] text-neutral-500 block uppercase tracking-wider font-semibold">STATUS</span>
          <span className="text-emerald-400 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {project.status}
          </span>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] text-neutral-500 block uppercase tracking-wider font-semibold">CORE STACK</span>
          <span className="text-neutral-200 font-medium block leading-tight">
            Go · Docker/Podman · PostgreSQL
          </span>
        </div>
      </motion.div>

      {/* Quick Action CTAs */}
      <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-2">
        <a
          href={project.githubUrl || project.github_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-neutral-200 text-black font-medium text-xs font-mono tracking-wider transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
        >
          <LuFolderGit2 className="w-4 h-4" />
          <span>INSPECT SOURCE CODE</span>
          <LuArrowUpRight className="w-3.5 h-3.5" />
        </a>

        {project.liveUrl && project.liveUrl !== (project.githubUrl || project.github_link) && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-neutral-800 hover:border-neutral-600 bg-neutral-900/90 text-neutral-200 text-xs font-mono tracking-wider transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
          >
            <LuGlobe className="w-4 h-4 text-emerald-400" />
            <span>LIVE DEPLOYMENT</span>
            <LuArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}

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
