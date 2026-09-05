"use client";

export const WebScopeDataFlow = () => {
  return (
    <section id="data-flow" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          End-to-End Extraction & Scoring Lifecycle
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          From user submission to persistent dashboard reporting, data transitions through a series
          of strict validation, extraction, scoring, and persistence steps.
        </p>
      </div>

      {/* ASCII Data Flow Diagram */}
      <div className="p-4 sm:p-6 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto">
        <pre className="leading-relaxed">
{`USER
 │
 │ submit URL
 ▼
API
 │
 │ validate input
 ▼
ROBOTS CHECK
 │
 │ allowed
 ▼
SCRAPER
 │
 │ HTTP response
 ▼
CHEERIO PARSER
 │
 ├── title
 ├── meta description
 ├── H1 / H2
 ├── body text
 ├── images
 ├── scripts
 ├── content size
 └── response time
          │
          ▼
     ANALYSIS ENGINE
       │       │
       │       └── performance
       │
       └────────── SEO
          │
          ▼
      AI INSIGHT (with deterministic fallback)
          │
          ▼
       DATABASE (PostgreSQL / Prisma)
          │
          ▼
      DASHBOARD`}
        </pre>
      </div>

      {/* Short sentence breakdown per step */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
        <div className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-900 flex items-start gap-2.5">
          <span className="text-emerald-500 font-bold shrink-0">01.</span>
          <p className="text-neutral-300 font-sans text-xs">
            <strong className="text-white font-mono">User Submission: </strong>
            User enters target URL via web form or triggers scheduled monitoring batch.
          </p>
        </div>

        <div className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-900 flex items-start gap-2.5">
          <span className="text-emerald-500 font-bold shrink-0">02.</span>
          <p className="text-neutral-300 font-sans text-xs">
            <strong className="text-white font-mono">API Validation: </strong>
            Next.js API route validates format, protocol, and sanitization rules with Zod.
          </p>
        </div>

        <div className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-900 flex items-start gap-2.5">
          <span className="text-emerald-500 font-bold shrink-0">03.</span>
          <p className="text-neutral-300 font-sans text-xs">
            <strong className="text-white font-mono">Robots Check: </strong>
            Parser verifies target site <code className="text-neutral-200">robots.txt</code> crawl permissions before opening socket connections.
          </p>
        </div>

        <div className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-900 flex items-start gap-2.5">
          <span className="text-emerald-500 font-bold shrink-0">04.</span>
          <p className="text-neutral-300 font-sans text-xs">
            <strong className="text-white font-mono">HTTP Fetch: </strong>
            Axios retrieves target HTML within a 5-second AbortController timeout window.
          </p>
        </div>

        <div className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-900 flex items-start gap-2.5">
          <span className="text-emerald-500 font-bold shrink-0">05.</span>
          <p className="text-neutral-300 font-sans text-xs">
            <strong className="text-white font-mono">DOM Extraction: </strong>
            Cheerio builds in-memory AST and parses title, meta, headings, text, media, and scripts.
          </p>
        </div>

        <div className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-900 flex items-start gap-2.5">
          <span className="text-emerald-500 font-bold shrink-0">06.</span>
          <p className="text-neutral-300 font-sans text-xs">
            <strong className="text-white font-mono">Analysis Engines: </strong>
            SEO and performance analyzers calculate weighted scores and identify optimization gaps.
          </p>
        </div>

        <div className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-900 flex items-start gap-2.5">
          <span className="text-emerald-500 font-bold shrink-0">07.</span>
          <p className="text-neutral-300 font-sans text-xs">
            <strong className="text-white font-mono">AI Interpretation: </strong>
            Gemini AI produces qualitative archetypes with pre-computed fallback guarantees.
          </p>
        </div>

        <div className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-900 flex items-start gap-2.5">
          <span className="text-emerald-500 font-bold shrink-0">08.</span>
          <p className="text-neutral-300 font-sans text-xs">
            <strong className="text-white font-mono">Database & UI: </strong>
            Prisma persists the full snapshot to PostgreSQL, immediately updating user dashboards and monitors.
          </p>
        </div>
      </div>
    </section>
  );
};
