"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const DATA_FLOW_ASCII = `
PATIENT INPUT
     │
     ▼
PatientForm
     │
     ▼
React Hook Form
     │
     ▼
Zod Validation
     │
     ▼
createUser()
     │
     ▼
Appwrite Users
     │
     ▼
/patients/[userId]/register
     │
     ▼
PatientForm
     │
     ├───────────────┐
     ▼               ▼
Patient Data     Document
     │             Upload
     │               │
     ▼               ▼
Appwrite DB     Appwrite Storage
`;

export const CarePulseDataFlow = () => {
  return (
    <section id="data-flow" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-xl sm:text-2xl font-bold tracking-tight text-white uppercase`}>
          FROM INPUT TO PERSISTED DATA
        </h2>
      </div>

      {/* Narrative */}
      <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
        <p>
          The registration pipeline illustrates the concrete execution path of client data transitioning into persisted cloud records. Input fields are parsed through React Hook Form and validated with Zod before invoking <code className="text-emerald-400 font-mono text-xs px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800">createUser()</code> to initialize the user identity in Appwrite Users. The generated <code className="text-neutral-300 font-mono text-xs">userId</code> routes the patient to full medical profile submission, where document files and structured JSON are saved into Appwrite Storage and Databases in tandem.
        </p>
      </div>

      {/* ASCII Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="END-TO-END PATIENT DATA MUTATION PIPELINE"
          badge="PERSISTENCE FLOW"
          content={DATA_FLOW_ASCII}
          caption="Fig 10.1: Step-by-step data transition: from client-side input through Zod schema evaluation, user identity provisioning, and dual persistence into Appwrite DB and Storage."
        />
      </div>

      {/* Concrete Operations Callouts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
        <div className="p-4 rounded-xl border border-neutral-900 bg-[#09090b] space-y-1.5">
          <div className="text-emerald-400 font-bold">STAGE 1: IDENTITY REGISTRATION</div>
          <div className="text-white font-medium text-[11px]">appwrite.users.create()</div>
          <p className="text-neutral-400 font-sans text-xs">
            Creates an Appwrite user entity, returning a unique <code className="text-neutral-300">$id</code> used to initialize the patient record URL parameter.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-neutral-900 bg-[#09090b] space-y-1.5">
          <div className="text-emerald-400 font-bold">STAGE 2: ATOMIC MULTIPART STORAGE</div>
          <div className="text-white font-medium text-[11px]">appwrite.storage.createFile()</div>
          <p className="text-neutral-400 font-sans text-xs">
            Converts client identification images into multipart binary buffers, persists them to the storage bucket, and writes the resulting storage file ID to the patient document.
          </p>
        </div>
      </div>
    </section>
  );
};
