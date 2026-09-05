"use client";

import { nasalization, mono } from "@/app/fonts";
import { ProjectChallenge as ProjectChallengeType } from "@/types/project";
import { LuTriangleAlert, LuCircleCheck } from "react-icons/lu";

interface ProjectChallengeProps {
  challenges: ProjectChallengeType[];
}

export const ProjectChallenge = ({ challenges }: ProjectChallengeProps) => {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-neutral-800">
        <span className={`${mono.className} text-[11px] tracking-[0.24em] text-neutral-500 uppercase font-semibold block mb-1`}>
          TECHNICAL RIGOR
        </span>
        <h3 className={`${nasalization.className} text-xl sm:text-2xl font-bold text-white uppercase`}>
          ENGINEERING CHALLENGES & SOLUTIONS
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.map((item, idx) => (
          <div
            key={item.title}
            className="p-6 rounded-xl border border-neutral-800 bg-[#09090b] hover:border-neutral-700 transition-colors space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-emerald-400 font-bold">
                  // 0{idx + 1}
                </span>
                <h4 className={`${nasalization.className} text-base font-bold text-white tracking-wide`}>
                  {item.title}
                </h4>
              </div>
            </div>

            <div className="space-y-2">
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-rose-400/90 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                  <LuTriangleAlert className="w-3 h-3" />
                  PROBLEM OBSERVED
                </span>
                <p className="text-xs sm:text-[13px] text-neutral-400 font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="space-y-1 pt-2 border-t border-neutral-900">
                <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                  <LuCircleCheck className="w-3 h-3" />
                  ARCHITECTURAL SOLUTION
                </span>
                <p className="text-xs sm:text-[13px] text-neutral-200 font-sans leading-relaxed">
                  {item.solution}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
