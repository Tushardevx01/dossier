"use client";

import { nasalization, mono } from "@/app/fonts";
import { LuShieldCheck } from "react-icons/lu";

const VERIFIED_OUTCOMES = [
  {
    number: "01",
    title: "LOCAL-FIRST",
    desc: "Zero runtime dependency on cloud AI or external endpoints; all model inference executes on host silicon.",
  },
  {
    number: "02",
    title: "AIR-GAPPED",
    desc: "All services operate inside an isolated Docker bridge network with zero outbound internet egress.",
  },
  {
    number: "03",
    title: "AUDITABLE",
    desc: "Every raw crash log, FAISS vector distance, neural classification, and remediation action is persisted in MongoDB.",
  },
  {
    number: "04",
    title: "POLICY-GATED",
    desc: "Autonomous container actions strictly restricted by confidence (>= 0.85) and LOW blast radius risk thresholds.",
  },
  {
    number: "05",
    title: "DETERMINISTIC",
    desc: "Fixed enum-only action registry mapping directly to Dockerode calls, eliminating arbitrary command execution.",
  },
  {
    number: "06",
    title: "CHAOS-TESTABLE",
    desc: "Built-in failure injection harness actively verifying OOM, timeout, crash loop, and permission scenarios.",
  },
];

export const AegisResults = () => {
  return (
    <section id="results" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className={`${mono.className} text-[11px] tracking-[0.25em] text-neutral-500 uppercase font-semibold block`}>
            16 // VERIFIED ARCHITECTURE
          </span>
          <span className="flex items-center gap-1.5 font-mono text-xs text-emerald-400">
            <LuShieldCheck className="w-4 h-4" />
            <span>VERIFIED ENGINEERING OUTCOMES</span>
          </span>
        </div>
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          MEASURABLE RESULTS
        </h2>
      </div>

      <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-3xl leading-relaxed">
        Grounded engineering outcomes built directly into the codebase and validated via chaos testing suites rather than speculative marketing numbers.
      </p>

      {/* 6 Engineering Outcomes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
        {VERIFIED_OUTCOMES.map((item) => (
          <div
            key={item.title}
            className="p-5 sm:p-6 rounded-xl border border-neutral-800 bg-[#070709] flex flex-col justify-between space-y-3 hover:border-neutral-700 transition-colors"
          >
            <div className="space-y-1.5">
              <span className={`${nasalization.className} text-2xl sm:text-3xl font-bold text-emerald-400 tracking-tight block`}>
                {item.number}
              </span>
              <h3 className={`${nasalization.className} text-xs sm:text-sm font-bold text-white uppercase tracking-wide`}>
                {item.title}
              </h3>
            </div>

            <p className="text-xs text-neutral-400 font-sans leading-relaxed font-light">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
