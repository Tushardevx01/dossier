"use client";

import { LuCalendar, LuCircleCheck, LuCircleX, LuCircleAlert } from "react-icons/lu";

export const SubscriptionTrackerLifecycle = () => {
  const states = [
    {
      state: "active",
      badge: "DEFAULT STATE",
      icon: <LuCircleCheck className="w-5 h-5 text-emerald-400" />,
      color: "border-emerald-500/20 bg-emerald-500/5 text-emerald-400",
      description: "Assigned upon initial creation. Pre-save hook calculates the initial renewalDate. Upstash Workflow queues automated reminder step functions.",
    },
    {
      state: "cancelled",
      badge: "USER TERMINATED",
      icon: <LuCircleX className="w-5 h-5 text-rose-400" />,
      color: "border-rose-500/20 bg-rose-500/5 text-rose-400",
      description: "Triggered when a subscriber flags a service for cancellation. Workflow step functions verify state prior to dispatch and safely abort reminder delivery.",
    },
    {
      state: "expired",
      badge: "AUTO DETECTED",
      icon: <LuCircleAlert className="w-5 h-5 text-amber-400" />,
      color: "border-amber-500/20 bg-amber-500/5 text-amber-400",
      description: "Automatically flipped when renewalDate lapses (renewalDate < new Date()). Prevents outdated subscriptions from clogging active queries.",
    },
  ];

  const frequencies = [
    { freq: "daily", days: 1, useCase: "Micro-subscriptions, short passes, daily news feeds" },
    { freq: "weekly", days: 7, useCase: "Meal prep boxes, weekly software licenses, trial extensions" },
    { freq: "monthly", days: 30, useCase: "Standard SaaS subscriptions, cloud servers, streaming media" },
    { freq: "yearly", days: 365, useCase: "Annual enterprise tooling, domain renewals, annual memberships" },
  ];

  return (
    <section id="lifecycle" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Deterministic State Transitions &amp; Cycle Intervals
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          A subscription moves through a finite state machine governed by user actions, pre-save schema
          evaluation, and time expiration checks.
        </p>
      </div>

      {/* State Machine ASCII */}
      <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto">
        <div className="flex items-center justify-between text-neutral-400 border-b border-neutral-800 pb-2 mb-3">
          <span>FINITE STATE TRANSITION MACHINE</span>
          <span className="text-emerald-400">LIFECYCLE FLOW</span>
        </div>
        <pre className="leading-relaxed">
{`                  [ POST /api/v1/subscriptions ]
                                │
                                ▼ (Pre-save hook calculates renewalDate)
                 ┌─────────────────────────────┐
                 │       status: 'active'      │
                 └──────────────┬──────────────┘
                                │
         ┌──────────────────────┼──────────────────────┐
         │                      │                      │
         ▼ (User cancellation)  ▼ (renewalDate < now)  ▼ (Workflow execution)
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────────────────────┐
│ status:         │    │ status:         │    │  Validate status === 'active'   │
│   'cancelled'   │    │   'expired'     │    │  If inactive ──▶ Abort Reminder │
└─────────────────┘    └─────────────────┘    └─────────────────────────────────┘`}
        </pre>
      </div>

      {/* States Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {states.map((st) => (
          <div
            key={st.state}
            className={`p-5 rounded-xl border ${st.color} space-y-3 flex flex-col justify-between`}
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold tracking-wider uppercase">
                  {st.badge}
                </span>
                {st.icon}
              </div>
              <h3 className="text-lg font-bold text-white uppercase font-mono">
                status: &apos;{st.state}&apos;
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">{st.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Frequencies Table */}
      <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
        <div className="flex items-center gap-2">
          <LuCalendar className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-semibold text-white">
            Pre-Save Frequency Offsets (renewalPeriods)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {frequencies.map((f) => (
            <div
              key={f.freq}
              className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-emerald-400 font-bold uppercase">{f.freq}</span>
                <span className="font-mono text-neutral-400">+{f.days} day(s)</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-snug">{f.useCase}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
