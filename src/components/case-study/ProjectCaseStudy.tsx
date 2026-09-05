"use client";

import Link from "next/link";
import { nasalization, mono } from "@/app/fonts";
import { Project } from "@/types/project";
import { ProjectArchitecture } from "./ProjectArchitecture";
import { ProjectChallenge } from "./ProjectChallenge";
import { ProjectTechnologyList } from "./ProjectTechnologyList";
import { ProjectResult } from "./ProjectResult";
import {
  LuArrowLeft,
  LuArrowUpRight,
  LuFolderGit2,
  LuGlobe,
} from "react-icons/lu";

interface ProjectCaseStudyProps {
  project: Project;
  nextProject?: Project;
}

export const ProjectCaseStudy = ({ project, nextProject }: ProjectCaseStudyProps) => {
  return (
    <article className="min-h-screen bg-black text-foreground pt-24 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16 sm:space-y-24">
        {/* Navigation Back Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
          <Link
            href="/#selected-work"
            className="inline-flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-white transition-colors group"
          >
            <LuArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO SELECTED WORK</span>
          </Link>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-neutral-400 uppercase">{project.status}</span>
          </div>
        </div>

        {/* 1. PROJECT OVERVIEW HERO */}
        <header className="space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-widest">
                {project.category}
              </span>
              <span className="text-neutral-600">•</span>
              <span className="font-mono text-xs text-neutral-500">
                CASE STUDY // {project.year}
              </span>
            </div>

            <h1 className={`${nasalization.className} text-4xl sm:text-6xl md:text-7xl font-bold text-white uppercase tracking-tight`}>
              {project.name}
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-neutral-300 font-sans leading-relaxed max-w-3xl">
              {project.subtitle}
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-xl border border-neutral-800 bg-[#09090b] font-mono text-xs">
            <div>
              <span className="text-neutral-500 block mb-1">ROLE</span>
              <span className="text-white font-medium">{project.role}</span>
            </div>
            <div>
              <span className="text-neutral-500 block mb-1">TIMELINE</span>
              <span className="text-white font-medium">{project.timeline}</span>
            </div>
            <div>
              <span className="text-neutral-500 block mb-1">STATUS</span>
              <span className="text-emerald-400 font-medium">{project.status}</span>
            </div>
            <div>
              <span className="text-neutral-500 block mb-1">CORE TECH</span>
              <span className="text-white font-medium">{project.tech.slice(0, 3).join(", ")}</span>
            </div>
          </div>
        </header>

        {/* 2. THE PROBLEM */}
        <section className="space-y-4">
          <div className="pb-3 border-b border-neutral-800">
            <span className={`${mono.className} text-[11px] tracking-[0.24em] text-neutral-500 uppercase font-semibold block mb-1`}>
              01 // THE CHALLENGE
            </span>
            <h2 className={`${nasalization.className} text-2xl sm:text-3xl font-bold text-white uppercase`}>
              THE PROBLEM
            </h2>
          </div>
          <div className="p-6 sm:p-8 rounded-xl border border-neutral-800 bg-[#09090b]">
            <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
              {project.problem}
            </p>
          </div>
        </section>

        {/* 3. THE APPROACH */}
        <section className="space-y-4">
          <div className="pb-3 border-b border-neutral-800">
            <span className={`${mono.className} text-[11px] tracking-[0.24em] text-neutral-500 uppercase font-semibold block mb-1`}>
              02 // ARCHITECTURAL STRATEGY
            </span>
            <h2 className={`${nasalization.className} text-2xl sm:text-3xl font-bold text-white uppercase`}>
              THE APPROACH
            </h2>
          </div>
          <div className="p-6 sm:p-8 rounded-xl border border-neutral-800 bg-[#09090b]">
            <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
              {project.approach}
            </p>
          </div>
        </section>

        {/* 4. ARCHITECTURE */}
        <section className="space-y-4">
          <div className="pb-3 border-b border-neutral-800">
            <span className={`${mono.className} text-[11px] tracking-[0.24em] text-neutral-500 uppercase font-semibold block mb-1`}>
              03 // SYSTEM TOPOLOGY
            </span>
            <h2 className={`${nasalization.className} text-2xl sm:text-3xl font-bold text-white uppercase`}>
              ARCHITECTURE & DATA FLOW
            </h2>
          </div>
          <ProjectArchitecture
            flowSummary={project.architecture.flowSummary}
            layers={project.architecture.layers}
          />
        </section>

        {/* 5. ENGINEERING CHALLENGES */}
        <section className="space-y-4">
          <div className="pb-3 border-b border-neutral-800">
            <span className={`${mono.className} text-[11px] tracking-[0.24em] text-neutral-500 uppercase font-semibold block mb-1`}>
              04 // HARD PROBLEMS SOLVED
            </span>
            <h2 className={`${nasalization.className} text-2xl sm:text-3xl font-bold text-white uppercase`}>
              ENGINEERING CHALLENGES
            </h2>
          </div>
          <ProjectChallenge challenges={project.challenges} />
        </section>

        {/* 6. KEY IMPLEMENTATION DECISIONS & TECHNICAL STACK */}
        <section className="space-y-4">
          <div className="pb-3 border-b border-neutral-800">
            <span className={`${mono.className} text-[11px] tracking-[0.24em] text-neutral-500 uppercase font-semibold block mb-1`}>
              05 // IMPLEMENTATION & STACK
            </span>
            <h2 className={`${nasalization.className} text-2xl sm:text-3xl font-bold text-white uppercase`}>
              TECHNICAL DECISIONS
            </h2>
          </div>
          <ProjectTechnologyList
            technologies={project.technologies}
            decisions={project.decisions}
          />
        </section>

        {/* 7. INTERFACE / OPERATIONAL STATE REPRESENTATION */}
        <section className="space-y-4">
          <div className="pb-3 border-b border-neutral-800">
            <span className={`${mono.className} text-[11px] tracking-[0.24em] text-neutral-500 uppercase font-semibold block mb-1`}>
              06 // INTERFACE & OBSERVABILITY
            </span>
            <h2 className={`${nasalization.className} text-2xl sm:text-3xl font-bold text-white uppercase`}>
              SYSTEM INTERACTION STATES
            </h2>
          </div>
          <div className="p-6 sm:p-8 rounded-xl border border-neutral-800 bg-[#09090b] space-y-6">
            <p className="text-sm text-neutral-300 font-sans leading-relaxed">
              Engineered with explicit operational feedback. The system communicates state through structured logs, synchronous status endpoints, and deterministic transition cycles.
            </p>

            <div className="p-4 sm:p-5 rounded-lg bg-black border border-neutral-800/80 font-mono text-xs text-neutral-300 space-y-2 overflow-x-auto">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800 text-neutral-500 text-[11px]">
                <span>SYSTEM STATE MACHINE TRACE</span>
                <span>STATUS // NOMINAL</span>
              </div>
              <div className="text-neutral-500">// Execution Lifecycle Verification</div>
              <div>
                <span className="text-emerald-400">[ADMITTED]</span> Job UUID:{" "}
                <span className="text-neutral-400">c98a72b0-4f21-4d92</span> • Idempotency key verified (SHA-256)
              </div>
              <div>
                <span className="text-sky-400">[LEASED]</span> Worker node:{" "}
                <span className="text-neutral-400">node-ap-south-01</span> • Mutex acquired via Redis Redlock
              </div>
              <div>
                <span className="text-amber-300">[RUNNING]</span> Container sandbox spawned • cgroups limits: 2.0 CPU / 1024MB RAM
              </div>
              <div>
                <span className="text-emerald-400">[COMPLETED]</span> Execution 842ms • Exit code 0 • Result receipt committed
              </div>
            </div>
          </div>
        </section>

        {/* 8. RESULTS */}
        <section className="space-y-4">
          <div className="pb-3 border-b border-neutral-800">
            <span className={`${mono.className} text-[11px] tracking-[0.24em] text-neutral-500 uppercase font-semibold block mb-1`}>
              07 // EMPIRICAL PROOF
            </span>
            <h2 className={`${nasalization.className} text-2xl sm:text-3xl font-bold text-white uppercase`}>
              MEASURABLE RESULTS
            </h2>
          </div>
          <ProjectResult results={project.results} />
        </section>

        {/* 9. LINKS & ACTIONS */}
        <section className="p-6 sm:p-8 rounded-xl border border-neutral-800 bg-[#09090b] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={project.githubUrl || project.github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-100 hover:bg-white text-black font-medium text-xs font-mono tracking-wider transition-colors"
            >
              <LuFolderGit2 className="w-4 h-4" />
              <span>INSPECT SOURCE CODE</span>
              <LuArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {(project.liveUrl || project.demo) &&
              (project.liveUrl || project.demo) !==
                (project.githubUrl || project.github_link) && (
                <a
                  href={project.liveUrl || project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-neutral-700 hover:border-neutral-500 bg-neutral-900 text-neutral-200 text-xs font-mono tracking-wider transition-colors"
                >
                  <LuGlobe className="w-4 h-4 text-emerald-400" />
                  <span>LIVE DEPLOYMENT</span>
                  <LuArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
          </div>

          {nextProject && (
            <Link
              href={`/work/${nextProject.slug}`}
              className="inline-flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-white transition-colors"
            >
              <span>NEXT SYSTEM: {nextProject.name}</span>
              <LuArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </section>
      </div>
    </article>
  );
};
