"use client";

import { LuCircleCheck } from "react-icons/lu";

export const SubscriptionTrackerSummary = () => {
  const takeaways = [
    {
      title: "Decoupled Time from Compute",
      desc: "By delegating multi-day reminder intervals to Upstash Workflow step functions, the API eliminated in-memory timers and heavy recurring cron queries.",
    },
    {
      title: "Defensive Data Layer",
      desc: "Mongoose pre-save hooks automate date math and expiration transitions directly at the schema layer, guaranteeing that business rules cannot be bypassed.",
    },
    {
      title: "Zero-Orphan ACID Guarantees",
      desc: "Using MongoDB session transactions during registration ensures that partially written accounts are cleanly rolled back if hashing or token creation encounters errors.",
    },
    {
      title: "Hardened Gateway & Server Lifecycle",
      desc: "Combining Arcjet edge bot mitigation, JWT route protection, dynamic port recovery, and graceful socket draining yields a production-ready API foundation.",
    },
  ];

  return (
    <section id="summary" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          From Request to Reminder: Architectural Synthesis
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          A recap of how modern backend engineering principles transform simple recurring subscription
          tracking into a robust, tamper-resistant system.
        </p>
      </div>

      {/* Synthesis Flow ASCII */}
      <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto space-y-3">
        <div className="flex items-center justify-between text-neutral-400 border-b border-neutral-800 pb-2">
          <span>COMPLETE REQUEST-TO-REMINDER EXECUTION PATH</span>
          <span className="text-emerald-400">SYSTEM RECAP</span>
        </div>
        <pre className="leading-relaxed">
{`+──────────────────+      +──────────────────+      +──────────────────────────+
│  Client Request  │ ──▶  │  Arcjet Shield   │ ──▶  │  JWT Auth & Ownership    │
│  (REST API Call) │      │  (Bot/Rate 429)  │      │  (Token & User Verify)   │
+──────────────────+      +──────────────────+      +─────────────┬────────────+
                                                                  │
                                                                  ▼
+──────────────────+      +──────────────────+      +──────────────────────────+
│  Nodemailer SMTP │ ◀──  │ Upstash Workflow │ ◀──  │  Mongoose Pre-Save Hook  │
│  (HTML Dispatch) │      │ (QStash Sleeps)  │      │  (Date Math & Expire)    │
+──────────────────+      +──────────────────+      +──────────────────────────+`}
        </pre>
      </div>

      {/* Core Takeaways Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {takeaways.map((t, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2.5"
          >
            <div className="flex items-center gap-2">
              <LuCircleCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <h3 className="text-sm font-semibold text-white">{t.title}</h3>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed pl-6">{t.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
