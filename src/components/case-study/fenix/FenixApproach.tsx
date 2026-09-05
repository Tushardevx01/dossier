"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const APPROACH_ASCII = `
IDENTITY
Clerk

        ↓

APPLICATION
Next.js / React

        ↓

VIDEO SESSION
Stream Video SDK

        ↓

SERVER TOKEN ISSUANCE
Stream Node SDK

        ↓

REAL-TIME CALL
Participants / Media / State
`;

export const FenixApproach = () => {
  return (
    <section id="approach" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-900">
        <span className="text-xs font-mono text-emerald-400 font-bold">02</span>
        <span className="text-neutral-600 font-mono text-xs">//</span>
        <h2 className={`${nasalization.className} text-xl sm:text-2xl font-bold tracking-tight text-white uppercase`}>
          THE APPROACH
        </h2>
      </div>

      {/* Narrative */}
      <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
        <p>
          Fenix structures real-time communication by isolating identity, application routing, media transport, and server-side token generation into distinct operational boundaries.
        </p>
      </div>

      {/* ASCII Workflow */}
      <div className="pt-2">
        <AsciiDiagram
          title="RESPONSIBILITY DECOUPLING WORKFLOW"
          badge="ARCHITECTURE FLOW"
          content={APPROACH_ASCII}
          caption="Fig 2.1: Separation of responsibilities across Clerk identity, Next.js application layer, Stream Node SDK token signing, and Stream Video real-time transport."
        />
      </div>

      {/* Single-Sentence Architectural Points */}
      <div className="pt-3 space-y-2.5 font-mono text-xs">
        <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] flex items-start gap-3">
          <span className="text-emerald-400 font-bold shrink-0">01.</span>
          <p className="text-neutral-300 font-sans text-xs">
            Clerk handles authenticated user identity and session persistence across the application.
          </p>
        </div>

        <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] flex items-start gap-3">
          <span className="text-emerald-400 font-bold shrink-0">02.</span>
          <p className="text-neutral-300 font-sans text-xs">
            Next.js provides the application routing layer, layout structures, and server action infrastructure.
          </p>
        </div>

        <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] flex items-start gap-3">
          <span className="text-emerald-400 font-bold shrink-0">03.</span>
          <p className="text-neutral-300 font-sans text-xs">
            Stream Video manages real-time media transport, peer connections, and participant presence state.
          </p>
        </div>

        <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] flex items-start gap-3">
          <span className="text-emerald-400 font-bold shrink-0">04.</span>
          <p className="text-neutral-300 font-sans text-xs">
            The server generates cryptographically signed Stream tokens using the Stream Node SDK without leaking master API secrets.
          </p>
        </div>

        <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] flex items-start gap-3">
          <span className="text-emerald-400 font-bold shrink-0">05.</span>
          <p className="text-neutral-300 font-sans text-xs">
            React components coordinate device previews, active room controls, dynamic layouts, and participant dialogs.
          </p>
        </div>
      </div>
    </section>
  );
};
