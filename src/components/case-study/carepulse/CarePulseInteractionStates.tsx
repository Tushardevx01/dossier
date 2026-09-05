"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const INTERACTION_STATES_ASCII = `
PATIENT
 │
 ▼
REGISTERING
 │
 ▼
REGISTERED
 │
 ▼
BOOKING
 │
 ▼
PENDING
 │
 ├───────────────┐
 ▼               ▼
SCHEDULED     CANCELLED
 │               │
 └───────┬───────┘
         ▼
      NOTIFIED
`;

export const CarePulseInteractionStates = () => {
  return (
    <section id="states" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-xl sm:text-2xl font-bold tracking-tight text-white uppercase`}>
          SYSTEM INTERACTION STATES
        </h2>
      </div>

      {/* Narrative */}
      <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
        <p>
          Rather than conceptualizing the platform as a distributed state machine, CarePulse models explicit, verified application and user interaction states. Each phase transitions cleanly from initial registration through appointment triage to final notification.
        </p>
      </div>

      {/* ASCII State Flow Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="APPLICATION WORKFLOW & APPOINTMENT STATES"
          badge="INTERACTION TOPOLOGY"
          content={INTERACTION_STATES_ASCII}
          caption="Fig 12.1: End-to-end user state progression: from initial patient identity and clinical profile registration to administrative scheduling/cancellation and patient SMS notification."
        />
      </div>

      {/* Exact Terminology Explanations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 font-mono text-xs">
        <div className="p-4 rounded-xl border border-neutral-800/80 bg-[#09090b] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-amber-400 font-bold">PENDING</span>
            <span className="text-[10px] text-neutral-500">STATE 01</span>
          </div>
          <p className="text-neutral-400 font-sans text-xs leading-relaxed">
            Appointment request created by the patient. The booking awaits administrative triage and scheduling.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-neutral-800/80 bg-[#09090b] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-emerald-400 font-bold">SCHEDULED</span>
            <span className="text-[10px] text-neutral-500">STATE 02</span>
          </div>
          <p className="text-neutral-400 font-sans text-xs leading-relaxed">
            Administrator confirms physician assignment, validates calendar availability, and confirms the appointment.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-neutral-800/80 bg-[#09090b] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-red-400 font-bold">CANCELLED</span>
            <span className="text-[10px] text-neutral-500">STATE 03</span>
          </div>
          <p className="text-neutral-400 font-sans text-xs leading-relaxed">
            Administrator rejects or revokes the appointment, recording a mandatory justification note in the database.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-neutral-800/80 bg-[#09090b] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-blue-400 font-bold">NOTIFIED</span>
            <span className="text-[10px] text-neutral-500">STATE 04</span>
          </div>
          <p className="text-neutral-400 font-sans text-xs leading-relaxed">
            Patient receives an automated SMS update reflecting the final scheduled appointment time or cancellation reason.
          </p>
        </div>
      </div>
    </section>
  );
};
