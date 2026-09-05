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
  { id: "data-flow", number: "04", label: "Data Flow" },
  { id: "challenges", number: "05", label: "Challenges" },
  { id: "rigor", number: "06", label: "Technical Rigor" },
  { id: "solutions", number: "07", label: "Challenges & Solutions" },
  { id: "decisions", number: "08", label: "Decisions" },
  { id: "states", number: "09", label: "System States" },
  { id: "data-model", number: "10", label: "Data Model" },
  { id: "results", number: "11", label: "Measurable Results" },
  { id: "takeaways", number: "12", label: "Engineering Takeaways" },
  { id: "summary", number: "13", label: "System Summary" },
  { id: "source", number: "14", label: "Source & Demo" },
];

export const WebScopeNavigator = () => {
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
    <aside
      aria-label="Table of contents"
      className="hidden lg:block w-64 shrink-0 sticky top-28 self-start z-20"
    >
      <div className="bg-neutral-950/80 backdrop-blur-md border border-neutral-800/80 rounded-xl p-4 font-mono">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>WEBSCOPE INDEX</span>
          </div>
          <span className="text-[10px] text-neutral-400 bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800">
            14 SEC
          </span>
        </div>

        <nav className="space-y-0.5">
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                className={`w-full flex items-center justify-between text-left text-xs py-1.5 px-2 rounded transition-all duration-150 group ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400 font-medium border-l-2 border-emerald-500"
                    : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span
                    className={`text-[10px] font-mono ${
                      isActive
                        ? "text-emerald-500"
                        : "text-neutral-400 group-hover:text-neutral-300"
                    }`}
                  >
                    {sec.number}
                  </span>
                  <span className="truncate">{sec.label}</span>
                </div>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
            <span>WEBSCOPE // PIPELINE</span>
          </div>
          <span className="font-mono text-[10px] text-neutral-400">INTELLIGENCE</span>
        </div>
      </div>
    </aside>
  );
};
