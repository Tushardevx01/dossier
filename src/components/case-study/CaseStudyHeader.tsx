import React from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { LuExternalLink, LuArrowLeft } from "react-icons/lu";
import { nasalization } from "@/app/fonts";
import { TechnicalLabel } from "./TechnicalLabel";
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
    <header className="space-y-8 pb-12 border-b border-neutral-800/80">
      {/* Top Breadcrumb & Badge */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/#selected-work"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-neutral-400 hover:text-emerald-400 transition-colors"
        >
          <LuArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO SELECTED WORK</span>
        </Link>

        <div className="flex items-center gap-2">
          <TechnicalLabel variant="emerald">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            CASE STUDY
          </TechnicalLabel>
          <TechnicalLabel variant="default">{meta.category}</TechnicalLabel>
        </div>
      </div>

      {/* Main Title & Subtitle */}
      <div className="space-y-3">
        <h1
          className={`${nasalization.className} text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white`}
        >
          {meta.title}
        </h1>
        <p className="text-base sm:text-xl text-neutral-300 font-sans max-w-[760px] leading-relaxed">
          {meta.subtitle}
        </p>
      </div>

      {/* Metadata Matrix Row (ROLE | STACK | YEAR | STATUS | READ TIME) */}
      <div className="rounded-lg border border-neutral-800/80 bg-[#07070a] overflow-hidden text-xs font-mono">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 divide-neutral-800/80 sm:divide-x">
          {/* ROLE */}
          <div className="p-3.5 space-y-1">
            <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-semibold">
              ROLE
            </span>
            <span className="text-neutral-200 font-medium truncate block">
              {role}
            </span>
          </div>

          {/* STACK */}
          <div className="p-3.5 space-y-1 col-span-1 sm:col-span-1">
            <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-semibold">
              CORE STACK
            </span>
            <span className="text-neutral-200 font-medium truncate block">
              {techStack.slice(0, 3).join(" / ")}
            </span>
          </div>

          {/* YEAR */}
          <div className="p-3.5 space-y-1">
            <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-semibold">
              YEAR
            </span>
            <span className="text-neutral-200 font-medium block">
              {year}
            </span>
          </div>

          {/* STATUS */}
          <div className="p-3.5 space-y-1">
            <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-semibold">
              STATUS
            </span>
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {status}
            </span>
          </div>

          {/* READ TIME */}
          <div className="p-3.5 space-y-1 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-semibold">
              EST. READ
            </span>
            <span className="text-neutral-200 font-medium block">
              {meta.readTime} MIN READ
            </span>
          </div>
        </div>
      </div>

      {/* Editorial Overview: WHAT / WHY / HOW in reading column */}
      <div className="max-w-[760px] space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed">
        <p className="font-light">{meta.excerpt}</p>
        {project?.problem && (
          <p className="text-neutral-400 text-xs sm:text-sm font-light">
            <strong className="text-neutral-200 font-medium">Core Challenge: </strong>
            {project.problem}
          </p>
        )}
      </div>

      {/* Action Links & Tech Pills */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>

        <div className="flex items-center gap-3">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-mono text-neutral-200 hover:text-white transition-colors"
            >
              <FaGithub className="w-3.5 h-3.5" />
              <span>REPOSITORY</span>
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-800/60 text-xs font-mono text-emerald-300 hover:text-white transition-colors"
            >
              <LuExternalLink className="w-3.5 h-3.5" />
              <span>SYSTEM DEMO</span>
            </a>
          )}
        </div>
      </div>

      {/* Immediate primary visual slot right below header */}
      {children && <div className="pt-6">{children}</div>}
    </header>
  );
};
