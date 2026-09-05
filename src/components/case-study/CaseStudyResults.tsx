"use client";

import { nasalization, mono } from "@/app/fonts";
import { LuShieldCheck } from "react-icons/lu";

interface EngineeringOutcome {
  number: string;
  title: string;
  description: string;
}

const VERIFIED_OUTCOMES: EngineeringOutcome[] = [
  {
    number: "01",
    title: "AUTHORITATIVE CONTROL PLANE",
    description: "All job state transitions and instance lifecycle phases are strictly controlled centrally.",
  },
  {
    number: "02",
    title: "BOUNDED RETRY EXECUTION",
    description: "Strict Attempts <= MaxRetries budget prevents runaway execution storms on failing workloads.",
  },
  {
    number: "03",
    title: "EXECUTION-AWARE FENCING",
    description: "Stale execution results from evicted or lagged workers are deterministically rejected.",
  },
  {
    number: "04",
    title: "DETERMINISTIC SCHEDULING",
    description: "ONLINE nodes are sorted by ID and assigned through a persistent round-robin cursor.",
  },
  {
    number: "05",
    title: "FAILURE RECOVERY",
    description: "Node loss and execution timeouts safely return orphaned work to the active scheduling lifecycle.",
  },
  {
    number: "06",
    title: "RACE-SAFE STATE",
    description: "Registry state operations are synchronized via sync.RWMutex with race-detector test validation.",
  },
];

export const CaseStudyResults = () => {
  return (
    <section id="outcomes" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className={`${mono.className} text-[11px] tracking-[0.25em] text-neutral-500 uppercase font-semibold block`}>
            16 // MEASURABLE OUTCOMES
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
        Verifiable engineering outcomes built directly into the system architecture, avoiding speculative or ungrounded benchmark claims.
      </p>

      {/* 6 Engineering Outcomes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
        {VERIFIED_OUTCOMES.map((outcome) => (
          <div
            key={outcome.title}
            className="p-5 sm:p-6 rounded-xl border border-neutral-800 bg-[#070709] flex flex-col justify-between space-y-3 hover:border-neutral-700 transition-colors"
          >
            <div className="space-y-1.5">
              <span className={`${nasalization.className} text-2xl sm:text-3xl font-bold text-emerald-400 tracking-tight block`}>
                {outcome.number}
              </span>
              <h3 className={`${nasalization.className} text-xs sm:text-sm font-bold text-white uppercase tracking-wide`}>
                {outcome.title}
              </h3>
            </div>

            <p className="text-xs text-neutral-400 font-sans leading-relaxed font-light">
              {outcome.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
