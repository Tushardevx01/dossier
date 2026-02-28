"use client";

import { useEffect, useRef } from "react";

let prismBootPromise: Promise<typeof import("prismjs")> | null = null;

async function loadPrism() {
  if (!prismBootPromise) {
    prismBootPromise = (async () => {
      const prismModule = await import("prismjs");

      await import("prismjs/components/prism-javascript");
      await import("prismjs/components/prism-jsx");
      await import("prismjs/components/prism-typescript");
      await import("prismjs/components/prism-tsx");
      await import("prismjs/components/prism-sql");
      await import("prismjs/components/prism-bash");
      await import("prismjs/components/prism-hcl");

      return prismModule;
    })();
  }

  return prismBootPromise;
}

interface PrismHighlighterProps {
  slug: string;
  children: React.ReactNode;
}

/**
 * Client-side wrapper component that ensures Prism syntax highlighting
 * is applied when the slug changes (dynamic content).
 * 
 * This handles:
 * - Initial highlighting on mount
 * - Re-highlighting when navigating between articles
 * - Proper DOM mutation for new content
 */
export function PrismHighlighter({ slug, children }: PrismHighlighterProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const highlight = async () => {
      const prismModule = await loadPrism();
      if (cancelled || !containerRef.current) return;

      requestAnimationFrame(() => {
        if (!cancelled && containerRef.current) {
          try {
            prismModule.highlightAllUnder(containerRef.current);
          } catch {
            const blocks = containerRef.current.querySelectorAll("pre code");
            blocks.forEach((block) => {
              if (!block.className.includes("language-")) {
                block.className = `${block.className} language-text`.trim();
              }
            });
            prismModule.highlightAllUnder(containerRef.current);
          }
        }
      });
    };

    void highlight();

    return () => {
      cancelled = true;
    };
  }, [slug]); // Re-run when slug changes

  return <div ref={containerRef}>{children}</div>;
}
