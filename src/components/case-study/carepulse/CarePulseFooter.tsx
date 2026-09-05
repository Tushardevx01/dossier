"use client";

import Link from "next/link";
import { nasalization, mono } from "@/app/fonts";
import { Project } from "@/types/project";
import { LuFolderGit2, LuArrowUpRight, LuArrowRight, LuExternalLink } from "react-icons/lu";

interface CarePulseFooterProps {
  project: Project;
  nextProject?: Project;
}

export const CarePulseFooter = ({ project, nextProject }: CarePulseFooterProps) => {
  return (
    <section id="source" className="scroll-mt-28 space-y-8 pt-8 border-t border-neutral-900">
      {/* Open Source CTA Card */}
      <div className="p-6 sm:p-8 rounded-xl border border-neutral-800 bg-[#070709] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <span className={`${mono.className} text-[11px] tracking-[0.25em] text-emerald-400 uppercase font-semibold block`}>
            18 // OPEN IMPLEMENTATION
          </span>
          <h2 className={`${nasalization.className} text-xl sm:text-2xl md:text-3xl font-bold text-white uppercase tracking-tight`}>
            THE IMPLEMENTATION IS OPEN.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
            Inspect the Next.js server actions, centralized Zod validation schemas, Appwrite backend integration, and administrative passkey verification on GitHub.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={project.githubUrl || "https://github.com/Tushardevx01/carepulse"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-neutral-200 text-black font-medium text-xs font-mono tracking-wider transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
          >
            <LuFolderGit2 className="w-4 h-4" />
            <span>VIEW SOURCE CODE</span>
            <LuArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-neutral-800 hover:border-neutral-600 bg-neutral-900 text-neutral-200 text-xs font-mono tracking-wider transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
            >
              <LuExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span>VIEW LIVE DEMO</span>
              <LuArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Next Case Study Navigation */}
      {nextProject && (
        <div className="p-5 sm:p-6 rounded-xl border border-neutral-900 bg-black/60 hover:border-neutral-800 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block font-semibold">
                NEXT CASE STUDY
              </span>
              <h3 className={`${nasalization.className} text-lg sm:text-xl font-bold text-white uppercase tracking-wide`}>
                {nextProject.name}
              </h3>
              <p className="text-xs text-neutral-400 font-sans max-w-xl">
                {nextProject.subtitle}
              </p>
            </div>

            <Link
              href={`/work/${nextProject.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-mono tracking-wider transition-colors border border-neutral-800 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none self-start sm:self-center shrink-0 group"
            >
              <span>EXPLORE NEXT</span>
              <LuArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-emerald-400" />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};
