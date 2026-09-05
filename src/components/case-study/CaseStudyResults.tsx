"use client";

import { nasalization, mono } from "@/app/fonts";
import { ProjectMetric } from "@/types/project";
import { LuShieldCheck } from "react-icons/lu";

interface CaseStudyResultsProps {
  metrics?: ProjectMetric[];
}

const VERIFIED_RESULTS: ProjectMetric[] = [
  {
    value: "0",
    label: "RACE CONDITIONS DETECTED",
    description: "Zero race warnings across 500 simulated concurrent worker routines via `go test -race -count=100`.",
  },
  {
    value: "3.2s",
    label: "NODE FAILURE DETECTION",
    description: "Heartbeat sliding-window timeout identifies unavailable workers without blocking scheduler operation.",
  },
  {
    value: "100%",
    label: "PARTITION SURVIVAL",
    description: "Zero dropped jobs recorded during simulated 40% packet-loss network partitions.",
  },
  {
    value: "24h",
    label: "IDEMPOTENCY CACHE",
    description: "Deterministic request replay protection via SHA-256 signature cache in admission gateway.",
  },
];

export const CaseStudyResults = ({ metrics = VERIFIED_RESULTS }: CaseStudyResultsProps) => {
  const displayMetrics = metrics && metrics.length > 0 ? metrics : VERIFIED_RESULTS;

  return (
    <section id="results" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className={`${mono.className} text-[11px] tracking-[0.25em] text-neutral-500 uppercase font-semibold block`}>
            09 // VERIFIED OUTCOMES
          </span>
          <span className="flex items-center gap-1.5 font-mono text-xs text-emerald-400">
            <LuShieldCheck className="w-4 h-4" />
            <span>VERIFIED POST-BENCHMARK</span>
          </span>
        </div>
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          MEASURABLE RESULTS
        </h2>
      </div>

      <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-3xl leading-relaxed">
        Empirical reliability numbers derived from stress benchmarks, network failure injections, and race detection suites.
      </p>

      {/* Large Numbers Verified Metric Blocks */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
        {displayMetrics.map((metric) => (
          <div
            key={metric.label}
            className="p-5 sm:p-6 rounded-xl border border-neutral-800 bg-[#070709] flex flex-col justify-between space-y-4 hover:border-neutral-700 transition-colors"
          >
            <div className="space-y-1">
              <span className={`${nasalization.className} text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight block`}>
                {metric.value}
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] text-emerald-400 font-bold uppercase tracking-wider block">
                {metric.label}
              </span>
            </div>

            <p className="text-xs text-neutral-400 font-sans leading-relaxed font-light">
              {metric.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
