"use client";

import { LuCircleAlert } from "react-icons/lu";

export const WebScopeProblem = () => {
  return (
    <section id="problem" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Raw URLs Lack Structured Operational Intelligence
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Websites expose information through many different layers: metadata, headings, content
          structure, media, scripts, response characteristics, and crawl rules. The challenge was
          to turn a raw URL into structured, persistent, and actionable website intelligence.
        </p>
      </div>

      {/* Layer Extraction Flow Diagram */}
      <div className="p-4 sm:p-6 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto">
        <pre className="leading-relaxed">
{`URL
 │
 ├── Crawlability          (robots.txt validation, disallowed path inspection)
 ├── Metadata              (title tags, meta descriptions, canonical headers)
 ├── Content structure     (H1/H2 hierarchy, paragraph depth, word count)
 ├── SEO signals           (image alt attributes, link ratios, heading hygiene)
 ├── Performance signals   (HTML payload size, script counts, TTFB response time)
 └── Historical changes    (snapshot persistence, comparison verdicts, monitoring)
          │
          ▼
    ACTIONABLE INSIGHT`}
        </pre>
      </div>

      <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-900 flex items-start gap-3">
        <div className="w-6 h-6 rounded-md bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
          <LuCircleAlert className="w-3.5 h-3.5" />
        </div>
        <p className="text-xs text-neutral-400 leading-relaxed">
          <span className="text-neutral-200 font-semibold">Scope Boundary: </span>
          WebScope is engineered as a lightweight, serverless-friendly website intelligence platform
          for fast heuristic analysis, continuous monitoring, and automated comparisons. It does not
          claim to be a heavyweight headless browser replacement for Google Lighthouse, Google Search
          Console, or full commercial enterprise crawler suites.
        </p>
      </div>
    </section>
  );
};
