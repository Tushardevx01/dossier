"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const APPOINTMENT_ASCII = `
PATIENT
   │
   ▼
CREATE REQUEST
   │
   ▼
PENDING
   │
   ├───────────────┐
   ▼               ▼
SCHEDULED       CANCELLED
   │               │
   ▼               ▼
SMS UPDATE      SMS UPDATE
   │
   ▼
PATIENT
`;

export const CarePulseAppointmentWorkflow = () => {
  return (
    <section id="appointment-workflow" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-900">
        <span className="text-xs font-mono text-emerald-400 font-bold">05</span>
        <span className="text-neutral-600 font-mono text-xs">//</span>
        <h2 className={`${nasalization.className} text-xl sm:text-2xl font-bold tracking-tight text-white uppercase`}>
          APPOINTMENT LIFECYCLE
        </h2>
      </div>

      {/* Narrative */}
      <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
        <p>
          The appointment lifecycle supports create, schedule, and cancel workflows without ambiguous intermediate states. The repository's appointment server actions explicitly map: incoming patient requests initialize with status <code className="text-emerald-400 font-mono text-xs px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800">pending</code>, administrative approvals transition the record to <code className="text-emerald-400 font-mono text-xs px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800">scheduled</code>, and rejections transition to <code className="text-emerald-400 font-mono text-xs px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800">cancelled</code>. Both schedule and cancel transitions dispatch automated SMS updates via Twilio.
        </p>
      </div>

      {/* ASCII Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="APPOINTMENT STATE TRANSITION & NOTIFICATION FLOW"
          badge="FINITE STATE MACHINE"
          content={APPOINTMENT_ASCII}
          caption="Fig 5.1: Finite state lifecycle: Patient creation transitions to PENDING, while administrative actions trigger SCHEDULED or CANCELLED states with real-time SMS notifications."
        />
      </div>

      {/* State Transitions Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
        <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-amber-400 font-bold">01 / PENDING</span>
            <span className="text-[10px] text-neutral-500">CREATE FLOW</span>
          </div>
          <p className="text-neutral-400 font-sans text-xs">
            Triggered when a patient books via <code className="text-neutral-300">createAppointment()</code>. Records primary doctor, appointment reason, and patient notes into Appwrite Database.
          </p>
        </div>

        <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-emerald-400 font-bold">02 / SCHEDULED</span>
            <span className="text-[10px] text-neutral-500">ADMIN FLOW</span>
          </div>
          <p className="text-neutral-400 font-sans text-xs">
            Admin confirms doctor assignment and specific calendar slot via <code className="text-neutral-300">updateAppointment()</code>. Dispatches confirmation SMS with time and doctor details.
          </p>
        </div>

        <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-red-400 font-bold">03 / CANCELLED</span>
            <span className="text-[10px] text-neutral-500">ADMIN FLOW</span>
          </div>
          <p className="text-neutral-400 font-sans text-xs">
            Admin records a required cancellation reason string. Updates appointment status in Appwrite and dispatches notification SMS explaining the cancellation to the patient.
          </p>
        </div>
      </div>
    </section>
  );
};
