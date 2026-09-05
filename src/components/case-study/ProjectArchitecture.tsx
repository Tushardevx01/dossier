"use client";

import { nasalization } from "@/app/fonts";
import { ProjectArchitectureLayer } from "@/types/project";
import { LuArrowDown, LuLayers } from "react-icons/lu";

interface ProjectArchitectureProps {
  flowSummary: string;
  layers: ProjectArchitectureLayer[];
}

export const ProjectArchitecture = ({ flowSummary, layers }: ProjectArchitectureProps) => {
  return (
    <div className="rounded-xl border border-neutral-800 bg-[#09090b] p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <LuLayers className="w-4 h-4 text-emerald-400" />
          <h3 className={`${nasalization.className} text-lg sm:text-xl font-bold text-white tracking-wide uppercase`}>
            SYSTEM ARCHITECTURE & DATA FLOW
          </h3>
        </div>
        <span className="font-mono text-[11px] text-neutral-500">
          END-TO-END TOPOLOGY
        </span>
      </div>

      <div className="p-4 rounded-lg bg-[#0e0e13] border border-neutral-800/80 font-mono text-xs text-neutral-300">
        <span className="text-emerald-400 font-bold mr-2">FLOW:</span>
        <span>{flowSummary}</span>
      </div>

      {/* Visual representation of system layers */}
      <div className="space-y-3 pt-2">
        {layers.map((layer, index) => (
          <div key={layer.name} className="flex flex-col items-center">
            <div className="w-full p-4 sm:p-5 rounded-lg border border-neutral-800 bg-[#0d0d12] hover:border-neutral-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-neutral-500 font-bold">
                    0{index + 1}
                  </span>
                  <span className={`${nasalization.className} text-sm sm:text-base font-bold text-white tracking-wide`}>
                    {layer.name}
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-neutral-300 font-sans pl-7">
                  {layer.role}
                </p>
              </div>

              <div className="pl-7 sm:pl-0 sm:text-right">
                <span className="font-mono text-[11px] text-emerald-400 px-2.5 py-1 rounded bg-emerald-950/20 border border-emerald-900/30 inline-block">
                  {layer.tech}
                </span>
              </div>
            </div>

            {index < layers.length - 1 && (
              <div className="flex flex-col items-center my-1">
                <div className="w-px h-3 bg-neutral-800" />
                <LuArrowDown className="w-3.5 h-3.5 text-neutral-600 -my-0.5" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
