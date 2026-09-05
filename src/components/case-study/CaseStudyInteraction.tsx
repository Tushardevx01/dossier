"use client";

import { nasalization, mono } from "@/app/fonts";
import { AsciiDiagram } from "./AsciiDiagram";

const STATE_MACHINE_ASCII = `
                         JOB SUBMITTED
                               │
                               ▼
                           REGISTERED
                               │
                               ▼
                            QUEUED
                               │
                               ▼
                           SCHEDULED
                               │
                               ▼
                           DISPATCHED
                               │
                               ▼
                           EXECUTING
                            /     \\
                           /       \\
                          ▼         ▼
                     COMPLETED    FAILED
                          │         │
                          ▼         ▼
                       REPORTED   RETRY / ERROR
`;

const TRANSITION_EXPLANATIONS = [
  {
    state: "REGISTERED",
    color: "text-emerald-400",
    desc: "Job accepted by the control plane; SHA-256 idempotency signature verified against cache.",
  },
  {
    state: "QUEUED",
    color: "text-neutral-400",
    desc: "Buffered into partitioned Kafka log buffer; awaiting concurrent scheduler assignment.",
  },
  {
    state: "SCHEDULED",
    color: "text-sky-400",
    desc: "Min-heap scores idle CPU and memory headroom, selecting optimal worker host.",
  },
  {
    state: "DISPATCHED",
    color: "text-amber-400",
    desc: "Host daemon acquires Redis Redlock mutex lease (5000ms TTL) to lock execution.",
  },
  {
    state: "EXECUTING",
    color: "text-purple-400",
    desc: "Local agent spawns Docker container sandbox constrained by Linux cgroups v2 ceilings.",
  },
  {
    state: "COMPLETED / FAILED",
    color: "text-rose-400",
    desc: "Container execution finishes; status code trapped; failures trigger exponential backoff retry.",
  },
  {
    state: "REPORTED",
    color: "text-emerald-400",
    desc: "Final receipt committed back to control plane and cached for 24-hour replay protection.",
  },
];

export const CaseStudyInteraction = () => {
  return (
    <section id="states" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <span className={`${mono.className} text-[11px] tracking-[0.25em] text-neutral-500 uppercase font-semibold block`}>
          08 // LIFECYCLE OBSERVABILITY
        </span>
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          SYSTEM INTERACTION STATES
        </h2>
      </div>

      <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-3xl leading-relaxed">
        Deterministic state transitions driving the workload execution loop. State is explicit, verifiable, and observable at every phase.
      </p>

      {/* State Machine Terminal Diagram */}
      <div className="pt-1">
        <AsciiDiagram
          title="LIFECYCLE STATE MACHINE"
          badge="DETERMINISTIC TRANSITIONS"
          content={STATE_MACHINE_ASCII}
          caption="Deterministic job lifecycle state machine from initial submission to final receipt commit."
        />
      </div>

      {/* State Transition Descriptions */}
      <div className="pt-3 space-y-2">
        <div className="pb-2 border-b border-neutral-900 text-xs font-mono text-neutral-500 uppercase tracking-wider">
          TRANSITION SPECIFICATIONS
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
          {TRANSITION_EXPLANATIONS.map((item) => (
            <div
              key={item.state}
              className="p-3 rounded-lg border border-neutral-900 bg-neutral-950/60 flex flex-col justify-between space-y-1 hover:border-neutral-800 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className={`font-bold tracking-wider text-[11px] ${item.color}`}>
                  [{item.state}]
                </span>
              </div>
              <p className="text-neutral-400 font-sans text-xs leading-relaxed pl-3.5">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
