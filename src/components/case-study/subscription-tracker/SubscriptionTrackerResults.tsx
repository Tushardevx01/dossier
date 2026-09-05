"use client";

import { LuLayers, LuClock, LuRefreshCw, LuShieldCheck, LuCpu, LuCheck } from "react-icons/lu";

export const SubscriptionTrackerResults = () => {
  const metrics = [
    {
      value: "4",
      label: "API Route Domains",
      desc: "Segregated domain routers: /auth, /users, /subscriptions, /workflows.",
      icon: <LuLayers className="w-5 h-5 text-emerald-400" />,
    },
    {
      value: "4",
      label: "Staged Reminder Offsets",
      desc: "Pre-scheduled step notices dispatched at 7, 5, 2, and 1 day(s) before renewal.",
      icon: <LuClock className="w-5 h-5 text-emerald-400" />,
    },
    {
      value: "3",
      label: "Discrete Lifecycle States",
      desc: "Schema-enforced FSM: active, cancelled, and auto-computed expired.",
      icon: <LuRefreshCw className="w-5 h-5 text-emerald-400" />,
    },
    {
      value: "0",
      label: "In-Memory Timer Leaks",
      desc: "100% durable serverless step functions; zero memory held during multi-day sleep.",
      icon: <LuCpu className="w-5 h-5 text-emerald-400" />,
    },
    {
      value: "10",
      label: "Port Conflict Retries",
      desc: "Dynamic EADDRINUSE probing recovers from local port collisions automatically.",
      icon: <LuServerIcon className="w-5 h-5 text-emerald-400" />,
    },
    {
      value: "8000ms",
      label: "Graceful Shutdown Guard",
      desc: "Socket draining window on SIGINT/SIGTERM before forced process exit.",
      icon: <LuShieldCheck className="w-5 h-5 text-emerald-400" />,
    },
  ];

  const outcomes = [
    "Durable reminder schedules survive API restarts, crashes, and serverless teardowns.",
    "Atomic Mongoose sessions guarantee zero orphaned account documents on signup failures.",
    "Pre-save hooks eliminate manual date calculation and prevent renewal drift across all billing cycles.",
    "Arcjet edge integration prevents bot scraping and rate flooding before database queries are initiated.",
  ];

  return (
    <section id="results" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
          <span>15</span>
          <span className="w-8 h-px bg-emerald-500/30" />
          <span>MEASURABLE RESULTS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Verified Implementation Metrics
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Grounded directly in the codebase: concrete specifications verifying architecture resilience,
          scheduling accuracy, and system stability without synthetic benchmarks.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
                {m.value}
              </span>
              <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800">
                {m.icon}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-200">{m.label}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mt-1">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Engineering Outcomes Card */}
      <div className="p-5 sm:p-6 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
        <h3 className="text-sm font-semibold text-white uppercase font-mono tracking-wider">
          Architectural Impact &amp; Engineering Outcomes
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-300">
          {outcomes.map((out, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/80"
            >
              <LuCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{out}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LuServerIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
    <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
    <line x1="6" x2="6.01" y1="6" y2="6" />
    <line x1="6" x2="6.01" y1="18" y2="18" />
  </svg>
);
