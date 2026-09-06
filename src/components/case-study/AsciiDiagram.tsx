"use client";

import React, { useState } from "react";
import { LuCopy, LuCheck, LuTerminal } from "react-icons/lu";
import { mono } from "@/app/fonts";

export interface AsciiDiagramProps {
  title?: string;
  badge?: string;
  caption?: string;
  ascii: string;
  rawHtml?: string;
  variant?: "default" | "breakout" | "compact";
  className?: string;
}

export const AsciiDiagram: React.FC<AsciiDiagramProps> = ({
  title = "SYSTEM ARCHITECTURE",
  badge,
  caption,
  ascii,
  rawHtml,
  variant = "default",
  className = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ascii);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const containerClasses =
    variant === "breakout"
      ? "w-full max-w-[1200px]"
      : variant === "compact"
      ? "w-full max-w-[800px]"
      : "w-full";

  return (
    <div
      className={`rounded-lg border border-neutral-800/80 bg-[#07070a] shadow-xl overflow-hidden font-mono ${containerClasses} ${className}`}
    >
      {/* Chrome Top Bar */}
      <div className="px-4 py-2.5 bg-neutral-950/90 border-b border-neutral-800/80 flex items-center justify-between gap-3 text-xs select-none">
        <div className="flex items-center gap-3 min-w-0">
          {/* Subtle status dots */}
          <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
            <span className="w-2 h-2 rounded-full bg-neutral-800" />
            <span className="w-2 h-2 rounded-full bg-neutral-800" />
            <span className="w-2 h-2 rounded-full bg-emerald-500/70 animate-pulse" />
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-neutral-800 text-neutral-400 truncate">
            <LuTerminal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-[11px] text-neutral-200 font-semibold uppercase tracking-wider truncate">
              {title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {badge && (
            <span className="hidden sm:inline-block text-[10px] text-emerald-400/90 bg-emerald-950/30 border border-emerald-900/50 px-2 py-0.5 rounded tracking-wider uppercase font-medium">
              {badge}
            </span>
          )}

          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy ASCII diagram to clipboard"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-[10px] sm:text-[11px] text-neutral-300 hover:text-white transition-colors border border-neutral-800 focus-visible:ring-1 focus-visible:ring-emerald-400 focus-visible:outline-none cursor-pointer select-none"
          >
            {copied ? (
              <>
                <LuCheck className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400 font-bold">COPIED</span>
              </>
            ) : (
              <>
                <LuCopy className="w-3 h-3 text-neutral-400" />
                <span>COPY</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Diagram Canvas: white-space: pre is strictly enforced, horizontal scroll enabled */}
      <div className="p-4 sm:p-6 lg:p-7 overflow-x-auto bg-black/70 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
        {rawHtml ? (
          <pre
            className="font-mono text-[11px] sm:text-[12px] md:text-[12.5px] lg:text-[13px] leading-[1.4] sm:leading-[1.45] whitespace-pre select-text text-neutral-200 block min-w-fit"
            style={{
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              letterSpacing: "0px",
            }}
            dangerouslySetInnerHTML={{ __html: rawHtml }}
          />
        ) : (
          <pre
            className="font-mono text-[11px] sm:text-[12px] md:text-[12.5px] lg:text-[13px] leading-[1.4] sm:leading-[1.45] whitespace-pre select-text text-neutral-200 block min-w-fit"
            style={{
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              letterSpacing: "0px",
            }}
          >
            {ascii}
          </pre>
        )}
      </div>

      {/* Chrome Bottom Caption Bar */}
      <div className="px-4 py-2.5 border-t border-neutral-900 bg-neutral-950/70 text-[11px] text-neutral-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <p className="font-sans text-[11px] sm:text-xs text-neutral-400 max-w-2xl leading-normal">
          {caption || "Authoritative system flow and architecture topology spec."}
        </p>
        <span className="text-neutral-600 font-mono text-[10px] uppercase tracking-wider shrink-0 select-none">
          HORIZONTAL SCROLL ON MOBILE ↔
        </span>
      </div>
    </div>
  );
};
