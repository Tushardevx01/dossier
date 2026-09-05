"use client";

import { LuCpu, LuDatabase, LuWorkflow, LuShieldCheck, LuMail } from "react-icons/lu";

export const SubscriptionTrackerDecisions = () => {
  const decisions = [
    {
      tech: "Node.js (ESM) + Express 4",
      icon: <LuCpu className="w-5 h-5 text-emerald-400" />,
      choice: "Standardized on native ES Modules ('type': 'module') with Express 4.21.2.",
      why: "Delivers a lightweight, un-opinionated middleware pipeline with minimal bootstrap latency and native async/await error propagation.",
      alternative: "NestJS or Fastify was considered, but Express allowed tighter custom middleware composition with Arcjet and Upstash.",
    },
    {
      tech: "MongoDB Atlas + Mongoose 8",
      icon: <LuDatabase className="w-5 h-5 text-emerald-400" />,
      choice: "Document data model with Mongoose schema validation, indexes, and session transactions.",
      why: "Subscriptions exhibit varying metadata (categories, frequencies, currencies). Mongoose pre-save hooks centralize date math, and sessions guarantee ACID atomicity on registration.",
      alternative: "PostgreSQL was evaluated, but MongoDB's schema flexibility and rapid document referencing provided faster iteration with zero migration friction.",
    },
    {
      tech: "Upstash Workflow Step Engine",
      icon: <LuWorkflow className="w-5 h-5 text-emerald-400" />,
      choice: "Integrated @upstash/workflow/express for serverless durable step functions.",
      why: "Replaces fragile local cron jobs or in-memory setTimeout. Workflow state persists across container restarts and sleeps multi-day durations with zero server CPU/RAM usage.",
      alternative: "BullMQ or Celery requires dedicated Redis infrastructure and worker daemon orchestration; Upstash is fully serverless and durable.",
    },
    {
      tech: "Arcjet Edge Security Layer",
      icon: <LuShieldCheck className="w-5 h-5 text-emerald-400" />,
      choice: "Configured @arcjet/node middleware to intercept all inbound HTTP traffic.",
      why: "Protects signup, login, and creation routes from bot floods and rate exhaustion before any expensive database queries or hashing operations are invoked.",
      alternative: "Custom express-rate-limit with Redis requires maintaining cache instances and lacks intelligent bot fingerprinting.",
    },
    {
      tech: "Nodemailer SMTP Transporter",
      icon: <LuMail className="w-5 h-5 text-emerald-400" />,
      choice: "Configured Nodemailer with dynamic HTML template generation.",
      why: "Direct SMTP integration allows immediate, customized transactional email dispatch containing subscription name, price, renewal date, and days remaining.",
      alternative: "Third-party transactional APIs (SendGrid/Resend) introduce vendor lock-in; SMTP transporter provides portable email delivery.",
    },
  ];

  return (
    <section id="decisions" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Why These Technologies?
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Engineering trade-offs made to ensure scalability, data integrity, and operational simplicity
          without unnecessary infrastructure overhead.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {decisions.map((d, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800">
                    {d.icon}
                  </div>
                  <h3 className="text-base font-semibold text-white">{d.tech}</h3>
                </div>
              </div>

              <div className="space-y-2 text-xs leading-relaxed">
                <div>
                  <span className="text-neutral-400 font-mono text-[11px] uppercase">Decision: </span>
                  <span className="text-neutral-200">{d.choice}</span>
                </div>
                <div>
                  <span className="text-emerald-400 font-mono text-[11px] uppercase">Rationale: </span>
                  <span className="text-neutral-300">{d.why}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-800 text-[11px] text-neutral-400">
              <span className="text-neutral-500 font-mono uppercase">Alternative Trade-off: </span>
              <span>{d.alternative}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
