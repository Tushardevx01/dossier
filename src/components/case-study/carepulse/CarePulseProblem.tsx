"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const PROBLEM_ASCII = `
PATIENT
   │
   ├── Registration
   │
   ├── Medical information
   │
   └── Appointment request
             │
             ▼
        ADMINISTRATOR
             │
       ┌─────┼─────┐
       ▼     ▼     ▼
   SCHEDULE  PENDING  CANCEL
       │
       ▼
   PATIENT NOTIFICATION
`;

export const CarePulseProblem = () => {
  return (
    <section id="problem" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-xl sm:text-2xl font-bold tracking-tight text-white uppercase`}>
          THE PROBLEM
        </h2>
      </div>

      {/* Narrative Block (3-4 sentences as requested) */}
      <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
        <p>
          Healthcare appointment platforms involve distinct actors and intricate state transitions across patients, clinical administrators, and physicians. The engineering challenge was not simply rendering input forms, but coordinating multi-field patient registration, clinical data, doctor selection, appointment requests, status transitions (Pending, Scheduled, Cancelled), SMS notifications, document storage, and administrative management in a unified, reliable product lifecycle.
        </p>
      </div>

      {/* ASCII Workflow Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="ACTOR COORDINATION & STATE CHANGES"
          badge="WORKFLOW TOPOLOGY"
          content={PROBLEM_ASCII}
          caption="Fig 1.1: Coordination boundaries between patient registration, administrative review, appointment state changes, and automated SMS dispatch."
        />
      </div>

      {/* Key Coordination Points */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs">
        <div className="p-3 rounded-lg border border-neutral-900 bg-[#09090b]">
          <span className="text-emerald-400 font-bold">CLINICAL DATA</span>
          <p className="text-neutral-400 text-[11px] mt-1">Multi-step patient history, insurance, and emergency contacts.</p>
        </div>
        <div className="p-3 rounded-lg border border-neutral-900 bg-[#09090b]">
          <span className="text-emerald-400 font-bold">STATE MUTATIONS</span>
          <p className="text-neutral-400 text-[11px] mt-1">Deterministic transitions across Pending, Scheduled, and Cancelled.</p>
        </div>
        <div className="p-3 rounded-lg border border-neutral-900 bg-[#09090b]">
          <span className="text-emerald-400 font-bold">DOCUMENT VAULT</span>
          <p className="text-neutral-400 text-[11px] mt-1">Encrypted patient identification uploads via Appwrite Storage.</p>
        </div>
        <div className="p-3 rounded-lg border border-neutral-900 bg-[#09090b]">
          <span className="text-emerald-400 font-bold">NOTIFICATIONS</span>
          <p className="text-neutral-400 text-[11px] mt-1">Instant SMS dispatch verifying appointments and cancellations.</p>
        </div>
      </div>
    </section>
  );
};
