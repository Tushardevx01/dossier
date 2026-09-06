"use client";

import React, { useState, useEffect } from "react";
import { CaseStudyIndex, type NavSection } from "./CaseStudyIndex";

export interface CaseStudyShellProps {
  sections: NavSection[];
  readTime: number;
  header: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const CaseStudyShell: React.FC<CaseStudyShellProps> = ({
  sections,
  readTime,
  header,
  children,
  footer,
}) => {
  const [activeSection, setActiveSection] = useState<string>(
    sections[0]?.id || ""
  );

  // Set up scroll-spy observer
  useEffect(() => {
    if (sections.length === 0) return;

    const sectionElements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort(
            (a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top)
          );
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-15% 0px -60% 0px",
        threshold: [0, 0.2, 0.5],
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 90;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = el.getBoundingClientRect().top;
    const offsetPosition = elementRect - bodyRect - offset;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
      {/* Full-width Executive Header */}
      {header}

      <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 xl:gap-16 relative">
        {/* Sticky Index Navigator */}
        <CaseStudyIndex
          sections={sections}
          activeSection={activeSection}
          onSelectSection={scrollTo}
          readTime={readTime}
        />

        {/* Main Editorial Case Study Flow */}
        <main className="flex-1 min-w-0 w-full">
          <div className="space-y-20 sm:space-y-28 lg:space-y-32">
            {children}
          </div>
          {footer}
        </main>
      </div>
    </div>
  );
};
