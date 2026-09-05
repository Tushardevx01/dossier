"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const REMEDIATION_ENUM_ASCII = `
AI DIAGNOSIS
     │
     ▼
ENUM-ONLY ACTION REGISTRY
     │
     ├── RESTART_CONTAINER ──► dockerode.getContainer().restart()
     ├── STOP_CONTAINER    ──► dockerode.getContainer().stop()
     └── IGNORE            ──► no_op()
`;

const SAFETY_EVAL_ASCII = `
EVALUATE DIAGNOSIS
        │
        ├── confidence >= 0.85 ?
        ├── risk == LOW ?
        └── action == RESTART_CONTAINER ?
        │
    ┌───┴───┐
   YES      NO
    │        │
    ▼        ▼
 EXECUTE    SKIP + OPERATOR REVIEW
`;

const DECOUPLING_ASCII = `
DOCKER WATCHMAN (Events)
        │
        ▼
   KAFKA KRAFT (Buffer Queue)
        │
        ▼
NESTJS ORCHESTRATOR (Compute)
`;

const AUDITABILITY_ASCII = `
INCIDENT
   │
   ├── RAW LOG TAIL (stdout/stderr)
   ├── 384-DIM EMBEDDING (FAISS)
   ├── SAFETY POLICY VERIFICATION
   └── DOCKER ACTUATION RECEIPT
              │
              ▼
       MONGODB (Persisted)
`;

const SOLUTIONS = [
  {
    id: "remediation",
    number: "01",
    title: "AI-DRIVEN REMEDIATION WITHOUT RCE",
    problem: "AI model output should never become arbitrary shell execution on the host container environment.",
    constraint: "Automated actions must remain strictly deterministic, scoped, and bounded.",
    solution: "Used an enum-only action registry (RESTART_CONTAINER, STOP_CONTAINER, IGNORE) mapped directly to explicit Dockerode Unix socket calls.",
    result: "Zero AI-generated shell scripts enter the execution path. Remote code execution is architecturally impossible.",
    ascii: REMEDIATION_ENUM_ASCII,
  },
  {
    id: "uncertainty",
    number: "02",
    title: "LOW-CONFIDENCE DIAGNOSIS & FLAPPING",
    problem: "Inaccurate or low-confidence diagnosis can trigger unsafe automation loops and container thrashing.",
    constraint: "Remediation should execute autonomously only when classification certainty is mathematically high.",
    solution: "Enforced strict threshold gates: requires confidence >= 0.85 AND risk == LOW AND action == RESTART_CONTAINER. Otherwise, automated action is skipped and flagged for operator review.",
    result: "Unsafe or uncertain actions fail-safe into human oversight rather than causing cascading container failures.",
    ascii: SAFETY_EVAL_ASCII,
  },
  {
    id: "decoupling",
    number: "03",
    title: "EVENT DECOUPLING & BURST RESILIENCE",
    problem: "Docker event capture should not block on AI inference or drop events during container failure storms.",
    constraint: "Watcher latency must remain sub-millisecond even when neural networks take longer to compute.",
    solution: "Kafka KRaft acts as the distributed event backbone between the Docker Watchman and the NestJS orchestrator.",
    result: "High-throughput event ingestion with zero dropped incident signals and decoupled consumer processing.",
    ascii: DECOUPLING_ASCII,
  },
  {
    id: "auditability",
    number: "04",
    title: "EXPLAINABLE & AUDITABLE POST-MORTEMS",
    problem: "Automated remediation must remain completely explainable and auditable long after execution.",
    constraint: "Every input, neural vector, decision gate, and API execution receipt must be immutably preserved.",
    solution: "Persisted structured incidents, raw log tails, FAISS vectors, remediation plans, and execution receipts in MongoDB.",
    result: "Complete forensic audit trail for every automated SRE event across the infrastructure.",
    ascii: AUDITABILITY_ASCII,
  },
];

export const AegisChallengeSolutions = () => {
  return (
    <section id="solutions" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          ENGINEERING CHALLENGES & SOLUTIONS
        </h2>
      </div>

      <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-3xl leading-relaxed">
        Step-by-step engineering reasoning: Problem → Constraint → Engineering Response → Result applied across every critical reliability boundary.
      </p>

      {/* 4 Deep Dive Resolution Cards */}
      <div className="space-y-6 pt-1">
        {SOLUTIONS.map((item) => (
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

            {/* Context 4-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
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
                <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider block">
                  ENGINEERING RESPONSE
                </span>
                <p className="text-neutral-300 font-sans text-xs leading-relaxed">
                  {item.solution}
                </p>
              </div>

              <div className="p-3.5 rounded-lg border border-neutral-900 bg-neutral-950/80 space-y-1">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                  RESULT
                </span>
                <p className="text-neutral-300 font-sans text-xs leading-relaxed">
                  {item.result}
                </p>
              </div>
            </div>

            {/* Embedded ASCII Design */}
            <div className="pt-1">
              <AsciiDiagram
                title={`${item.title} // ARCHITECTURE`}
                badge="SYSTEM MECHANICS"
                content={item.ascii}
                caption="Formal resolution architecture implemented inside the Aegis runtime."
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
