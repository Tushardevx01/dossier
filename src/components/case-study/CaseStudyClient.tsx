"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { mono } from "@/app/fonts";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

interface NavSection {
  id: string;
  number: string;
  label: string;
}

interface CaseStudyTocProps {
  /** Pre-sanitized article HTML, rendered by a Server Component */
  contentHtml: string;
  /** Serializable case-study metadata for the header/footer */
  meta: {
    slug: string;
    title: string;
    subtitle: string;
    excerpt: string;
    category: string;
    level: string;
    readTime: number;
    date: string;
    tags: string[];
  };
  nextCaseStudy?: {
    slug: string;
    title: string;
    subtitle: string;
  } | null;
}

/**
 * Client island for a case study page.
 *
 * The heavy article HTML is rendered by a Server Component and passed as a
 * pre-sanitized string; this component owns only the interactive concerns:
 * section navigation, scroll-spy, and smooth scrolling. The sanitized HTML is
 * never re-sanitized or copied into React state on the client.
 */
export const CaseStudyClient = ({
  contentHtml,
  meta,
  nextCaseStudy,
}: CaseStudyTocProps) => {
  const [sections, setSections] = useState<NavSection[]>([]);
  const [activeSection, setActiveSection] = useState<string>("");

  // Auto-discover all sections from the rendered HTML content
  useEffect(() => {
    const sectionElements = document.querySelectorAll<HTMLElement>("main section[id]");
    const detected: NavSection[] = Array.from(sectionElements).map((el, idx) => {
      const heading = el.querySelector("h2, h3");
      let rawText = heading?.textContent || el.id;
      // Remove leading numbers like "01", "02 /"
      rawText = rawText.replace(/^\s*\d+[\s/.-]*/, "").trim();
      const num = String(idx + 1).padStart(2, "0");
      return {
        id: el.id,
        number: num,
        label: rawText.length > 25 ? rawText.slice(0, 23) + "..." : rawText,
      };
    });

    if (detected.length > 0) {
      setSections(detected);
      setActiveSection(detected[0].id);
    }

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

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [meta.slug]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 90;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = el.getBoundingClientRect().top;
    const offsetPosition = elementRect - bodyRect - offset;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 xl:gap-16 relative">
      {/* Sticky Technical Document Navigator */}
      {sections.length > 0 && (
        <>
          {/* Mobile Horizontal Bar */}
          <div className="lg:hidden sticky top-16 z-40 -mx-4 px-4 py-2.5 bg-black/90 backdrop-blur-md border-b border-neutral-800/80 w-full overflow-hidden">
            <nav
              aria-label="Case study sections"
              className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs font-mono"
            >
              {sections.map((sec) => {
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

          {/* Desktop Vertical Sticky Sidebar */}
          <aside
            aria-label="Technical Case Study Navigator"
            className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-28 self-start"
          >
            <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 backdrop-blur-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className={`${mono.className} text-[11px] uppercase tracking-wider text-neutral-400 font-semibold`}>
                    SYSTEM SPEC
                  </span>
                </div>
                <span className="text-[10px] font-mono text-neutral-500">
                  {sections.length} SECTIONS
                </span>
              </div>

              <nav className="space-y-0.5 max-h-[calc(100vh-220px)] overflow-y-auto no-scrollbar pr-1 text-xs font-mono">
                {sections.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollTo(sec.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between group transition-all duration-150 ${
                        isActive
                          ? "bg-neutral-800 text-white font-medium border border-neutral-700/80"
                          : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className={`text-[10px] font-mono ${isActive ? "text-emerald-400 font-bold" : "text-neutral-600 group-hover:text-neutral-400"}`}>
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
                  href="/work"
                  className="inline-flex items-center gap-1 hover:text-emerald-400 transition-colors"
                >
                  <LuArrowLeft className="w-3 h-3" />
                  <span>ALL WORK</span>
                </Link>
                <span>{meta.readTime}m read</span>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 w-full space-y-16 sm:space-y-24">
        {/* HERO SECTION */}
        <header className="space-y-6 sm:space-y-8 pb-12 border-b border-neutral-900">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-neutral-400">
            <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
              {meta.category}
            </span>
            <span className="px-2.5 py-1 rounded bg-emerald-950/40 border border-emerald-800/50 text-emerald-400">
              {meta.level}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800">
              {meta.date}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800">
              {meta.readTime} min read
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase">
              {meta.title}
            </h1>
            <p className="text-base sm:text-xl text-neutral-300 font-sans max-w-3xl leading-relaxed">
              {meta.subtitle}
            </p>
            <p className="text-sm sm:text-base text-neutral-400 font-sans max-w-3xl leading-relaxed">
              {meta.excerpt}
            </p>
          </div>

          {/* Technologies Pills */}
          {meta.tags.length > 0 && (
            <div className="space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                CORE TECHNOLOGIES &amp; PATTERNS
              </div>
              <div className="flex flex-wrap gap-1.5">
                {meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-neutral-900/90 border border-neutral-800 text-neutral-300 font-mono text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* SANITIZED DATABASE HTML CONTENT — rendered server-side */}
        <div
          className="case-study-content space-y-16 sm:space-y-24"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* FOOTER & NEXT CASE STUDY */}
        <footer className="pt-16 pb-12 border-t border-neutral-900 space-y-8">
          {nextCaseStudy && (
            <div className="p-6 sm:p-8 rounded-xl bg-neutral-950/80 border border-neutral-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:border-neutral-700 transition-colors group">
              <div className="space-y-2 max-w-xl">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
                  NEXT PRODUCTION SYSTEM
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white uppercase group-hover:text-emerald-300 transition-colors">
                  {nextCaseStudy.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 line-clamp-2">
                  {nextCaseStudy.subtitle}
                </p>
              </div>
              <Link
                href={`/work/${nextCaseStudy.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-950/50 border border-emerald-800/60 text-emerald-300 font-mono text-xs font-semibold hover:bg-emerald-900/60 hover:text-white transition-all shrink-0"
              >
                <span>READ CASE STUDY</span>
                <LuArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}

          <div className="flex items-center justify-between text-xs font-mono text-neutral-500 pt-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <LuArrowLeft className="w-3.5 h-3.5" />
              <span>ALL CASE STUDIES</span>
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
};
