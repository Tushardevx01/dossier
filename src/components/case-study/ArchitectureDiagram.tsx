import React from "react";
import { AsciiDiagram, type AsciiDiagramProps } from "./AsciiDiagram";
import { mono } from "@/app/fonts";

export interface ArchitectureDiagramProps extends AsciiDiagramProps {
  layers?: { num?: string; title: string; desc: string }[];
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
  layers,
  ...diagramProps
}) => {
  return (
    <div className="space-y-6 w-full">
      {/* Primary Visual Breakout Diagram */}
      <AsciiDiagram variant="breakout" {...diagramProps} />

      {/* Layer / Component Matrix Breakdown (replaces 6 generic cards) */}
      {layers && layers.length > 0 && (
        <div className="rounded-lg border border-neutral-800/60 bg-neutral-950/40 divide-y divide-neutral-900/80 overflow-hidden">
          <div className="px-4 py-2.5 bg-neutral-900/40 border-b border-neutral-800/60 flex items-center justify-between">
            <span
              className={`${mono.className} font-mono text-[11px] uppercase tracking-wider text-neutral-400 font-semibold`}
            >
              SYSTEM SUBSYSTEMS &amp; RESPONSIBILITIES
            </span>
            <span className="font-mono text-[10px] text-neutral-500">
              {layers.length} SUBSYSTEMS SPECIFIED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-900/80">
            {layers.map((layer, idx) => (
              <div key={idx} className="p-4 space-y-1.5 hover:bg-neutral-900/20 transition-colors">
                <div className="flex items-center gap-2">
                  <span className={`${mono.className} font-mono text-xs text-emerald-400 font-bold`}>
                    {layer.num || String(idx + 1).padStart(2, "0")} //
                  </span>
                  <span className="text-xs font-semibold text-white uppercase tracking-wide">
                    {layer.title}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  {layer.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
