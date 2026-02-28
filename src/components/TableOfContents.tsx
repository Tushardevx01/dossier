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

import { useEffect, useRef, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  /**
   * Container selector where headings are located
   * Defaults to looking for h3 tags in siblings
   */
  containerSelector?: string;
  /**
   * Heading levels to include in TOC (3 = h3, 2 = h2)
   */
  headingLevels?: number[];
}

/**
 * Component that generates and manages a table of contents
 * with scroll spy highlighting
 */
export function TableOfContents({
  containerSelector = '.prose',
  headingLevels = [3],
}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeHeading, setActiveHeading] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Extract headings from DOM on mount
  useEffect(() => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    // Find all headings matching specified levels
    const headingElements = Array.from(
      container.querySelectorAll(
        headingLevels.map((level) => `h${level}`).join(",")
      )
    ).filter((el): el is HTMLHeadingElement => el instanceof HTMLHeadingElement);

    // Extract heading data
    const extractedHeadings: Heading[] = headingElements.map((el) => ({
      id: el.id || el.textContent?.toLowerCase().replace(/\s+/g, "-") || "",
      text: el.textContent || "",
      level: parseInt(el.tagName.substring(1)),
    }));

    // Ensure headings have IDs for linking
    extractedHeadings.forEach((heading, idx) => {
      const el = headingElements[idx];
      if (!el.id) {
        el.id = heading.id;
      }
    });

    setHeadings(extractedHeadings);
  }, [containerSelector, headingLevels]);

  // Set up scroll spy with Intersection Observer
  useEffect(() => {
    if (headings.length === 0) return;

    // Clean up old observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the heading that's currently in view
        const visibleHeading = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
          .at(0);

        if (visibleHeading) {
          setActiveHeading(visibleHeading.target.id);
        }
      },
      {
        // Trigger when heading reaches top 40% of viewport
        rootMargin: "-40% 0px -55% 0px",
      }
    );

    // Observe all headings
    const headingElements = headings.map(
      (h) => document.getElementById(h.id) as HTMLElement
    );
    headingElements.forEach((el) => {
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [headings]);

  // Don't render if no headings found
  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="hidden xl:block fixed right-10 top-40 w-64 text-sm">
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
