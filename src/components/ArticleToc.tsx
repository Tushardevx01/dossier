"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useScrollSpy } from "@/hooks/useScrollSpy";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface ArticleTocProps {
  containerSelector?: string;
  headingLevels?: number[];
}

function toHeadingId(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function ArticleToc({
  containerSelector = ".article-content",
  headingLevels = [2, 3],
}: ArticleTocProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);

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

  const headingIds = useMemo(() => headings.map((h) => h.id), [headings]);
  const activeHeading = useScrollSpy(headingIds);

  if (headings.length === 0) return null;

  return (
    <motion.aside
      className="hidden xl:block fixed right-8 2xl:right-16 top-32 w-56"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <nav aria-label="Article navigation">
        <div className="space-y-0.5">
          <p className="text-xs uppercase tracking-widest font-semibold text-zinc-500 mb-4 px-3">
            On This Page
          </p>

          <ul className="space-y-1">
            {headings.map((heading) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  className={`
                    block px-3 py-2 rounded-lg transition-all duration-200 text-sm
                    ${
                      activeHeading === heading.id
                        ? "text-cyan-400 bg-cyan-500/10 border-l-2 border-cyan-400"
                        : "text-zinc-400 hover:text-zinc-200 border-l-2 border-transparent hover:border-zinc-600"
                    }
                  `}
                  style={{
                    marginLeft: heading.level === 3 ? "1rem" : "0",
                  }}
                >
                  {heading.text.length > 30
                    ? heading.text.substring(0, 30) + "…"
                    : heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </motion.aside>
  );
}
