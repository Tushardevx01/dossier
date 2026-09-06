"use client";

import React, { useState } from "react";
import { LuCopy, LuCheck, LuCode } from "react-icons/lu";
import { mono } from "@/app/fonts";

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "go",
  filename,
  className = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className={`rounded-lg border border-neutral-800/80 bg-[#060608] shadow-lg overflow-hidden font-mono text-xs ${className}`}
    >
      <div className="px-4 py-2 bg-neutral-950 border-b border-neutral-800/80 flex items-center justify-between gap-3 text-xs select-none">
        <div className="flex items-center gap-2 text-neutral-400">
          <LuCode className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[11px] text-neutral-300 font-semibold uppercase tracking-wider">
            {filename || language}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code"
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 text-[10px] text-neutral-300 hover:text-white transition-colors border border-neutral-800 cursor-pointer"
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

      <div className="p-4 overflow-x-auto bg-black/60">
        <pre
          className="font-mono text-xs leading-relaxed text-neutral-200 whitespace-pre"
          style={{
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          }}
        >
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};
