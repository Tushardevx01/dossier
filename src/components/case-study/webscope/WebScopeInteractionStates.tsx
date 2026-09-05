"use client";

export const WebScopeInteractionStates = () => {
  return (
    <section id="states" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
          <span>09</span>
          <span className="w-8 h-px bg-emerald-500/30" />
          <span>SYSTEM INTERACTION STATES</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          State Machine & Asynchronous Failure Boundaries
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Robust system design accounts for every branch in the execution graph. WebScope defines
          explicit transition paths for successful extractions, robots rejections, network dropouts,
          and AI timeouts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Happy Path State Machine */}
        <div className="lg:col-span-7 p-4 sm:p-5 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-[11px] sm:text-xs text-neutral-300 overflow-x-auto space-y-3">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-2 text-emerald-400 font-semibold">
            <span>SCAN PIPELINE STATE MACHINE</span>
            <span className="text-[10px] text-neutral-400">PRIMARY FLOW</span>
          </div>
          <pre className="leading-relaxed">
{`                URL SUBMITTED
                     │
                     ▼
                VALIDATING (Zod schema)
                     │
                     ▼
              ROBOTS CHECK
                /        \\
          DISALLOWED     ALLOWED
              │             │
              ▼             ▼
            REJECT        FETCHING (Axios + 5s Abort)
                            │
                            ▼
                         PARSING (Cheerio AST)
                            │
                            ▼
                         ANALYZING
                       /     |      \\
                      /      |       \\
                   SEO   PERFORMANCE  AI
                      \\      |       /
                       \\     |      /
                            ▼
                         SAVING (PostgreSQL / Prisma)
                            │
                            ▼
                        COMPLETED`}
          </pre>
        </div>

        {/* Failure Paths */}
        <div className="lg:col-span-5 p-4 sm:p-5 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-[11px] sm:text-xs text-neutral-300 overflow-x-auto space-y-3">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-2 text-red-400 font-semibold">
            <span>ISOLATED FAILURE BRANCHES</span>
            <span className="text-[10px] text-neutral-400">HANDLERS</span>
          </div>
          <pre className="leading-relaxed text-neutral-300">
{`FETCHING
   │
   ├── TIMEOUT (>5000ms)
   │     └─► AbortController triggers
   │         Returns statusCode: 0, "TIMEOUT"
   │
   ├── NETWORK ERROR
   │     └─► DNS / Socket / Connect failure
   │         Returns "NETWORK" classification
   │
   └── UNKNOWN ERROR
         └─► Fallback error wrapping

AI GENERATION
   │
   └── TIMEOUT (>6000ms) / RATE LIMIT / 500
           │
           ▼
       DETERMINISTIC FALLBACK
       (Locally computed archetype
        derived from SEO & Speed scores;
        Pipeline returns ok: true)`}
          </pre>
        </div>
      </div>
    </section>
  );
};
