"use client";

import { LuLayers, LuCircleCheck, LuWorkflow, LuShieldCheck, LuServer } from "react-icons/lu";

export const SubscriptionTrackerApproach = () => {
  const pillars = [
    {
      icon: <LuLayers className="w-5 h-5 text-emerald-400" />,
      title: "Modular Domain Architecture",
      desc: "Segregated Express routes, controllers, and middleware across auth, user, subscription, and workflow domains with centralized error handling.",
    },
    {
      icon: <LuCircleCheck className="w-5 h-5 text-emerald-400" />,
      title: "Schema-Enforced State & Lifecycle",
      desc: "Mongoose pre-save hooks automatically compute next renewal dates across variable billing frequencies and auto-transition lapsed subscriptions to expired.",
    },
    {
      icon: <LuShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: "Two-Tier Security Pipeline",
      desc: "Arcjet middleware acts as an edge defense layer against bot attacks and rate bursts before requests reach JWT signature verification and ownership checks.",
    },
    {
      icon: <LuWorkflow className="w-5 h-5 text-emerald-400" />,
      title: "Durable Background Workflows",
      desc: "Offloaded reminder schedules to Upstash Workflow step functions, eliminating memory leaks from long-lived timers and fragile in-process cron jobs.",
    },
    {
      icon: <LuServer className="w-5 h-5 text-emerald-400" />,
      title: "Production-Grade Process Management",
      desc: "Engineered automatic port conflict resolution (EADDRINUSE retry) and zero-downtime graceful shutdown with connection draining and fallback forced exit.",
    },
  ];

  return (
    <section id="approach" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
          <span>02</span>
          <span className="w-8 h-px bg-emerald-500/30" />
          <span>THE APPROACH</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          A Resilient, Layered Backend Foundation
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Instead of building an ad-hoc CRUD script, the system was designed around five defensive
          principles: modular domain routing, deterministic data hooks, multi-layered security, durable
          step functions, and reliable server lifecycle control.
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pillars.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors space-y-2.5"
          >
            <div className="p-2 w-fit rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              {item.icon}
            </div>
            <h3 className="text-base font-semibold text-white">{item.title}</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* End-to-End Pipeline ASCII */}
      <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto space-y-3">
        <div className="flex items-center justify-between text-neutral-400 border-b border-neutral-800 pb-2">
          <span>END-TO-END EXECUTION PIPELINE</span>
          <span className="text-emerald-400">DURABLE ARCHITECTURE</span>
        </div>
        <pre className="leading-relaxed">
{`CLIENT REQUEST
      │
      ▼
[1. Arcjet Defense]       ──▶ Evaluates IP, Bot Shield & Token Bucket (403/429 if denied)
      │ (allowed)
      ▼
[2. JWT Authentication]   ──▶ Verifies Bearer Token, extracts User payload (401 if invalid)
      │ (authenticated)
      ▼
[3. Domain Controller]    ──▶ Validates payload & runs business logic
      │
      ▼
[4. Mongoose Pre-Save]    ──▶ Auto-calculates renewalDate from startDate + frequency
      │                       Auto-transitions expired subscriptions
      ▼
[5. Database Persistence] ──▶ Atomic write / transaction commit in MongoDB Atlas
      │
      ▼
[6. Upstash Workflow]     ──▶ Schedules durable step function:
      │                       sleepUntil(7d, 5d, 2d, 1d) without holding server memory
      ▼
[7. Nodemailer Delivery]  ──▶ Dispatches personalized HTML reminder email to subscriber`}
        </pre>
      </div>
    </section>
  );
};
