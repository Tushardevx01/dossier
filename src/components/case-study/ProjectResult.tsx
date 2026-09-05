"use client";

import { nasalization, mono } from "@/app/fonts";
import { LuCheck, LuShieldCheck } from "react-icons/lu";

interface ProjectResultProps {
  results: string[];
}

export const ProjectResult = ({ results }: ProjectResultProps) => {
  return (
    <div className="rounded-xl border border-neutral-800 bg-[#09090b] p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-neutral-800">
        <div>
          <span className={`${mono.className} text-[11px] tracking-[0.24em] text-emerald-400 uppercase font-semibold block mb-1`}>
            OUTCOMES & RELIABILITY
          </span>
          <h3 className={`${nasalization.className} text-xl sm:text-2xl font-bold text-white uppercase`}>
            MEASURABLE ENGINEERING RESULTS
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <LuShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>VERIFIED POST-DEPLOYMENT</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {results.map((result, idx) => (
          <div
            key={idx}
            className="p-4 rounded-lg bg-[#0e0e13] border border-neutral-800/80 flex items-start gap-3.5"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-950/60 border border-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
              <LuCheck className="w-3 h-3 text-emerald-400" />
            </div>
            <p className="text-xs sm:text-[13px] text-neutral-200 font-sans leading-relaxed font-medium">
              {result}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
