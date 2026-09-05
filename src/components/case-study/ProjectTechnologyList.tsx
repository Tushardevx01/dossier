"use client";

import { nasalization } from "@/app/fonts";
import { ProjectDecision } from "@/types/project";
import { LuCpu } from "react-icons/lu";

interface ProjectTechnologyListProps {
  technologies: string[];
  decisions: ProjectDecision[];
}

export const ProjectTechnologyList = ({
  technologies,
  decisions,
}: ProjectTechnologyListProps) => {
  return (
    <div className="space-y-8">
      {/* Technology tokens */}
      <div className="rounded-xl border border-neutral-800 bg-[#09090b] p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold">
            VERIFIED TECHNOLOGY STACK
          </span>
          <span className="font-mono text-[11px] text-neutral-500">
            {technologies.length} COMPONENTS
          </span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Why these technologies were chosen (Key implementation decisions) */}
      {decisions && decisions.length > 0 && (
        <div className="rounded-xl border border-neutral-800 bg-[#09090b] p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2 pb-4 border-b border-neutral-800">
            <LuCpu className="w-4 h-4 text-emerald-400" />
            <h4 className={`${nasalization.className} text-base sm:text-lg font-bold text-white tracking-wide uppercase`}>
              KEY IMPLEMENTATION DECISIONS
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {decisions.map((dec) => (
              <div
                key={dec.technology}
                className="p-4 rounded-lg bg-[#0d0d12] border border-neutral-800/80 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="font-mono text-xs font-bold text-white">
                    {dec.technology}
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-neutral-400 font-sans leading-relaxed">
                  {dec.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
