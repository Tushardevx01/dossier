"use client";

import { useEffect, useRef } from "react";

let prismBootPromise: Promise<typeof import("prismjs")> | null = null;

async function loadPrism() {
  if (!prismBootPromise) {
    prismBootPromise = (async () => {
      const prismModule = await import("prismjs");
      await Promise.all([
        import("prismjs/components/prism-typescript"),
        import("prismjs/components/prism-javascript"),
        import("prismjs/components/prism-jsx"),
        import("prismjs/components/prism-tsx"),
        import("prismjs/components/prism-sql"),
        import("prismjs/components/prism-bash"),
        import("prismjs/components/prism-hcl"),
      ]);
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
 * - Re-highlighting when navigating between blog posts
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
          prismModule.highlightAllUnder(containerRef.current);
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
