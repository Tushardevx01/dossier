"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const RIGOR_ASCII = `
┌──────────────────────┬─────────────────────────────┐
│ AUTHENTICATION       │ Clerk                       │
│ VIDEO TRANSPORT      │ Stream Video SDK            │
│ SERVER TOKEN         │ Stream Node SDK             │
│ ROUTING              │ Next.js App Router          │
│ UI STATE             │ React state + SDK state     │
│ STYLING              │ Tailwind CSS                │
│ COMPONENT SYSTEM     │ Radix UI                    │
│ ICON SYSTEM          │ Lucide                      │
│ MOTION               │ Framer Motion               │
│ DEPLOYMENT           │ Vercel                      │
└──────────────────────┴─────────────────────────────┘
`;

export const FenixTechnicalRigor = () => {
  return (
    <section id="rigor" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-xl sm:text-2xl font-bold tracking-tight text-white uppercase`}>
          TECHNICAL RIGOR
        </h2>
      </div>

      {/* Narrative */}
      <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
        <p>
          The technology stack strictly reflects verified dependencies declared in the Fenix package manifest. Stream Video SDK provides battle-tested real-time media transport, while Next.js App Router and Clerk enforce server/client isolation.
        </p>
      </div>

      {/* Technical Matrix ASCII Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="PRODUCTION DEPENDENCY & ARCHITECTURE MATRIX"
          badge="PACKAGE VERIFIED"
          content={RIGOR_ASCII}
          caption="Fig 6.1: Technical boundary matrix matching packages declared and implemented in the repository."
        />
      </div>

      {/* Key Guarantees */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
        <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] space-y-1">
          <div className="text-emerald-400 font-bold">ZERO FAKE WEBRTC CODE</div>
          <p className="text-neutral-400 font-sans text-[11px]">
            Relies directly on <code className="text-neutral-300">@stream-io/video-react-sdk</code> rather than claiming unverified raw WebRTC transport layers.
          </p>
        </div>

        <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] space-y-1">
          <div className="text-emerald-400 font-bold">SECRETS ISOLATION</div>
          <p className="text-neutral-400 font-sans text-[11px]">
            Stream API secrets and token signing keys are isolated within server action boundaries (<code className="text-neutral-300">actions/stream.actions.ts</code>).
          </p>
        </div>

        <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] space-y-1">
          <div className="text-emerald-400 font-bold">ACCESSIBLE PRIMITIVES</div>
          <p className="text-neutral-400 font-sans text-[11px]">
            Meeting controls and modal dialogs leverage Radix UI primitives for keyboard navigation and screen reader support.
          </p>
        </div>
      </div>
    </section>
  );
};
