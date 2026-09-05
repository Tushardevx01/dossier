"use client";

export const WebScopeApproach = () => {
  return (
    <section id="approach" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
          <span>02</span>
          <span className="w-8 h-px bg-emerald-500/30" />
          <span>THE APPROACH</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          A Guarded, Multi-Stage Intelligence Pipeline
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Rather than issuing unbounded scraping calls, WebScope structures website analysis into a
          deterministic 8-stage pipeline wrapped with concurrency control, timeout safeguards,
          and decoupled AI fallbacks.
        </p>
      </div>

      {/* ASCII Pipeline Diagram */}
      <div className="p-4 sm:p-6 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto">
        <pre className="leading-relaxed">
{`INPUT
  │
  ▼
URL VALIDATION
  │
  ▼
ROBOTS.TXT CHECK
  │
  ▼
HTTP FETCH (Axios + 5s Timeout + AbortController)
  │
  ▼
HTML PARSING (Cheerio In-Memory DOM Extraction)
  │
  ├───────────────────────────────┐
  ▼                               ▼
SEO ANALYSIS                 PERFORMANCE
(Title, Meta, H1/H2, Alt)    (TTFB, Payload, Scripts, Images)
  │                               │
  └───────────────┬───────────────┘
                  ▼
             AI INSIGHT (Gemini API with 6s Timeout & Deterministic Fallback)
                  │
                  ▼
           PERSIST RESULTS (Prisma / PostgreSQL / Neon)
                  │
                  ▼
         DASHBOARD / HISTORY
                  │
             ┌────┴────┐
             ▼         ▼
          COMPARE   MONITOR`}
        </pre>
      </div>

      {/* 8 Pipeline Execution Steps */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
          PRIMARY PIPELINE WORKFLOW (src/lib/analyzeWebsite.ts)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
          <div className="p-3.5 rounded-lg bg-neutral-950/60 border border-neutral-800/80 space-y-1">
            <div className="text-emerald-400 font-semibold">1. ROBOTS.TXT CHECK</div>
            <p className="text-neutral-400 font-sans text-xs">
              Queries <code className="text-neutral-300">/robots.txt</code> before touching the page, immediately rejecting disallowed paths.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-neutral-950/60 border border-neutral-800/80 space-y-1">
            <div className="text-emerald-400 font-semibold">2. CONCURRENCY-LIMITED HTTP FETCH</div>
            <p className="text-neutral-400 font-sans text-xs">
              Acquires 1 of 4 slots via <code className="text-neutral-300">acquireSlot()</code> and fetches the HTML with a 5s AbortController timeout.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-neutral-950/60 border border-neutral-800/80 space-y-1">
            <div className="text-emerald-400 font-semibold">3. SERVER-SIDE HTML PARSING</div>
            <p className="text-neutral-400 font-sans text-xs">
              Cheerio builds a lightweight in-memory AST to extract titles, descriptions, headings, body text, and images.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-neutral-950/60 border border-neutral-800/80 space-y-1">
            <div className="text-emerald-400 font-semibold">4. DERIVE SEO METRICS</div>
            <p className="text-neutral-400 font-sans text-xs">
              Evaluates title length, meta presence, single H1 hygiene, heading hierarchy, content length, and image alt tags.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-neutral-950/60 border border-neutral-800/80 space-y-1">
            <div className="text-emerald-400 font-semibold">5. DERIVE PERFORMANCE SIGNALS</div>
            <p className="text-neutral-400 font-sans text-xs">
              Measures TTFB server response time, total HTML payload size, script tag count, and asset weight distribution.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-neutral-950/60 border border-neutral-800/80 space-y-1">
            <div className="text-emerald-400 font-semibold">6. AI INSIGHT WITH FALLBACK</div>
            <p className="text-neutral-400 font-sans text-xs">
              Pre-computes a deterministic qualitative output first; attempts Gemini AI generation with a strict 6-second timeout.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-neutral-950/60 border border-neutral-800/80 space-y-1">
            <div className="text-emerald-400 font-semibold">7. RELATIONAL PERSISTENCE</div>
            <p className="text-neutral-400 font-sans text-xs">
              Saves normalized snapshots into PostgreSQL via Prisma (<code className="text-neutral-300">ScanHistory</code>, <code className="text-neutral-300">ScrapedData</code>, <code className="text-neutral-300">RequestLog</code>).
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-neutral-950/60 border border-neutral-800/80 space-y-1">
            <div className="text-emerald-400 font-semibold">8. PRODUCT SURFACE EXPOSURE</div>
            <p className="text-neutral-400 font-sans text-xs">
              Feeds interactive UI dashboards, automated side-by-side comparisons, scheduled batch monitors, and PDF/CSV exports.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
