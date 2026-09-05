"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const AI_PIPELINE_ASCII = `
RAW CRASH LOG
      │
      ▼
PREPROCESSING
      │
      ▼
ALL-MINILM-L6-V2
      │
      ▼
384-DIM EMBEDDING
      │
      ├─────────────────────┐
      ▼                     ▼
   FAISS                   MLP
Similarity Search      Classification
      │                     │
      └──────────┬──────────┘
                 ▼
          DIAGNOSIS RESPONSE
`;

const PIPELINE_COMPONENTS = [
  {
    title: "EMBEDDING",
    tool: "all-MiniLM-L6-v2",
    desc: "Preprocesses raw container stderr/stdout logs and converts them into normalized 384-dimensional dense semantic vectors.",
  },
  {
    title: "FAISS SEARCH",
    tool: "Facebook AI Similarity Search",
    desc: "Executes sub-millisecond local vector distance search over historical incident embeddings to find nearest prior failures.",
  },
  {
    title: "MLP CLASSIFIER",
    tool: "PyTorch Neural Network",
    desc: "Classifies the 384-dim log embedding into supported failure categories (OOM, Timeout, Crash Loop, Port, Perm, Leak).",
  },
  {
    title: "DIAGNOSIS OUTPUT",
    tool: "Structured Schema",
    desc: "Emits failure classification, calibrated confidence score, blast radius risk level, and suggested enum remediation action.",
  },
];

export const AegisAiPipeline = () => {
  return (
    <section id="ai-pipeline" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          AI DIAGNOSIS PIPELINE
        </h2>
      </div>

      {/* Explicit Clarification (2-3 lines) */}
      <div className="max-w-3xl space-y-2">
        <p className="text-base sm:text-lg text-neutral-200 font-sans leading-relaxed font-light">
          Aegis avoids non-deterministic generative LLMs in favor of a fast, local neural pipeline combining semantic embedding, vector similarity, and multi-layer perceptron (MLP) classification.
        </p>
      </div>

      {/* ASCII AI Diagnosis Flow Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="LOCAL VECTOR EMBEDDING & CLASSIFICATION PIPELINE"
          badge="LOCAL NEURAL INFERENCE"
          content={AI_PIPELINE_ASCII}
          caption="Crash logs pass into local all-MiniLM-L6-v2 embedding, querying FAISS similarity and PyTorch MLP classification in parallel."
        />
      </div>

      {/* 4 Core Components Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2 font-mono text-xs">
        {PIPELINE_COMPONENTS.map((c) => (
          <div
            key={c.title}
            className="p-4 rounded-xl border border-neutral-800 bg-[#070709] space-y-2"
          >
            <div className="space-y-0.5">
              <span className="text-emerald-400 font-bold text-xs block">{c.title}</span>
              <span className="text-neutral-500 text-[10px] block">{c.tool}</span>
            </div>
            <p className="text-neutral-300 font-sans text-xs leading-relaxed">
              {c.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Grounding Note */}
      <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-900 font-mono text-xs text-neutral-400">
        <span className="text-white font-semibold mr-2">ENGINEERING NOTE:</span>
        The entire diagnostic pipeline runs locally on CPU/GPU without cloud API dependencies, ensuring zero external data leakage and predictable millisecond response latencies.
      </div>
    </section>
  );
};
