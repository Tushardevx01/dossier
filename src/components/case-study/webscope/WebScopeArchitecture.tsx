"use client";

export const WebScopeArchitecture = () => {
  return (
    <section id="architecture" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          System Architecture & Pipeline Topology
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          A unified Next.js 14 full-stack architecture coupling bounded asynchronous worker queues,
          in-memory HTML DOM extraction, relational snapshot persistence, and automated downstream
          comparison and monitoring services.
        </p>
      </div>

      {/* Primary ASCII Architecture Diagram */}
      <div className="p-4 sm:p-6 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-[11px] sm:text-xs text-neutral-300 overflow-x-auto">
        <pre className="leading-relaxed">
{`                    ┌─────────────────────────────────────────┐
                    │               WEB CLIENT                │
                    │    Next.js 14 App Router + Tailwind     │
                    └────────────────────┬────────────────────┘
                                         │
                                         ▼
                    ┌─────────────────────────────────────────┐
                    │                API LAYER                │
                    │    auth / scrape / logs / stats / scans │
                    │       compare / cron / metadata / export│
                    └────────────────────┬────────────────────┘
                                         │
                                         ▼
                    ┌─────────────────────────────────────────┐
                    │            ANALYSIS PIPELINE            │
                    │  src/lib/analyzeWebsite.ts (Slot Queue) │
                    └────────────────────┬────────────────────┘
                                         │
             ┌───────────────────────────┼───────────────────────────┐
             ▼                           ▼                           ▼
        robots.txt                  HTTP FETCH                  VALIDATION
    (checkRobotsTxt)       (Axios + 5s Timeout + Abort)        (Zod Schemas)
             │                           │
             │                           ▼
             │                    Axios + Cheerio
             │                (In-Memory HTML AST)
             │                           │
             │                 ┌─────────┴─────────┐
             │                 ▼                   ▼
             │            SEO ANALYSIS        PERFORMANCE
             │          (analyzeSeo.ts)  (analyzePerformance.ts)
             │                 │                   │
             │                 └─────────┬─────────┘
             │                           ▼
             │                     AI / FALLBACK
             │              (generateAnimalSpirit + Fallback)
             │                           │
             └───────────────────────────┤
                                         ▼
                    ┌─────────────────────────────────────────┐
                    │            PRISMA / POSTGRES            │
                    │                                         │
                    │  User               RequestLog          │
                    │  ScanHistory        Monitor             │
                    │  ScrapedData        Alert               │
                    │  PageMetadata       Comparison          │
                    └────────────────────┬────────────────────┘
                                         │
              ┌──────────────────────────┼──────────────────────────┐
              ▼                          ▼                          ▼
          DASHBOARD                   COMPARE                    MONITOR
      (Overview & KPIs)         (compareService.ts)        (monitorService.ts)
              │                                                     │
              ▼                                                     ▼
        INSIGHTS / UI                                             ALERTS
  (PDF / CSV / JSON Export)                               (Threshold Violations)`}
        </pre>
      </div>

      {/* Core Architectural Attributes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-900 space-y-1.5">
          <div className="text-emerald-400 font-semibold uppercase text-[11px]">
            BOUNDED WORKER SLOTS
          </div>
          <p className="text-neutral-400 font-sans text-xs leading-relaxed">
            <code className="text-neutral-300">MAX_CONCURRENT_ANALYSIS = 4</code>. Incoming analysis jobs acquire an explicit slot or wait in a FIFO queue, preventing thread starvation and target server flooding.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-900 space-y-1.5">
          <div className="text-emerald-400 font-semibold uppercase text-[11px]">
            LIGHTWEIGHT EXTRACTION
          </div>
          <p className="text-neutral-400 font-sans text-xs leading-relaxed">
            Axios and Cheerio execute in pure Node.js serverless runtimes with sub-100ms startup times, avoiding the 150MB+ memory footprint and cold-start latency of headless browsers.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-900 space-y-1.5">
          <div className="text-emerald-400 font-semibold uppercase text-[11px]">
            RELATIONAL SNAPSHOTS
          </div>
          <p className="text-neutral-400 font-sans text-xs leading-relaxed">
            Normalized PostgreSQL models link scans to authenticated users, request logs, automated monitoring rules, and side-by-side comparison verdicts with foreign key cascades.
          </p>
        </div>
      </div>
    </section>
  );
};
