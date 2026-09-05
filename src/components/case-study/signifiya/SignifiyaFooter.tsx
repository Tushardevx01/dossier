"use client";

import Link from "next/link";
import { nasalization } from "@/app/fonts";
import { Project } from "@/types/project";
import { LuFolderGit2, LuArrowUpRight, LuArrowRight, LuExternalLink } from "react-icons/lu";

interface SignifiyaFooterProps {
  project: Project;
  nextProject?: Project;
}

export const SignifiyaFooter = ({ project, nextProject }: SignifiyaFooterProps) => {
  return (
    <section id="source" className="scroll-mt-28 space-y-8 pt-8 border-t border-neutral-900">
      {/* Implementation CTA Card */}
      <div className="p-6 sm:p-8 rounded-xl border border-neutral-800 bg-[#070709] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <span className="font-mono text-[11px] tracking-[0.25em] text-emerald-400 uppercase font-semibold block">
            14 // OPEN REPOSITORY
          </span>
          <h2
            className={`${nasalization.className} text-xl sm:text-2xl md:text-3xl font-bold text-white uppercase tracking-tight`}
          >
            EXPLORE THE IMPLEMENTATION
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
            Inspect the Expo SDK 54 mobile architecture, Kotlin high-refresh-rate config plugin,
            Supabase RLS policies, defensive data parsers, and digital pass video engine on GitHub.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={project.githubUrl || "https://github.com/AbhishekS04/Signifiyaa"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-neutral-200 text-black font-medium text-xs font-mono tracking-wider transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
          >
            <LuFolderGit2 className="w-4 h-4" />
            <span>VIEW REPOSITORY</span>
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
              <span>OFFICIAL PORTAL</span>
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
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                NEXT CASE STUDY
              </span>
              <h3 className="text-base sm:text-lg font-semibold text-white">
                {nextProject.title}
              </h3>
              <p className="text-xs text-neutral-400 line-clamp-1">
                {nextProject.subtitle || nextProject.description}
              </p>
            </div>

            <Link
              href={`/work/${nextProject.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs border border-neutral-800 transition-colors self-start sm:self-auto focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
            >
              <span>CONTINUE READING</span>
              <LuArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};
