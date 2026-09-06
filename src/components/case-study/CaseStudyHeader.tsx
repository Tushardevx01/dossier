import React from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { LuExternalLink, LuArrowLeft } from "react-icons/lu";
import { nasalization } from "@/app/fonts";
import { TechBadge } from "@/lib/tech-icons";
import { Project } from "@/types/project";

export interface CaseStudyHeaderProps {
  meta: {
    slug: string;
    title: string;
    subtitle: string;
    excerpt: string;
    category: string;
    level: string;
    readTime: number;
    date: string;
    tags: string[];
  };
  project?: Project | null;
  children?: React.ReactNode;
}

export const CaseStudyHeader: React.FC<CaseStudyHeaderProps> = ({
  meta,
  project,
  children,
}) => {
  const role = project?.role || "Systems Architect & Developer";
  const year = project?.year || meta.date || "2026";
  const status = project?.status || "Active";
  const techStack = project?.technologies || meta.tags;
  const githubUrl = project?.githubUrl || project?.github_link;
  const liveUrl = project?.liveUrl || project?.demo;

  return (
    <header className="space-y-8 pb-10">
      {/* Top Breadcrumb & Badges */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/#selected-work"
          className="inline-flex items-center gap-2 font-mono text-xs sm:text-[13px] text-neutral-400 hover:text-white transition-colors uppercase tracking-wider"
        >
          <LuArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO SELECTED WORK</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/40 border border-emerald-800/60 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            CASE STUDY
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#0c0c0e] border border-neutral-800 text-neutral-300 font-mono text-xs font-medium uppercase tracking-wider">
            {meta.category}
          </span>
        </div>
      </div>

      {/* Main Title & Subtitle */}
      <div className="space-y-3">
        <h1
          className={`${nasalization.className} text-5xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-white`}
        >
          {meta.title}
        </h1>
        <p className="text-xl sm:text-2xl text-neutral-200 font-sans tracking-normal font-normal">
          {meta.subtitle}
        </p>
      </div>

      {/* Metadata Matrix Row (ROLE | CORE STACK | YEAR | STATUS | EST. READ) */}
      <div className="rounded-xl border border-neutral-800/80 bg-[#07070a]/90 overflow-hidden text-xs font-mono">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 divide-neutral-800/80 sm:divide-x">
          {/* ROLE */}
          <div className="p-4 sm:p-5 space-y-1.5 min-w-0">
            <span className="text-[10px] sm:text-[11px] text-neutral-500 uppercase tracking-wider block font-semibold">
              ROLE
            </span>
            <span
              className="text-neutral-200 font-medium truncate block text-xs sm:text-[13px]"
              title={role}
            >
              {role.length > 20 ? `${role.slice(0, 17).trimEnd()}...` : role}
            </span>
          </div>

          {/* CORE STACK */}
          <div className="p-4 sm:p-5 space-y-1.5 min-w-0">
            <span className="text-[10px] sm:text-[11px] text-neutral-500 uppercase tracking-wider block font-semibold">
              CORE STACK
            </span>
            <span
              className="text-neutral-200 font-medium truncate block text-xs sm:text-[13px]"
              title={techStack.join(" / ")}
            >
              {techStack.length > 2
                ? `${techStack[0]} / ${techStack[1]} /...`
                : techStack.join(" / ")}
            </span>
          </div>

          {/* YEAR */}
          <div className="p-4 sm:p-5 space-y-1.5 min-w-0">
            <span className="text-[10px] sm:text-[11px] text-neutral-500 uppercase tracking-wider block font-semibold">
              YEAR
            </span>
            <span className="text-neutral-200 font-medium block text-xs sm:text-[13px]">
              {year}
            </span>
          </div>

          {/* STATUS */}
          <div className="p-4 sm:p-5 space-y-1.5 min-w-0">
            <span className="text-[10px] sm:text-[11px] text-neutral-500 uppercase tracking-wider block font-semibold">
              STATUS
            </span>
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium text-xs sm:text-[13px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {status}
            </span>
          </div>

          {/* EST. READ */}
          <div className="p-4 sm:p-5 space-y-1.5 min-w-0 col-span-2 sm:col-span-1">
            <span className="text-[10px] sm:text-[11px] text-neutral-500 uppercase tracking-wider block font-semibold">
              EST. READ
            </span>
            <span className="text-neutral-200 font-medium block text-xs sm:text-[13px] uppercase">
              {meta.readTime} MIN READ
            </span>
          </div>
        </div>
      </div>

      {/* Editorial Overview: Excerpt & Core Challenge */}
      <div className="space-y-4 text-neutral-300 font-sans text-base sm:text-lg leading-relaxed">
        <p className="font-light sm:font-normal">{meta.excerpt}</p>
        {project?.problem && (
          <p className="font-light sm:font-normal">
            <span className="font-semibold text-white">Core Challenge: </span>
            <span className="text-neutral-300">{project.problem}</span>
          </p>
        )}
      </div>

      {/* Technologies Badges */}
      <div className="flex flex-wrap gap-2.5 items-center">
        {techStack.map((tech) => (
          <TechBadge key={tech} name={tech} />
        ))}
      </div>

      {/* Action Buttons: Repository & System Demo (on row below badges) */}
      <div className="flex items-center gap-3 pt-2">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#111113] hover:bg-[#18181b] border border-neutral-800 hover:border-neutral-700 text-xs font-mono text-neutral-200 hover:text-white transition-colors cursor-pointer"
          >
            <FaGithub className="w-3.5 h-3.5 text-neutral-300" />
            <span className="tracking-wider">REPOSITORY</span>
          </a>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#021d14] hover:bg-[#032b1e] border border-emerald-800/80 hover:border-emerald-600 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
          >
            <LuExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            <span className="tracking-wider font-semibold">SYSTEM DEMO</span>
          </a>
        )}
      </div>

      {/* Immediate primary visual slot right below header */}
      {children && <div className="pt-6">{children}</div>}
    </header>
  );
};
