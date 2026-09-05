"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const APPROACH_ASCII = `
PATIENT UI
    │
    ▼
NEXT.JS APP
    │
    ├── Server Actions
    │
    ├── Form Validation
    │
    └── UI Components
           │
           ▼
       APPWRITE
     ┌─────┼─────────┐
     ▼     ▼         ▼
  USERS DATABASE  STORAGE
           │
           ▼
       APPOINTMENTS
           │
           ▼
        MESSAGING
           │
           ▼
          SMS
`;

export const CarePulseApproach = () => {
  return (
    <section id="approach" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-xl sm:text-2xl font-bold tracking-tight text-white uppercase`}>
          THE APPROACH
        </h2>
      </div>

      {/* Narrative */}
      <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
        <p>
          The application keeps the client-side user experience simple and reactive while moving all data operations, validation parsing, and third-party API mutations into server-side actions. This design avoids heavy client bundles, hides private Appwrite master keys from the browser, and ensures that all patient and appointment state transitions are verified in an isolated server environment.
        </p>
      </div>

      {/* ASCII Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="HIGH-LEVEL SERVER-ACTION ARCHITECTURE"
          badge="DATA TOPOLOGY"
          content={APPROACH_ASCII}
          caption="Fig 2.1: Client form submissions flow into server actions, orchestrating Appwrite Users, Databases, Storage, and Twilio SMS dispatch."
        />
      </div>

      {/* Separation of Concerns Breakdown */}
      <div className="pt-4 space-y-3">
        <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
          SEPARATION OF CONCERNS // CODEBASE BOUNDARIES
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold">UI & FORMS</span>
              <span className="text-emerald-400 text-[10px]">CLIENT</span>
            </div>
            <div className="text-neutral-500 text-[11px]">→ forms/components</div>
            <p className="text-neutral-400 text-[11px] font-sans">
              Controlled inputs, masked phone fields, custom select dropdowns, and shadcn/ui primitives.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold">BUSINESS OPERATIONS</span>
              <span className="text-emerald-400 text-[10px]">SERVER</span>
            </div>
            <div className="text-neutral-500 text-[11px]">→ lib/actions</div>
            <p className="text-neutral-400 text-[11px] font-sans">
              Server actions (`appointment.actions.ts`, `patient.actions.ts`) executing privileged mutations.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold">VALIDATION BOUNDARIES</span>
              <span className="text-emerald-400 text-[10px]">UNIVERSAL</span>
            </div>
            <div className="text-neutral-500 text-[11px]">→ lib/validation</div>
            <p className="text-neutral-400 text-[11px] font-sans">
              Zod schemas enforcing strict types, email regex, E.164 phone formats, and consent flags.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold">BACKEND CONFIGURATION</span>
              <span className="text-emerald-400 text-[10px]">SDK INIT</span>
            </div>
            <div className="text-neutral-500 text-[11px]">→ lib/appwrite.config</div>
            <p className="text-neutral-400 text-[11px] font-sans">
              Configures Appwrite Client, Databases, Users, Storage, and Messaging instances with project keys.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] space-y-1.5 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold">TYPE CONTRACTS</span>
              <span className="text-emerald-400 text-[10px]">STATIC SAFETY</span>
            </div>
            <div className="text-neutral-500 text-[11px]">→ types</div>
            <p className="text-neutral-400 text-[11px] font-sans">
              Centralized TypeScript interfaces defining Patient, Appointment, Doctor, and Form parameters ensuring end-to-end type parity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
