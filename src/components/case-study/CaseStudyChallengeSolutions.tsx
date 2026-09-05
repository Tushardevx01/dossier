"use client";

import { nasalization, mono } from "@/app/fonts";
import { AsciiDiagram } from "./AsciiDiagram";

const NODE_FAILURE_DESIGN_ASCII = `
NODE
 │
 ├── heartbeat
 │
 └── OFFLINE
        │
        ▼
   grace period
        │
        ▼
    recovery
`;

const STALE_EXECUTION_DESIGN_ASCII = `
ExecutionID #1
     │
     ▼
  recovery
     │
     ▼
ExecutionID #2

Result from #1 ──► REJECT
Result from #2 ──► ACCEPT
`;

const RETRY_BOUNDARIES_DESIGN_ASCII = `
Attempts = Attempts + 1
             │
             ▼
      Attempts <= MaxRetries?
          /           \\
        YES            NO
         │              │
         ▼              ▼
      PENDING         FAILED
`;

const DETERMINISTIC_SCHEDULING_DESIGN_ASCII = `
ONLINE NODES
    │
    ▼
SORT BY NODE ID
    │
    ▼
ROUND-ROBIN
    │
    ▼
PERSIST CURSOR
    │
    ▼
NEXT ASSIGNMENT
`;

const CHALLENGES_SOLUTIONS = [
  {
    id: "node-failure",
    number: "01",
    title: "NODE FAILURE & RECOVERY",
    problem: "A compute node may abruptly disappear while work is assigned or running.",
    constraint: "Immediately recovering work risks false-positive failures during transient network drops.",
    designAscii: NODE_FAILURE_DESIGN_ASCII,
    outcome: "Assigned work returns to the scheduling pool after grace period conditions are satisfied.",
  },
  {
    id: "stale-execution",
    number: "02",
    title: "STALE EXECUTION HANDLING",
    problem: "A stalled worker can finish an old execution after the Control Plane has recovered the job.",
    constraint: "Late execution results must never overwrite fresh results from newly reassigned nodes.",
    designAscii: STALE_EXECUTION_DESIGN_ASCII,
    outcome: "Execution ownership remains explicit; stale ExecutionID results are strictly rejected.",
  },
  {
    id: "retry-boundaries",
    number: "03",
    title: "RETRY BOUNDARIES",
    problem: "Repeated infrastructure drops or bad commands could trigger infinite retry loops.",
    constraint: "Retries must be deterministically finite and observable across cluster state.",
    designAscii: RETRY_BOUNDARIES_DESIGN_ASCII,
    outcome: "Total executions are strictly bounded by MaxRetries + 1, terminating gracefully in FAILED.",
  },
  {
    id: "deterministic-scheduling",
    number: "04",
    title: "DETERMINISTIC SCHEDULING",
    problem: "Multiple ONLINE nodes need predictable, starvation-free workload assignment.",
    constraint: "Scheduling decisions must be reproducible and avoid random uneven distribution.",
    designAscii: DETERMINISTIC_SCHEDULING_DESIGN_ASCII,
    outcome: "Node assignment uses sorted node IDs and a persistent round-robin cursor.",
  },
];

export const CaseStudyChallengeSolutions = () => {
  return (
    <section id="solutions" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <span className={`${mono.className} text-[11px] tracking-[0.25em] text-neutral-500 uppercase font-semibold block`}>
          08 // ARCHITECTURAL REASONING
        </span>
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          ENGINEERING CHALLENGES & SOLUTIONS
        </h2>
      </div>

      <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-3xl leading-relaxed">
        Disciplined systems reasoning: Problem → Constraint → Design → Outcome applied across every failure boundary.
      </p>

      {/* 4 Deep Dive Resolution Cards */}
      <div className="space-y-6 pt-1">
        {CHALLENGES_SOLUTIONS.map((item) => (
          <div
            key={item.id}
            className="p-5 sm:p-6 rounded-xl border border-neutral-800 bg-[#070709] space-y-4"
          >
            {/* Header */}
            <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-800/80">
              <span className="font-mono text-xs text-emerald-400 font-bold">
                // {item.number}
              </span>
              <h3 className={`${nasalization.className} text-sm sm:text-base font-bold text-white uppercase tracking-wide`}>
                {item.title}
              </h3>
            </div>

            {/* Context Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-lg border border-neutral-900 bg-neutral-950/80 space-y-1">
                <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider block">
                  PROBLEM
                </span>
                <p className="text-neutral-300 font-sans text-xs leading-relaxed">
                  {item.problem}
                </p>
              </div>

              <div className="p-3.5 rounded-lg border border-neutral-900 bg-neutral-950/80 space-y-1">
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                  CONSTRAINT
                </span>
                <p className="text-neutral-300 font-sans text-xs leading-relaxed">
                  {item.constraint}
                </p>
              </div>

              <div className="p-3.5 rounded-lg border border-neutral-900 bg-neutral-950/80 space-y-1">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                  OUTCOME
                </span>
                <p className="text-neutral-300 font-sans text-xs leading-relaxed">
                  {item.outcome}
                </p>
              </div>
            </div>

            {/* Embedded ASCII Design */}
            <div className="pt-1">
              <AsciiDiagram
                title={`${item.title} // DESIGN`}
                badge="SYSTEM DESIGN"
                content={item.designAscii}
                caption="Formal resolution mechanics implemented within the Control Plane runtime."
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
