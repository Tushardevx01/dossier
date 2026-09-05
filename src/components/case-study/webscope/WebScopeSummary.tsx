"use client";

export const WebScopeSummary = () => {
  return (
    <section id="summary" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          The Full Value Trajectory
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          From unparsed remote HTTP streams to persistent operational intelligence.
        </p>
      </div>

      {/* ASCII Summary Flow */}
      <div className="p-5 sm:p-6 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto text-center">
        <pre className="inline-block text-left leading-relaxed text-emerald-400">
{`RAW URL
   ↓
SAFE FETCH (robots.txt + timeout bounds)
   ↓
STRUCTURED EXTRACTION (Cheerio in-memory DOM AST)
   ↓
SEO + PERFORMANCE (weighted signals & heuristics)
   ↓
AI / FALLBACK (resilient qualitative interpretation)
   ↓
PERSISTENT DATA (PostgreSQL / Prisma relational models)
   ↓
COMPARE / MONITOR (longitudinal batches & alerts)
   ↓
ACTIONABLE INSIGHT`}
        </pre>
      </div>
    </section>
  );
};
