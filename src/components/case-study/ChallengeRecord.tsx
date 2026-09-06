import React from "react";
import { mono } from "@/app/fonts";
import { TechnicalLabel } from "./TechnicalLabel";

export interface ChallengeRecordProps {
  number: string;
  title: string;
  category?: string;
  problem: string;
  constraint?: string;
  solution?: string;
  result?: string;
  diagram?: React.ReactNode;
  className?: string;
}

export const ChallengeRecord: React.FC<ChallengeRecordProps> = ({
  number,
  title,
  category,
  problem,
  constraint,
  solution,
  result,
  diagram,
  className = "",
}) => {
  return (
    <article
      className={`border-l-2 border-neutral-800 hover:border-emerald-500/60 pl-5 sm:pl-7 py-2 space-y-4 transition-colors ${className}`}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-1">
        <div className="flex items-center gap-2.5">
          <span
            className={`${mono.className} font-mono text-xs font-bold text-emerald-400 select-none`}
          >
            {number} CHALLENGE
          </span>
          <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wide">
            {title}
          </h3>
        </div>

        {category && (
          <TechnicalLabel variant="default" size="xs">
            {category}
          </TechnicalLabel>
        )}
      </div>

      {/* Structured Log Grid (replaces 4 nested cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs sm:text-sm">
        {problem && (
          <div className="space-y-1">
            <span
              className={`${mono.className} font-mono text-[10px] uppercase tracking-wider text-rose-400 font-bold block select-none`}
            >
              PROBLEM
            </span>
            <p className="text-neutral-300 font-sans leading-relaxed">
              {problem}
            </p>
          </div>
        )}

        {constraint && (
          <div className="space-y-1">
            <span
              className={`${mono.className} font-mono text-[10px] uppercase tracking-wider text-amber-400 font-bold block select-none`}
            >
              CONSTRAINT
            </span>
            <p className="text-neutral-300 font-sans leading-relaxed">
              {constraint}
            </p>
          </div>
        )}

        {solution && (
          <div className="space-y-1">
            <span
              className={`${mono.className} font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-bold block select-none`}
            >
              SOLUTION
            </span>
            <p className="text-neutral-300 font-sans leading-relaxed">
              {solution}
            </p>
          </div>
        )}

        {result && (
          <div className="space-y-1">
            <span
              className={`${mono.className} font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-bold block select-none`}
            >
              RESULT
            </span>
            <p className="text-neutral-200 font-sans leading-relaxed font-medium">
              {result}
            </p>
          </div>
        )}
      </div>

      {/* Optional attached diagram */}
      {diagram && <div className="pt-2">{diagram}</div>}
    </article>
  );
};
