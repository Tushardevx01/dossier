"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const TECHNICAL_RIGOR_ASCII = `
┌─────────────────────┬──────────────────────────────┐
│ TYPE SAFETY         │ TypeScript                   │
│ VALIDATION          │ Zod                          │
│ FORMS               │ React Hook Form              │
│ DATA OPERATIONS     │ Server Actions               │
│ DATABASE            │ Appwrite Database            │
│ FILE STORAGE        │ Appwrite Storage             │
│ USER MANAGEMENT     │ Appwrite Users               │
│ NOTIFICATIONS       │ Appwrite Messaging / SMS     │
│ ERROR MONITORING    │ Sentry                       │
│ UI SYSTEM           │ Tailwind + shadcn/ui         │
│ DEPLOYMENT          │ Vercel                       │
└─────────────────────┴──────────────────────────────┘
`;

export const CarePulseTechnicalRigor = () => {
  return (
    <section id="rigor" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-900">
        <span className="text-xs font-mono text-emerald-400 font-bold">07</span>
        <span className="text-neutral-600 font-mono text-xs">//</span>
        <h2 className={`${nasalization.className} text-xl sm:text-2xl font-bold tracking-tight text-white uppercase`}>
          TECHNICAL RIGOR
        </h2>
      </div>

      {/* Narrative */}
      <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
        <p>
          Every architectural layer in CarePulse is grounded directly in verified repository code. No fabricated enterprise microservices or unbacked dependencies are added; the stack maps strictly to the dependencies declared in the project configuration.
        </p>
      </div>

      {/* Technical Matrix Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="CORE TECHNICAL MATRIX"
          badge="PACKAGE VERIFIED"
          content={TECHNICAL_RIGOR_ASCII}
          caption="Fig 7.1: Architectural boundary matrix verified against the production package manifest and repository implementations."
        />
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
        <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] space-y-1">
          <div className="text-emerald-400 font-bold">STRICT TYPE PARITY</div>
          <div className="text-neutral-400 text-[11px] font-sans">
            TypeScript interfaces in <code className="text-neutral-300">types/index.d.ts</code> align client form values directly with Appwrite document schemas.
          </div>
        </div>

        <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] space-y-1">
          <div className="text-emerald-400 font-bold">ISOLATED SECRETS</div>
          <div className="text-neutral-400 font-sans text-[11px]">
            Appwrite API keys, database IDs, and Twilio tokens execute strictly in server action runtimes.
          </div>
        </div>

        <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] space-y-1">
          <div className="text-emerald-400 font-bold">ACTIVE MONITORING</div>
          <div className="text-neutral-400 font-sans text-[11px]">
            Sentry captures uncaught client-side exceptions and server action mutation rejections in real time.
          </div>
        </div>
      </div>
    </section>
  );
};
