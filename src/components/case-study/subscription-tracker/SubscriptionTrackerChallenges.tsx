"use client";

import { LuClock, LuDatabase, LuCalendar, LuShieldAlert, LuServer } from "react-icons/lu";

export const SubscriptionTrackerChallenges = () => {
  const challenges = [
    {
      icon: <LuClock className="w-5 h-5 text-amber-400" />,
      title: "1. Fragile Timers vs Durable Scheduling",
      problem: "In-memory setTimeout or local node-cron instances drop pending reminder states whenever the server restarts, and scaling to multi-instance setups causes duplicate email dispatching.",
      impact: "Missed renewal notifications or redundant spam to paying users.",
    },
    {
      icon: <LuDatabase className="w-5 h-5 text-amber-400" />,
      title: "2. Atomic Registration Without Orphan Records",
      problem: "User creation requires validation, duplicate checking, bcrypt hashing, and database writes. Any downstream failure could leave inconsistent partial state without transactional isolation.",
      impact: "Corrupted auth tables and phantom accounts that block subsequent registration attempts.",
    },
    {
      icon: <LuCalendar className="w-5 h-5 text-amber-400" />,
      title: "3. Renewal Date Drift Across Billing Cycles",
      problem: "Subscriptions span daily, weekly, monthly, and yearly cadences. Relying on client payloads allows malicious or drift-prone renewal dates, keeping expired items active indefinitely.",
      impact: "Mismatched billing cycles and invalid reminder trigger windows.",
    },
    {
      icon: <LuShieldAlert className="w-5 h-5 text-amber-400" />,
      title: "4. API Abuse & Credential Stuffing at the Edge",
      problem: "Public authentication and subscription creation routes are vulnerable to automated bot scans, credential stuffing, and rapid burst flooding before application logic executes.",
      impact: "Database connection pool exhaustion and unauthorized API utilization.",
    },
    {
      icon: <LuServer className="w-5 h-5 text-amber-400" />,
      title: "5. Port Collisions & Abrupt Process Termination",
      problem: "Node servers crash on EADDRINUSE if another service binds the target port. Furthermore, unhandled SIGINT/SIGTERM abruptly severs active HTTP connections without closing database handles.",
      impact: "Deployment boot failures and dropped in-flight client requests.",
    },
  ];

  return (
    <section id="challenges" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Architectural Bottlenecks in Recurring Systems
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Recurring subscription management introduces operational edge cases that simple CRUD
          scaffolding cannot withstand. Here are the five core engineering challenges addressed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {challenges.map((c, i) => (
          <div
            key={i}
            className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="p-2 w-fit rounded-lg bg-amber-500/10 border border-amber-500/20">
                {c.icon}
              </div>
              <h3 className="text-base font-semibold text-white">{c.title}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">{c.problem}</p>
            </div>
            <div className="pt-3 border-t border-neutral-800/80">
              <span className="font-mono text-[11px] text-amber-400 font-medium">Impact: </span>
              <span className="text-xs text-neutral-300">{c.impact}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
