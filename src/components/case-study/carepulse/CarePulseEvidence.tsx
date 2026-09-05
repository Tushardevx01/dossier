"use client";

import { nasalization } from "@/app/fonts";
import { LuFileCode } from "react-icons/lu";

const REPO_EVIDENCE = [
  {
    category: "SERVER ACTIONS",
    files: [
      { name: "lib/actions/appointment.actions.ts", desc: "createAppointment, updateAppointment, getRecentAppointmentList, sendSMSNotification" },
      { name: "lib/actions/patient.actions.ts", desc: "createUser, getUser, registerPatient, getPatient" },
    ],
  },
  {
    category: "VALIDATION ENGINE",
    files: [
      { name: "lib/validation.ts", desc: "UserFormValidation, PatientFormValidation, CreateAppointmentSchema, ScheduleAppointmentSchema, CancelAppointmentSchema" },
    ],
  },
  {
    category: "BACKEND CONFIGURATION",
    files: [
      { name: "lib/appwrite.config.ts", desc: "Appwrite Client, Databases, Users, Storage, and Messaging SDK initializations" },
    ],
  },
  {
    category: "ADMIN CONTROL WORKFLOW",
    files: [
      { name: "app/admin/page.tsx", desc: "Appointment metric stat cards, data table hydration, and server-side authentication check" },
      { name: "components/PasskeyModal.tsx", desc: "Six-digit OTP dialog managing encrypted admin passkey verification in localStorage" },
    ],
  },
  {
    category: "PATIENT WORKFLOW FORMS",
    files: [
      { name: "components/forms/PatientForm.tsx", desc: "Multi-field controlled clinical registration with custom input primitives and masked phone inputs" },
      { name: "components/forms/AppointmentForm.tsx", desc: "Polymorphic appointment dialog supporting create, schedule, and cancel modes" },
    ],
  },
];

export const CarePulseEvidence = () => {
  return (
    <section id="evidence" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-xl sm:text-2xl font-bold tracking-tight text-white uppercase`}>
          ENGINEERING EVIDENCE
        </h2>
      </div>

      {/* Narrative */}
      <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
        <p>
          Every architectural claim in this case study is grounded in concrete repository source files. The codebase demonstrates clear modularity, strict separation of concerns, and typed boundaries across server actions, validation schemas, and UI components.
        </p>
      </div>

      {/* Evidence Grid */}
      <div className="space-y-4 pt-2 font-mono text-xs">
        {REPO_EVIDENCE.map((item) => (
          <div
            key={item.category}
            className="p-4 rounded-xl border border-neutral-800/80 bg-[#09090b] space-y-3"
          >
            <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
              <span className="text-emerald-400 font-bold text-xs">{item.category}</span>
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider">REPOSITORY VERIFIED</span>
            </div>

            <div className="space-y-2">
              {item.files.map((f) => (
                <div
                  key={f.name}
                  className="p-2.5 rounded-lg bg-black border border-neutral-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <LuFileCode className="w-4 h-4 text-neutral-500 shrink-0" />
                    <code className="text-neutral-200 text-xs font-mono font-medium">{f.name}</code>
                  </div>
                  <span className="text-neutral-500 text-[11px] font-sans truncate max-w-md sm:text-right">
                    {f.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
