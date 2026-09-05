"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const VALIDATION_ASCII = `
                 USER INPUT
                     │
                     ▼
              REACT HOOK FORM
                     │
                     ▼
                  ZOD
                     │
              ┌──────┴──────┐
              │             │
            VALID         INVALID
              │             │
              ▼             ▼
        SERVER ACTION     ERROR
              │
              ▼
           APPWRITE
`;

const VALIDATION_SCHEMAS = [
  {
    name: "UserFormValidation",
    target: "Patient Onboarding Step 1",
    fields: "name, email, phone",
    purpose: "Validates minimum character length for names, RFC email standards, and E.164 phone formatting.",
  },
  {
    name: "PatientFormValidation",
    target: "Full Clinical Registration",
    fields: "20+ medical & consent fields",
    purpose: "Enforces birth date parsing, emergency contact relations, insurance policy numbers, file uploads, and mandatory consent flags.",
  },
  {
    name: "CreateAppointmentSchema",
    target: "Patient Booking Modal",
    fields: "primaryPhysician, schedule, reason",
    purpose: "Ensures valid physician assignment, forward-looking schedule timestamp, and appointment context strings.",
  },
  {
    name: "ScheduleAppointmentSchema",
    target: "Administrative Confirmation",
    fields: "primaryPhysician, schedule, cancellationReason (optional)",
    purpose: "Verifies finalized doctor selection and precise confirmed appointment time for SMS transmission.",
  },
  {
    name: "CancelAppointmentSchema",
    target: "Administrative Cancellation",
    fields: "cancellationReason (required)",
    purpose: "Mandates non-empty justification string (min 2 chars) explaining the cancellation to the patient via SMS.",
  },
];

export const CarePulseValidation = () => {
  return (
    <section id="validation" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-900">
        <span className="text-xs font-mono text-emerald-400 font-bold">08</span>
        <span className="text-neutral-600 font-mono text-xs">//</span>
        <h2 className={`${nasalization.className} text-xl sm:text-2xl font-bold tracking-tight text-white uppercase`}>
          VALIDATION BOUNDARIES
        </h2>
      </div>

      {/* Narrative */}
      <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
        <p>
          Validation is centralized in <code className="text-emerald-400 font-mono text-xs px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800">lib/validation.ts</code> rather than scattered ad-hoc across individual UI components. React Hook Form leverages Zod resolvers to enforce strict schema integrity on the client, preventing invalid payloads from ever reaching the server actions or Appwrite database collections.
        </p>
      </div>

      {/* ASCII Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="SCHEMA RESOLUTION & SUBMISSION PIPELINE"
          badge="INPUT SANITIZATION"
          content={VALIDATION_ASCII}
          caption="Fig 8.1: Controlled React Hook Form inputs evaluated through centralized Zod schemas, separating valid mutations from instant inline errors."
        />
      </div>

      {/* Schema Inventory Table */}
      <div className="pt-3 space-y-3">
        <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
          CENTRALIZED ZOD SCHEMA INVENTORY // LIB/VALIDATION.TS
        </div>

        <div className="grid grid-cols-1 gap-2.5 font-mono text-xs">
          {VALIDATION_SCHEMAS.map((schema) => (
            <div
              key={schema.name}
              className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">{schema.name}</span>
                  <span className="text-[10px] text-neutral-500 font-mono px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800">
                    {schema.target}
                  </span>
                </div>
                <p className="text-neutral-400 text-xs font-sans">{schema.purpose}</p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[11px] text-neutral-500 block">Validated Keys:</span>
                <span className="text-neutral-300 text-xs">{schema.fields}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
