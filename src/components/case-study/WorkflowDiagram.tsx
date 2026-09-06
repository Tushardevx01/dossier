import React from "react";
import { AsciiDiagram, type AsciiDiagramProps } from "./AsciiDiagram";
import { mono } from "@/app/fonts";

export interface WorkflowDiagramProps extends AsciiDiagramProps {
  states?: string[];
}

export const WorkflowDiagram: React.FC<WorkflowDiagramProps> = ({
  states,
  ...diagramProps
}) => {
  return (
    <div className="space-y-4 w-full">
      {states && states.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 p-2.5 rounded-lg border border-neutral-800/60 bg-neutral-950/40 text-xs font-mono">
          <span className={`${mono.className} text-[10px] text-neutral-500 uppercase tracking-wider font-semibold mr-1`}>
            STATE MACHINE:
          </span>
          {states.map((st, idx) => (
            <React.Fragment key={idx}>
              <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 text-[11px]">
                {st}
              </span>
              {idx < states.length - 1 && (
                <span className="text-emerald-400 font-bold px-0.5">→</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      <AsciiDiagram {...diagramProps} />
    </div>
  );
};
