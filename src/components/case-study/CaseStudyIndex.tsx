"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import { mono } from "@/app/fonts";

export interface NavSection {
  id: string;
  number: string;
  label: string;
}

export interface CaseStudyIndexProps {
  sections: NavSection[];
  activeSection: string;
  onSelectSection: (id: string) => void;
  readTime: number;
}

export const CaseStudyIndex: React.FC<CaseStudyIndexProps> = ({
  sections,
  activeSection,
  onSelectSection,
  readTime,
}) => {
  const mobileNavRef = useRef<HTMLDivElement>(null);

  // Auto-scroll active section into view on mobile
  useEffect(() => {
    if (!mobileNavRef.current) return;
    const activeBtn = mobileNavRef.current.querySelector<HTMLElement>("[data-active='true']");
    if (activeBtn) {
      const container = mobileNavRef.current;
      const scrollLeft = activeBtn.offsetLeft - container.offsetWidth / 2 + activeBtn.offsetWidth / 2;
      container.scrollTo({ left: Math.max(0, scrollLeft), behavior: "smooth" });
    }
  }, [activeSection]);

  if (!sections || sections.length === 0) return null;

  return (
    <>
      {/* Mobile Horizontal Sticky Section Bar */}
      <div className="lg:hidden sticky top-16 z-30 -mx-4 px-4 py-2.5 bg-black/90 backdrop-blur-md border-b border-neutral-800/80 w-full overflow-hidden">
        <nav
          ref={mobileNavRef}
          aria-label="Case study sections navigation"
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs font-mono"
        >
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => onSelectSection(sec.id)}
                data-active={isActive ? "true" : "false"}
                aria-current={isActive ? "true" : undefined}
                className={`whitespace-nowrap px-3 py-1 rounded-md text-[11px] transition-all duration-200 flex items-center gap-1.5 ${
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

      {/* Desktop Vertical Sticky Sidebar */}
      <aside
        aria-label="Technical Case Study Navigator"
        className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-28 self-start"
      >
        <div className="p-4 rounded-lg bg-[#07070a] border border-neutral-800/80 backdrop-blur-sm space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span
                className={`${mono.className} text-[11px] uppercase tracking-wider text-neutral-400 font-semibold`}
              >
                SYSTEM SPEC
              </span>
            </div>
            <span className="text-[10px] font-mono text-neutral-500">
              {sections.length} SECTIONS
            </span>
          </div>

          <nav className="space-y-0.5 max-h-[calc(100vh-230px)] overflow-y-auto pr-1 text-xs font-mono scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
            {sections.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => onSelectSection(sec.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-center justify-between group transition-all duration-150 ${
                    isActive
                      ? "bg-neutral-900 text-white font-medium border border-neutral-700/80"
                      : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/40"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className={`text-[10px] font-mono ${
                        isActive
                          ? "text-emerald-400 font-bold"
                          : "text-neutral-600 group-hover:text-neutral-400"
                      }`}
                    >
                      {sec.number}
                    </span>
                    <span className="truncate">{sec.label}</span>
                  </div>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-2 shrink-0" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-neutral-500">
            <Link
              href="/#selected-work"
              className="inline-flex items-center gap-1 hover:text-emerald-400 transition-colors"
            >
              <LuArrowLeft className="w-3 h-3" />
              <span>SELECTED WORK</span>
            </Link>
            <span>{readTime}m read</span>
          </div>
        </div>
      </aside>
    </>
  );
};
