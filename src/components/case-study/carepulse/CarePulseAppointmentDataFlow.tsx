"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const APPOINTMENT_DATA_FLOW_ASCII = `
AppointmentForm
      │
      ▼
getAppointmentSchema(type)
      │
      ▼
Zod Resolver
      │
      ▼
onSubmit()
      │
      ├───────────────┐
      ▼               ▼
CREATE             UPDATE
      │               │
      ▼               ▼
createAppointment  updateAppointment
      │               │
      └───────┬───────┘
              ▼
        Appwrite Database
              │
              ▼
        Appointment State
              │
              ▼
       SMS Notification
`;

export const CarePulseAppointmentDataFlow = () => {
  return (
    <section id="appointment-data-flow" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-xl sm:text-2xl font-bold tracking-tight text-white uppercase`}>
          APPOINTMENT DATA FLOW
        </h2>
      </div>

      {/* Narrative */}
      <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
        <p>
          The appointment mutation engine uses dynamic schema resolution to handle multiple modal actions with zero redundant component definitions. Passing the modal mode (<code className="text-emerald-400 font-mono text-xs">type: &quot;create&quot; | &quot;schedule&quot; | &quot;cancel&quot;</code>) into <code className="text-emerald-400 font-mono text-xs">getAppointmentSchema(type)</code> generates the specific Zod validator needed. Submissions fork cleanly to either <code className="text-neutral-300 font-mono text-xs">createAppointment</code> or <code className="text-neutral-300 font-mono text-xs">updateAppointment</code>, persisting state to Appwrite and dispatching SMS updates.
        </p>
      </div>

      {/* ASCII Diagram (Visually Prominent) */}
      <div className="pt-2">
        <AsciiDiagram
          title="POLYMORPHIC APPOINTMENT MUTATION FLOW"
          badge="SERVER ACTION RESOLVER"
          content={APPOINTMENT_DATA_FLOW_ASCII}
          caption="Fig 11.1: Dynamic schema resolution: modal type switches the Zod schema resolver on the client, dispatching tailored server actions and triggering Twilio SMS updates."
        />
      </div>

      {/* Key Implementation Mechanisms */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
        <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] space-y-1">
          <div className="text-emerald-400 font-bold">DYNAMIC RESOLVER</div>
          <div className="text-white font-medium text-[11px]">getAppointmentSchema(type)</div>
          <p className="text-neutral-400 font-sans text-xs">
            Conditionally marks fields as optional or required based on whether the action is initial creation or administrative cancellation.
          </p>
        </div>

        <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] space-y-1">
          <div className="text-emerald-400 font-bold">BRANCHED MUTATION</div>
          <div className="text-white font-medium text-[11px]">create / update server actions</div>
          <p className="text-neutral-400 font-sans text-xs">
            Routes execution path between initial record generation (<code className="text-neutral-300">status: &quot;pending&quot;</code>) and state changes (<code className="text-neutral-300">&quot;scheduled&quot;</code> or <code className="text-neutral-300">&quot;cancelled&quot;</code>).
          </p>
        </div>

        <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] space-y-1">
          <div className="text-emerald-400 font-bold">SMS NOTIFICATION</div>
          <div className="text-white font-medium text-[11px]">sendSMSNotification()</div>
          <p className="text-neutral-400 font-sans text-xs">
            Dispatches patient updates via Appwrite Messaging / Twilio, communicating confirmed booking slots or cancellation justifications.
          </p>
        </div>
      </div>
    </section>
  );
};
