"use client";

import { useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-hcl";

interface CodeBlockProps {
  children: string;
  className?: string;
  language?: string;
}

export function CodeBlock({
  children,
  className = "",
  language = "text",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Extract language from className if present
  const classMatch = className.match(/language-(\w+)/);
  const lang = classMatch ? classMatch[1] : language;

  // Highlight code on mount and when language changes
  useEffect(() => {
    Prism.highlightAll();
  }, [lang, children]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="relative my-6 overflow-hidden rounded-lg bg-[#1e1e1e] border border-neutral-800">
      {/* Header with language and copy button */}
      <div className="flex items-center justify-between bg-[#2b2b2b] px-4 py-3 border-b border-neutral-700">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          {lang}
        </span>
        <button
          onClick={handleCopy}
          className="px-3 py-1.5 text-xs font-medium text-neutral-400 hover:text-white transition-colors duration-200 hover:bg-[#3a3a3a] rounded"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Code block */}
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed m-0">
        <code
          className={`language-${lang}`}
          dangerouslySetInnerHTML={{ __html: children }}
        />
      </pre>

      {/* Custom styles for prism theme */}
      <style jsx>{`
        :global(.token.operator),
        :global(.token.entity),
        :global(.token.url),
        :global(.language-regex .token.regex) {
          background: transparent;
        }

        :global(code[class*="language-"],
        pre[class*="language-"]) {
          text-shadow: none;
        }
      `}</style>
    </div>
  );
}
