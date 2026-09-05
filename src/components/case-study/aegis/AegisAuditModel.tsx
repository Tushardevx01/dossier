"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const AUDIT_RELATIONSHIPS_ASCII = `
SERVICE
   │
   ▼
INFRASTRUCTURE EVENT
   │
   ├── INCIDENT EMBEDDING
   │
   └── REMEDIATION PLAN
              │
              ▼
       ACTION EXECUTION
`;

const AUDIT_COLLECTIONS = [
  {
    title: "EPISODES",
    role: "Offline RL Replay Buffer",
    desc: "Sequential incident-state-action tuples captured to train offline reinforcement learning policies without production interference.",
  },
  {
    title: "METRICS SNAPSHOTS",
    role: "Infrastructure Measurements",
    desc: "Point-in-time CPU, RAM, and container network metrics recorded before, during, and after remediation actions.",
  },
  {
    title: "OUTBOX EVENTS",
    role: "Durable Kafka Event Retry",
    desc: "Transactional outbox pattern guaranteeing that every detected container incident is eventually delivered to Kafka even if brokers temporarily disconnect.",
  },
];

export const AegisAuditModel = () => {
  return (
    <section id="audit-trail" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          THE AUDIT TRAIL
        </h2>
      </div>

      <div className="max-w-3xl space-y-2">
        <p className="text-base sm:text-lg text-neutral-200 font-sans leading-relaxed font-light">
          Aegis is not simply a container restart script. It maintains an immutable, multi-dimensional MongoDB audit history preserving full incident context, neural vectors, and execution logs.
        </p>
      </div>

      {/* ASCII Schema Relationships */}
      <div className="pt-2">
        <AsciiDiagram
          title="MONGODB ENTITY RELATIONSHIPS"
          badge="DATA SCHEMA"
          content={AUDIT_RELATIONSHIPS_ASCII}
          caption="Relational structure linking services to raw infrastructure events, high-dimensional embeddings, plans, and execution receipts."
        />
      </div>

      {/* 3 Specialized Persistence Models */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 font-mono text-xs">
        {AUDIT_COLLECTIONS.map((col) => (
          <div
            key={col.title}
            className="p-4 rounded-xl border border-neutral-800 bg-[#070709] space-y-1.5"
          >
            <div className="space-y-0.5">
              <span className="text-emerald-400 font-bold text-xs block">{col.title}</span>
              <span className="text-neutral-500 text-[10px] block font-semibold">{col.role}</span>
            </div>
            <p className="text-neutral-300 font-sans text-xs leading-relaxed pt-1">
              {col.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
