import React from "react";
import Link from "next/link";
import { LuArrowRight, LuArrowLeft } from "react-icons/lu";
import { mono } from "@/app/fonts";

export interface RelatedProjectsProps {
  nextCaseStudy?: {
    slug: string;
    title: string;
    subtitle: string;
  } | null;
  allWorkUrl?: string;
}

export const RelatedProjects: React.FC<RelatedProjectsProps> = ({
  nextCaseStudy,
  allWorkUrl = "/work",
}) => {
  return (
    <footer className="pt-16 pb-16 border-t border-neutral-800/80 space-y-8">
      {nextCaseStudy && (
        <div className="p-6 sm:p-8 rounded-lg bg-[#07070a] border border-neutral-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:border-neutral-700 transition-colors group">
          <div className="space-y-2 max-w-xl">
            <span
              className={`${mono.className} text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block`}
            >
              NEXT PRODUCTION SYSTEM // CASE STUDY
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white uppercase group-hover:text-emerald-300 transition-colors">
              {nextCaseStudy.title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-sans line-clamp-2 leading-relaxed font-light">
              {nextCaseStudy.subtitle}
            </p>
          </div>

          <Link
            href={`/work/${nextCaseStudy.slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-emerald-950/50 border border-emerald-800/60 text-emerald-300 font-mono text-xs font-semibold hover:bg-emerald-900/60 hover:text-white transition-all shrink-0"
          >
            <span>EXPLORE SYSTEM</span>
            <LuArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}

      <div className="flex items-center justify-between text-xs font-mono text-neutral-500 pt-2">
        <Link
          href={allWorkUrl}
          className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
        >
          <LuArrowLeft className="w-3.5 h-3.5" />
          <span>ALL CASE STUDIES</span>
        </Link>
        <span className="text-[11px] text-neutral-600">
          ENGINEERING DOSSIER &bull; TUSHAR KANTI DEY
        </span>
      </div>
    </footer>
  );
};
