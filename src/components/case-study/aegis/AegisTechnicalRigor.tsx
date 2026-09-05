"use client";

import { nasalization } from "@/app/fonts";

const RIGOR_MATRIX = [
  {
    discipline: "EVENT DELIVERY",
    mechanism: "Kafka Event Backbone",
    detail: "Decouples container watcher death telemetry from downstream AI diagnostic processing.",
  },
  {
    discipline: "STATE",
    mechanism: "MongoDB Durable Audit Trail",
    detail: "Stores immutable incident records, vector embeddings, safety decisions, and receipts.",
  },
  {
    discipline: "FAILURE HANDLING",
    mechanism: "Kafka Retry / Outbox Strategy",
    detail: "Guarantees reliable message delivery even during transient database or service hiccups.",
  },
  {
    discipline: "AI",
    mechanism: "Local Inference Pipeline",
    detail: "SentenceTransformers (all-MiniLM-L6-v2), FAISS, and PyTorch run 100% locally without cloud dependencies.",
  },
  {
    discipline: "SAFETY",
    mechanism: "Deterministic Remediation Policy",
    detail: "Enforces confidence thresholds (>= 0.85) and LOW risk validation before approving any actuation.",
  },
  {
    discipline: "SECURITY",
    mechanism: "No Shell Execution",
    detail: "Eliminates command injection risks by restricting actions to Dockerode API socket calls.",
  },
  {
    discipline: "NETWORK",
    mechanism: "Private Docker Bridge",
    detail: "Services communicate across an isolated host bridge without external egress or cloud telemetry leaks.",
  },
  {
    discipline: "TESTING",
    mechanism: "Chaos Simulation Engine",
    detail: "Built-in failure harness injecting OOM, timeout, crash loop, permission, and port collisions.",
  },
];

export const AegisTechnicalRigor = () => {
  return (
    <section id="rigor" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          TECHNICAL RIGOR
        </h2>
      </div>

      <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-3xl leading-relaxed">
        Concrete systems guarantees enforced through decoupled streaming, immutable persistence, and deterministic safety boundaries.
      </p>

      {/* Technical Matrix Table */}
      <div className="rounded-xl border border-neutral-800 bg-[#070709] overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 px-5 py-3 border-b border-neutral-800/80 bg-neutral-950 font-mono text-[11px] text-neutral-400 font-semibold uppercase tracking-wider">
          <div className="md:col-span-3">DISCIPLINE</div>
          <div className="md:col-span-4">ENGINEERING MECHANISM</div>
          <div className="md:col-span-5">SYSTEM GUARANTEE</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-neutral-900/80 font-mono text-xs">
          {RIGOR_MATRIX.map((item) => (
            <div
              key={item.discipline}
              className="grid grid-cols-1 md:grid-cols-12 px-5 py-3.5 items-baseline gap-2 md:gap-4 hover:bg-neutral-900/30 transition-colors"
            >
              <div className="md:col-span-3 text-emerald-400 font-semibold text-[11px] uppercase tracking-wider">
                {item.discipline}
              </div>
              <div className="md:col-span-4 text-white font-medium">
                {item.mechanism}
              </div>
              <div className="md:col-span-5 text-neutral-400 font-sans text-xs leading-relaxed">
                {item.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
