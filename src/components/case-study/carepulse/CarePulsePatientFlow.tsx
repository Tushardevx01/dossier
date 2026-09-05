"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const PATIENT_FLOW_ASCII = `
START
 │
 ▼
BASIC INFORMATION
 │
 ├── Name
 ├── Email
 └── Phone
 │
 ▼
CREATE USER
 │
 ▼
PATIENT REGISTRATION
 │
 ├── Personal information
 ├── Medical information
 ├── Emergency contact
 ├── Insurance
 └── Consent
 │
 ▼
OPTIONAL DOCUMENT UPLOAD
 │
 ▼
PATIENT RECORD
 │
 ▼
BOOK APPOINTMENT
`;

export const CarePulsePatientFlow = () => {
  return (
    <section id="patient-flow" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-900">
        <span className="text-xs font-mono text-emerald-400 font-bold">04</span>
        <span className="text-neutral-600 font-mono text-xs">//</span>
        <h2 className={`${nasalization.className} text-xl sm:text-2xl font-bold tracking-tight text-white uppercase`}>
          PATIENT ONBOARDING FLOW
        </h2>
      </div>

      {/* Narrative */}
      <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
        <p>
          The onboarding workflow decouples base identity creation from detailed clinical registration. First, a lightweight user identity is generated via Appwrite Users API using name, email, and phone. The user is then directed to <code className="text-emerald-400 font-mono text-xs px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800">/patients/[userId]/register</code> to complete clinical history, emergency contacts, insurance information, and identification document uploads persisted securely in Appwrite Storage before booking an appointment.
        </p>
      </div>

      {/* ASCII Workflow Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="PATIENT ONBOARDING PIPELINE"
          badge="DATA TRANSITION FLOW"
          content={PATIENT_FLOW_ASCII}
          caption="Fig 4.1: Two-tier onboarding sequence: User account creation via Appwrite Users followed by comprehensive medical profile persistence in Appwrite Databases."
        />
      </div>

      {/* Step Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
        <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] space-y-1">
          <div className="text-emerald-400 font-bold">STEP 1: USER IDENTITY</div>
          <div className="text-white font-medium text-[11px]">Appwrite Users API</div>
          <p className="text-neutral-400 font-sans text-[11px]">
            Collects primary identifiers (Name, Email, E.164 Phone) and generates a persistent Appwrite <code className="text-neutral-300">userId</code>.
          </p>
        </div>

        <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] space-y-1">
          <div className="text-emerald-400 font-bold">STEP 2: CLINICAL RECORD</div>
          <div className="text-white font-medium text-[11px]">Appwrite Database</div>
          <p className="text-neutral-400 font-sans text-[11px]">
            Gathers past medical history, primary physician, allergies, current medications, emergency contact, and legal consent checkboxes.
          </p>
        </div>

        <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] space-y-1">
          <div className="text-emerald-400 font-bold">STEP 3: IDENTIFICATION VAULT</div>
          <div className="text-white font-medium text-[11px]">Appwrite Storage</div>
          <p className="text-neutral-400 font-sans text-[11px]">
            Converts scanned identification files into multipart form buffers and uploads to Appwrite Storage, saving the file ID directly on the patient document.
          </p>
        </div>
      </div>
    </section>
  );
};
