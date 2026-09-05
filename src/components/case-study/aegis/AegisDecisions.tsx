"use client";

import { nasalization, mono } from "@/app/fonts";

interface DecisionRecord {
  tech: string;
  badge: string;
  why: string;
  subWhy?: string;
}

const DECISIONS: DecisionRecord[] = [
  {
    tech: "Kafka KRaft",
    badge: "EVENT STREAMING",
    why: "Durable event streaming and high-throughput decoupling between container event capture and neural processing.",
    subWhy: "WHY KRAFT: Operates with internal Raft quorum, eliminating Apache ZooKeeper as an operational dependency.",
  },
  {
    tech: "MongoDB",
    badge: "STATE & AUDIT",
    why: "Flexible document persistence perfectly suited for semi-structured incident payloads, raw log arrays, high-dimensional vector embeddings, and offline RL replay buffers.",
  },
  {
    tech: "Dockerode",
    badge: "CONTAINER RUNTIME",
    why: "Direct Docker Engine Unix socket communication without spawning shell subprocesses, eliminating shell injection and command interpretation risks.",
  },
  {
    tech: "FAISS",
    badge: "VECTOR SEARCH",
    why: "Ultra-fast local nearest-neighbor similarity search over historical incident embeddings without cloud vector database latency or cost.",
  },
  {
    tech: "SentenceTransformers",
    badge: "LOCAL EMBEDDINGS",
    why: "Compact, efficient local model (all-MiniLM-L6-v2) generating 384-dimensional dense semantic vectors entirely offline on CPU/GPU.",
  },
  {
    tech: "NestJS",
    badge: "CONTROL PLANE",
    why: "Enterprise-grade TypeScript modular architecture with strict dependency injection, separating watchers, event buses, safety policies, and actuators.",
  },
];

export const AegisDecisions = () => {
  return (
    <section id="decisions" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <span className={`${mono.className} text-[11px] tracking-[0.25em] text-neutral-500 uppercase font-semibold block`}>
          09 // ARCHITECTURAL CHOICES
        </span>
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          TECHNICAL DECISIONS
        </h2>
      </div>

      <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-3xl leading-relaxed">
        Compact decision records detailing why each core technology was selected to guarantee air-gapped autonomy, strict isolation, and high performance.
      </p>

      {/* Decision Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
        {DECISIONS.map((item) => (
          <div
            key={item.tech}
            className="p-5 rounded-xl border border-neutral-800 bg-[#070709] hover:border-neutral-700 transition-colors flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-900">
                <h3 className={`${nasalization.className} text-sm sm:text-base font-bold text-white uppercase tracking-wide`}>
                  {item.tech}
                </h3>
                <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 px-2 py-0.5 rounded font-semibold">
                  {item.badge}
                </span>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider block font-semibold">
                  WHY
                </span>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  {item.why}
                </p>
              </div>

              {item.subWhy && (
                <div className="pt-2 border-t border-neutral-900 text-[11px] font-mono text-emerald-400">
                  {item.subWhy}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
