"use client";

import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-hcl";

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
  useEffect(() => {
    // Highlight all code blocks when slug changes
    if (typeof Prism !== "undefined") {
      // Use requestAnimationFrame to ensure DOM is updated
      requestAnimationFrame(() => {
        Prism.highlightAllUnder(document.body);
      });
    }
  }, [slug]); // Re-run when slug changes

  return <>{children}</>;
}
