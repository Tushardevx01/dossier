"use client";

import { useState } from "react";
import { LuTerminal, LuCopy, LuCheck } from "react-icons/lu";

interface AsciiDiagramProps {
  title?: string;
  badge?: string;
  content: string;
  caption?: string;
  className?: string;
}

export const AsciiDiagram = ({
  title = "SYSTEM ARCHITECTURE",
  badge = "ASCII TOPOLOGY",
  content,
  caption,
  className = "",
}: AsciiDiagramProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  // Format line to highlight arrows and box-drawing borders subtly
  const formatLine = (line: string) => {
    // If the line is an arrow or connector line
    const hasArrow = /[▼▲►◄→↓]/.test(line);
    const isBoxBorder = /[┌┐└┘├┤┼─]/.test(line);

    return (
      <span
        className={`${
          hasArrow
            ? "text-emerald-400/90 font-semibold"
            : isBoxBorder
            ? "text-neutral-500"
            : "text-neutral-200"
        }`}
      >
        {line}
      </span>
    );
  };

  const lines = content.trim().split("\n");

  return (
    <div
      className={`rounded-xl border border-neutral-800/80 bg-[#070709] overflow-hidden shadow-2xl font-mono text-xs ${className}`}
    >
      {/* Terminal Title Bar */}
      <div className="px-4 sm:px-5 py-3 border-b border-neutral-800/80 bg-neutral-950 flex items-center justify-between gap-3 text-xs select-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2 h-2 rounded-full bg-neutral-800" />
            <span className="w-2 h-2 rounded-full bg-neutral-800" />
            <span className="w-2 h-2 rounded-full bg-neutral-800" />
          </div>
          <div className="flex items-center gap-2 pl-2 border-l border-neutral-800 text-neutral-400">
            <LuTerminal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] text-white tracking-wider uppercase font-semibold">
              {title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {badge && (
            <span className="hidden sm:inline-block text-[10px] text-emerald-400/90 bg-emerald-950/30 border border-emerald-900/50 px-2 py-0.5 rounded tracking-widest uppercase font-medium">
              {badge}
            </span>
          )}

          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy ASCII diagram"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-[11px] text-neutral-300 hover:text-white transition-colors border border-neutral-800 focus-visible:ring-1 focus-visible:ring-emerald-400 focus-visible:outline-none cursor-pointer"
          >
            {copied ? (
              <>
                <LuCheck className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">COPIED</span>
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

      {/* ASCII Content Area */}
      <div className="p-4 sm:p-6 overflow-x-auto no-scrollbar bg-black/60">
        <pre className="font-mono text-[11px] sm:text-[12px] md:text-[13px] leading-[1.35] sm:leading-[1.4] tracking-tight sm:tracking-normal whitespace-pre select-text">
          {lines.map((line, idx) => (
            <div key={idx} className="hover:bg-neutral-900/20 px-1 -mx-1 rounded transition-colors">
              {formatLine(line)}
            </div>
          ))}
        </pre>
      </div>

      {/* Optional Caption Bar */}
      {caption && (
        <div className="px-4 sm:px-5 py-2.5 border-t border-neutral-900 bg-neutral-950/60 text-[11px] text-neutral-400 flex items-center justify-between">
          <span>{caption}</span>
          <span className="text-neutral-600 font-mono text-[10px]">SCROLL HORIZONTALLY ON MOBILE ↔</span>
        </div>
      )}
    </div>
  );
};
