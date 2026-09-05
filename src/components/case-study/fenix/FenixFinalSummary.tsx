"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const FINAL_SUMMARY_ASCII = `
        USER
         │
         ▼
   ┌─────────────┐
   │    CLERK    │
   │ AUTHENTICATE│
   └──────┬──────┘
          │
          ▼
   ┌─────────────┐
   │   NEXT.JS   │
   │ APPLICATION │
   └──────┬──────┘
          │
          ▼
   ┌─────────────┐
   │ STREAM TOKEN│
   │   PROVIDER  │
   └──────┬──────┘
          │
          ▼
   ┌─────────────┐
   │ STREAM VIDEO│
   │    CALL     │
   └──────┬──────┘
          │
     ┌────┼────┐
     ▼    ▼    ▼
   VIDEO AUDIO USERS
          │
          ▼
        EXIT
`;

export const FenixFinalSummary = () => {
  return (
    <section id="summary" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-900">
        <span className="text-xs font-mono text-emerald-400 font-bold">13</span>
        <span className="text-neutral-600 font-mono text-xs">//</span>
        <h2 className={`${nasalization.className} text-xl sm:text-2xl font-bold tracking-tight text-white uppercase`}>
          FROM IDENTITY TO REAL-TIME CALL
        </h2>
      </div>

      {/* Narrative */}
      <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
        <p>
          The complete architectural arc of Fenix spans user authentication through Clerk, application state management in Next.js, cryptographic Stream token signing via server actions, and active media coordination across video, audio, and participant streams.
        </p>
      </div>

      {/* ASCII Summary Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="END-TO-END IDENTITY & CALL ARCHITECTURE"
          badge="COMPLETE INTEGRATION FLOW"
          content={FINAL_SUMMARY_ASCII}
          caption="Fig 13.1: Final architectural synthesis: seamless bridge from Clerk authentication to authenticated Stream Video call session."
        />
      </div>
    </section>
  );
};
