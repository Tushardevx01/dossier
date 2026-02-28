/**
 * Table of Contents Component
 * 
 * Extracts headings from markdown and creates an interactive TOC
 * with scroll spy functionality.
 * 
 * IMPROVEMENTS:
 * - Proper React component (not inline script)
 * - Accessible from the start (no JS dependency for content)
 * - Testable and maintainable
 * - Handles edge cases (no headings, desktop only)
 */

"use client";

import { useEffect, useMemo, useState } from "react";

import { useScrollSpy } from "@/hooks/useScrollSpy";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  /** Container selector where headings are located */
  containerSelector?: string;
  /** Heading levels to include in TOC (3 = h3, 2 = h2) */
  headingLevels?: number[];
}

function toHeadingId(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

/**
 * Table of contents with scroll spy highlighting.
 * Heading extraction is local; observation is delegated to useScrollSpy.
 */
export function TableOfContents({
  containerSelector = '.prose',
  headingLevels = [3],
}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);

  // Extract headings from DOM on mount
  useEffect(() => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const headingElements = Array.from(
      container.querySelectorAll(
        headingLevels.map((level) => `h${level}`).join(",")
      )
    ).filter((el): el is HTMLHeadingElement => el instanceof HTMLHeadingElement);

    const extracted: Heading[] = headingElements.map((el) => {
      const id = el.id || toHeadingId(el.textContent || "");
      if (!el.id) el.id = id;
      return {
        id,
        text: el.textContent || "",
        level: parseInt(el.tagName.substring(1)),
      };
    });

    setHeadings(extracted);
  }, [containerSelector, headingLevels]);

  // Derive IDs array for the scroll spy hook (stable reference via useMemo)
  const headingIds = useMemo(() => headings.map((h) => h.id), [headings]);
  const activeHeading = useScrollSpy(headingIds);

  // Don't render if no headings found
  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="hidden 2xl:block fixed right-10 top-40 w-64 text-sm">
      <div className="text-xs uppercase tracking-widest text-neutral-500 mb-4 font-semibold">
        On This Page
      </div>
      <nav aria-label="Table of contents">
        <ul className="space-y-3">
          {headings.map((heading) => (
            <li key={heading.id} style={{ marginLeft: `${(heading.level - 3) * 1}rem` }}>
              <a
                href={`#${heading.id}`}
                className={`
                  transition-colors duration-200
                  ${
                    activeHeading === heading.id
                      ? "text-white font-semibold"
                      : "text-neutral-400 hover:text-neutral-300"
                  }
                `}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
