"use client";

import { useState } from "react";

interface CodeBlockProps {
  children: React.ReactNode;
  language?: string;
  title?: string;
}

export function CodeBlock({ children, language = "text", title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const code = extractCodeText(children);
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group my-8 rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-lg hover:border-zinc-700 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-zinc-900/50 border-b border-zinc-800">
        <span className="text-xs uppercase tracking-widest font-semibold text-zinc-400">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="px-2.5 py-1 text-xs uppercase tracking-wider font-medium text-zinc-400 hover:text-zinc-200 bg-zinc-800/30 hover:bg-zinc-800 rounded transition-all"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="px-6 py-4 text-sm leading-relaxed font-mono text-zinc-300">
          {children}
        </pre>
      </div>
    </div>
  );
}

// Utility to extract code from children
function extractCodeText(children: unknown): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractCodeText).join("");
  if (
    children &&
    typeof children === "object" &&
    "props" in children &&
    children.props &&
    typeof children.props === "object" &&
    "children" in children.props
  ) {
    return extractCodeText((children.props as Record<string, unknown>).children);
  }
  return "";
}
