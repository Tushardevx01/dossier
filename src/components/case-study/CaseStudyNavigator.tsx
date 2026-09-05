"use client";

import { useEffect, useState } from "react";

export interface NavSection {
  id: string;
  label: string;
  number: string;
}

const SECTIONS: NavSection[] = [
  { id: "problem", number: "01", label: "The Problem" },
  { id: "approach", number: "02", label: "The Approach" },
  { id: "architecture", number: "03", label: "Architecture" },
  { id: "execution", number: "04", label: "Job Execution" },
  { id: "ownership", number: "05", label: "Ownership" },
  { id: "challenges", number: "06", label: "Challenges" },
  { id: "rigor", number: "07", label: "Technical Rigor" },
  { id: "solutions", number: "08", label: "Solutions" },
  { id: "node-lifecycle", number: "09", label: "Node Lifecycle" },
  { id: "app-model", number: "10", label: "App Model" },
  { id: "instance-health", number: "11", label: "Instance Health" },
  { id: "decisions", number: "12", label: "Decisions" },
  { id: "interaction", number: "13", label: "Interaction" },
  { id: "container-lifecycle", number: "14", label: "Containers" },
  { id: "security", number: "15", label: "Security" },
  { id: "outcomes", number: "16", label: "Outcomes" },
  { id: "tradeoffs", number: "17", label: "Trade-offs" },
  { id: "validation", number: "18", label: "Validation" },
  { id: "flow", number: "19", label: "Job To Result" },
  { id: "source", number: "20", label: "Source Code" },
];

export const CaseStudyNavigator = () => {
  const [activeSection, setActiveSection] = useState<string>("problem");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
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

    SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 90;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = el.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Mobile Horizontal Sticky Pill Navigator */}
      <div className="lg:hidden sticky top-16 z-40 -mx-4 px-4 py-2.5 bg-black/90 backdrop-blur-md border-b border-neutral-800/80">
        <nav
          aria-label="Case study sections"
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs font-mono"
        >
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                aria-current={isActive ? "true" : undefined}
                className={`whitespace-nowrap px-3 py-1 rounded-full text-[11px] transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-neutral-800 text-white font-medium border border-neutral-700 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-300 hover:bg-neutral-900/60"
                }`}
              >
                <span className={isActive ? "text-emerald-400 font-bold" : "text-neutral-600"}>
                  {sec.number}
                </span>
                <span>{sec.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Desktop Sticky Index Sidebar */}
      <aside
        aria-label="Case study document index"
        className="hidden lg:block sticky top-28 self-start w-52 shrink-0 select-none max-h-[calc(100vh-8rem)] overflow-y-auto pr-1 no-scrollbar"
      >
        <div className="space-y-3.5">
          <div className="flex items-center gap-2 pb-2 border-b border-neutral-900 text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-mono font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>CASE INDEX</span>
          </div>

          <ul className="space-y-0.5 font-mono text-xs">
            {SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <li key={sec.id}>
                  <button
                    onClick={() => scrollTo(sec.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`w-full text-left py-1 px-2 rounded-md transition-all duration-200 flex items-center justify-between group ${
                      isActive
                        ? "text-white bg-neutral-900/80 font-medium"
                        : "text-neutral-500 hover:text-neutral-300 hover:bg-neutral-950"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`text-[10px] transition-colors ${
                          isActive ? "text-emerald-400 font-bold" : "text-neutral-600 group-hover:text-neutral-400"
                        }`}
                      >
                        {sec.number}
                      </span>
                      <span className="text-[11px] tracking-wide">{sec.label}</span>
                    </span>

                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        isActive
                          ? "bg-emerald-400 scale-100 opacity-100"
                          : "bg-transparent scale-50 opacity-0 group-hover:bg-neutral-700 group-hover:opacity-60"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="pt-2.5 border-t border-neutral-900/80 text-[10px] font-mono text-neutral-600">
            <span>RUNSTACK // v1.0</span>
          </div>
        </div>
      </aside>
    </>
  );
};
