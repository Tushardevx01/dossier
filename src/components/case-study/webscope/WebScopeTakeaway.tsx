"use client";

import { LuLayers, LuShieldCheck, LuDatabase, LuActivity } from "react-icons/lu";

export const WebScopeTakeaway = () => {
  return (
    <section id="takeaways" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
          <span>12</span>
          <span className="w-8 h-px bg-emerald-500/30" />
          <span>ENGINEERING TAKEAWAYS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          What This Project Demonstrates
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Engineering depth is proven through architectural discipline, failure awareness, and
          data modeling.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-3 font-mono">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-emerald-400">TAKEAWAY 01</span>
            <div className="w-7 h-7 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
              <LuLayers className="w-3.5 h-3.5" />
            </div>
          </div>
          <h3 className="text-sm font-semibold text-white">FULL-STACK SYSTEM DESIGN</h3>
          <p className="text-xs text-neutral-400 font-sans leading-relaxed">
            Not just a frontend dashboard. The product connects UI, API route handlers, HTTP scraping,
            analytical scoring engines, relational persistence, and automated background-style
            monitoring sweeps into one cohesive platform.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-3 font-mono">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-emerald-400">TAKEAWAY 02</span>
            <div className="w-7 h-7 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
              <LuShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <h3 className="text-sm font-semibold text-white">FAILURE-AWARE ENGINEERING</h3>
          <p className="text-xs text-neutral-400 font-sans leading-relaxed">
            Dual timeout barriers, robots.txt restriction checks, deterministic AI fallbacks, and
            typed error classification are designed directly into the core execution path, ensuring
            resilience when external targets fail.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-3 font-mono">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-emerald-400">TAKEAWAY 03</span>
            <div className="w-7 h-7 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
              <LuDatabase className="w-3.5 h-3.5" />
            </div>
          </div>
          <h3 className="text-sm font-semibold text-white">DATA-CENTRIC PRODUCT DESIGN</h3>
          <p className="text-xs text-neutral-400 font-sans leading-relaxed">
            Scans do not evaporate in client memory. Every analysis becomes structured relational data
            in PostgreSQL that can be revisited, exported to PDF/CSV, compared against competitors,
            or tracked for performance regressions.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-3 font-mono">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-emerald-400">TAKEAWAY 04</span>
            <div className="w-7 h-7 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
              <LuActivity className="w-3.5 h-3.5" />
            </div>
          </div>
          <h3 className="text-sm font-semibold text-white">PROGRESSIVE ANALYSIS</h3>
          <p className="text-xs text-neutral-400 font-sans leading-relaxed">
            A clear progression of value: Raw HTML payload → structured metrics extraction → weighted
            scoring → qualitative persona interpretation → historical trend insights.
          </p>
        </div>
      </div>
    </section>
  );
};
