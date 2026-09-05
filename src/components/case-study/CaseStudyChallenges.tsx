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
    id: "node-failure",
    number: "01",
    tag: "AVAILABILITY",
    title: "Node Failure & Recovery",
    teaser: "Nodes can disappear while jobs are assigned or actively running, requiring deterministic heartbeats, grace periods, and workload requeuing.",
  },
  {
    id: "stale-results",
    number: "02",
    tag: "CONSISTENCY",
    title: "Stale Execution Results",
    teaser: "A recovered job must strictly reject results from an older execution attempt if a severed worker completes after cluster reassignment.",
  },
  {
    id: "concurrent-mutation",
    number: "03",
    tag: "CONCURRENCY",
    title: "Concurrent State Mutation",
    teaser: "Claims, results, scheduler operations, and registries must remain strictly consistent under concurrent parallel worker traffic.",
  },
  {
    id: "bounded-retries",
    number: "04",
    tag: "RELIABILITY",
    title: "Bounded Retries",
    teaser: "Failures must recover automatically without triggering unbounded retry storms or infinite execution loops on faulty workloads.",
  },
];

export const CaseStudyChallenges = () => {
  return (
    <section id="challenges" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <span className={`${mono.className} text-[11px] tracking-[0.25em] text-neutral-500 uppercase font-semibold block`}>
          06 // ENGINEERING CHALLENGES
        </span>
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          ENGINEERING CHALLENGES
        </h2>
      </div>

      <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-3xl leading-relaxed">
        Four fundamental distributed systems challenges encountered when coordinating uncoordinated compute workers across network boundaries.
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
