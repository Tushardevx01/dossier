"use client";

import { LuGlobe, LuCpu, LuSparkles, LuDatabase } from "react-icons/lu";

export const WebScopeChallenges = () => {
  return (
    <section id="challenges" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Navigating Unreliable External Targets & Asynchronous Failures
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Operating an automated website intelligence crawler requires handling slow hosts,
          external rate limits, third-party AI timeouts, and multi-tenant persistence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Challenge 01 */}
        <div className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-emerald-400">CHALLENGE 01</span>
            <div className="w-7 h-7 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
              <LuGlobe className="w-3.5 h-3.5" />
            </div>
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-white">SAFE WEBSITE ANALYSIS</h3>
          <p className="text-xs text-neutral-400 leading-relaxed font-sans">
            External websites are inherently unreliable. Remote targets can hang indefinitely, enter infinite redirect loops, drop connections abruptly, or explicitly disallow automated crawling via robots.txt.
          </p>
        </div>

        {/* Challenge 02 */}
        <div className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-emerald-400">CHALLENGE 02</span>
            <div className="w-7 h-7 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
              <LuCpu className="w-3.5 h-3.5" />
            </div>
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-white">BOUNDED ANALYSIS CONCURRENCY</h3>
          <p className="text-xs text-neutral-400 leading-relaxed font-sans">
            Multiple users and automated monitoring batches trigger URL scans simultaneously. Unbounded concurrent operations risk socket exhaustion, Vercel serverless function throttling, and remote IP bans.
          </p>
        </div>

        {/* Challenge 03 */}
        <div className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-emerald-400">CHALLENGE 03</span>
            <div className="w-7 h-7 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
              <LuSparkles className="w-3.5 h-3.5" />
            </div>
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-white">AI DEPENDENCY FAILURE</h3>
          <p className="text-xs text-neutral-400 leading-relaxed font-sans">
            Third-party LLM APIs suffer rate limits, unpredictable latency, and outages. Qualitative AI synthesis cannot become a hard blocking dependency that halts the underlying deterministic SEO and performance analysis.
          </p>
        </div>

        {/* Challenge 04 */}
        <div className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-emerald-400">CHALLENGE 04</span>
            <div className="w-7 h-7 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
              <LuDatabase className="w-3.5 h-3.5" />
            </div>
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-white">PERSISTENT ANALYSIS HISTORY</h3>
          <p className="text-xs text-neutral-400 leading-relaxed font-sans">
            Analysis snapshots must remain relational and queryable across user accounts, longitudinal monitoring alerts, side-by-side domain comparisons, and export formats without data inconsistency.
          </p>
        </div>
      </div>
    </section>
  );
};
