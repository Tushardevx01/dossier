"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const FINAL_SYSTEM_ASCII = `
                   CAREPULSE
                      │
         ┌────────────┴────────────┐
         │                         │
      PATIENT                    ADMIN
         │                         │
         ▼                         ▼
   REGISTRATION               DASHBOARD
         │                         │
         ▼                         │
    PATIENT DATA                   │
         │                         │
         └──────────┬──────────────┘
                    ▼
              APPOINTMENTS
                    │
          ┌─────────┼─────────┐
          ▼         ▼         ▼
       PENDING   SCHEDULED  CANCELLED
          │         │         │
          └─────────┼─────────┘
                    ▼
              APPWRITE
          ┌─────────┼─────────┐
          ▼         ▼         ▼
       USERS      DATABASE   STORAGE
                              │
                              ▼
                          DOCUMENTS

                    +
               MESSAGING
                    │
                    ▼
                   SMS
`;

export const CarePulseFinalSystem = () => {
  return (
    <section id="final-system" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-900">
        <span className="text-xs font-mono text-emerald-400 font-bold">17</span>
        <span className="text-neutral-600 font-mono text-xs">//</span>
        <h2 className={`${nasalization.className} text-xl sm:text-2xl font-bold tracking-tight text-white uppercase`}>
          SYSTEM INTEGRATION
        </h2>
      </div>

      {/* Narrative */}
      <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
        <p>
          CarePulse represents a complete, cohesive full-stack product architecture. From validated onboarding and patient records through appointment state transitions, Appwrite BaaS integration, file vault storage, and automated Twilio SMS dispatches, every component works in synchronized unison without artificial architectural inflation.
        </p>
      </div>

      {/* Final System ASCII Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="CAREPULSE COMPLETE SYSTEM INTEGRATION"
          badge="END-TO-END ARCHITECTURE"
          content={FINAL_SYSTEM_ASCII}
          caption="Fig 17.1: Comprehensive system synthesis: bridging patient onboarding, administrative triage, finite state appointments, Appwrite BaaS primitives, and real-time SMS messaging."
        />
      </div>
    </section>
  );
};
