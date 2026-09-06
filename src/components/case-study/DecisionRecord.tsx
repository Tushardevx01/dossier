import React from "react";
import { mono } from "@/app/fonts";

export interface DecisionRecordProps {
  number: string;
  area: string;
  technology: string;
  why: string;
  tradeoff?: string;
  outcome?: string;
  className?: string;
}

export const DecisionRecord: React.FC<DecisionRecordProps> = ({
  number,
  area,
  technology,
  why,
  tradeoff,
  outcome,
  className = "",
}) => {
  return (
    <article
      className={`border border-neutral-800/80 bg-[#07070a]/90 rounded-lg p-5 sm:p-6 space-y-4 hover:border-neutral-700 transition-colors ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-800/80">
        <span
          className={`${mono.className} font-mono text-[11px] font-bold text-emerald-400 select-none`}
        >
          DECISION {number} // {area}
        </span>
        <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide">
          {technology}
        </h3>
      </div>

      <div className="space-y-3 text-xs sm:text-sm font-sans">
        <div className="space-y-1">
          <span
            className={`${mono.className} font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-bold block select-none`}
          >
            WHY / RATIONALE
          </span>
          <p className="text-neutral-300 leading-relaxed font-light">{why}</p>
        </div>

        {tradeoff && (
          <div className="space-y-1">
            <span
              className={`${mono.className} font-mono text-[10px] uppercase tracking-wider text-amber-400/90 font-bold block select-none`}
            >
              TRADE-OFF ACCEPTED
            </span>
            <p className="text-neutral-400 leading-relaxed font-light">{tradeoff}</p>
          </div>
        )}

        {outcome && (
          <div className="space-y-1">
            <span
              className={`${mono.className} font-mono text-[10px] uppercase tracking-wider text-emerald-400/90 font-bold block select-none`}
            >
              OUTCOME / IMPACT
            </span>
            <p className="text-neutral-300 leading-relaxed font-light">{outcome}</p>
          </div>
        )}
      </div>
    </article>
  );
};
