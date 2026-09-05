"use client";

import { nasalization, mono } from "@/app/fonts";

interface ChallengeIntroItem {
  id: string;
  number: string;
  title: string;
  tag: string;
  teaser: string;
}

const CHALLENGES_INTRO: ChallengeIntroItem[] = [
  {
    id: "split-brain",
    number: "01",
    tag: "CONSENSUS",
    title: "Split-Brain & Lease Race Conditions",
    teaser: "During transient network partitions, multiple scheduler instances could attempt to dispatch identical batch workloads to separate nodes, causing duplicate resource reservation and state corruption.",
  },
  {
    id: "node-eviction",
    number: "02",
    tag: "AVAILABILITY",
    title: "Sub-Second Node Eviction & Workload Rescue",
    teaser: "Compute instances experiencing kernel stalls or silent network drops leave tasks orphaned indefinitely without notifying the control plane.",
  },
  {
    id: "goroutine-exhaustion",
    number: "03",
    tag: "CONCURRENCY",
    title: "Goroutine Exhaustion Under Burst Traffic",
    teaser: "Unchecked incoming dispatch streams spawn tens of thousands of goroutines, degrading Go garbage collection cycles and increasing latency.",
  },
  {
    id: "graceful-drain",
    number: "04",
    tag: "LIFECYCLE",
    title: "Graceful Termination During Deployments",
    teaser: "Restarting node daemons during maintenance cycles risks severing running container workloads mid-computation without proper state flushing.",
  },
];

export const CaseStudyChallenges = () => {
  return (
    <section id="challenges" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <span className={`${mono.className} text-[11px] tracking-[0.25em] text-neutral-500 uppercase font-semibold block`}>
          04 // HARD PROBLEMS
        </span>
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          ENGINEERING CHALLENGES
        </h2>
      </div>

      <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-3xl leading-relaxed">
        The primary failure modes encountered when scaling autonomous execution loops across unpredictable cloud infrastructure.
      </p>

      {/* Compact Numbered Challenge List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
        {CHALLENGES_INTRO.map((item) => (
          <div
            key={item.id}
            className="p-4 sm:p-5 rounded-lg border border-neutral-900 bg-neutral-950/60 hover:border-neutral-800 transition-colors space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-emerald-400 font-bold">
                // {item.number}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 bg-neutral-900 px-2 py-0.5 rounded">
                {item.tag}
              </span>
            </div>

            <h3 className={`${nasalization.className} text-sm sm:text-base font-bold text-white uppercase tracking-wide`}>
              {item.title}
            </h3>

            <p className="text-xs sm:text-[13px] text-neutral-400 font-sans leading-relaxed">
              {item.teaser}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
