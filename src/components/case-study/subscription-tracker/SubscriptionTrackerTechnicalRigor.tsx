"use client";

import { LuShieldCheck } from "react-icons/lu";

export const SubscriptionTrackerTechnicalRigor = () => {
  const rigorItems = [
    {
      area: "Database Transactionality",
      impl: "Mongoose Session Transactions",
      rigor: "Uses startSession() and startTransaction() during user sign-up. Guarantees ACID atomicity and explicit rollback via abortTransaction() if bcrypt hashing or user creation fails.",
      evidence: "controllers/auth.controller.js",
    },
    {
      area: "Lifecycle Automation",
      impl: "Mongoose Pre-Save Schema Hooks",
      rigor: "Automatically calculates renewalDate based on frequency mapping (daily: 1, weekly: 7, monthly: 30, yearly: 365). Automatically flips status to 'expired' if renewalDate has lapsed.",
      evidence: "models/subscription.model.js",
    },
    {
      area: "Durable Background Tasks",
      impl: "Upstash Workflow Step Functions",
      rigor: "Replaced volatile in-memory setTimeout with QStash-backed durable step functions. context.sleepUntil() suspends execution across days without thread blocking or memory leaks.",
      evidence: "controllers/workflow.controller.js",
    },
    {
      area: "Edge Threat Mitigation",
      impl: "Arcjet Bot & Rate Defense",
      rigor: "Pre-middleware executes aj.protect() on all inbound traffic. Discerns rate limits (429) from bot attacks (403) before requests consume database or server resources.",
      evidence: "middlewares/arcjet.middleware.js",
    },
    {
      area: "Authorization & Ownership",
      impl: "JWT Middleware + Ownership Guard",
      rigor: "Bearer token signature verification via jsonwebtoken. Controllers cross-examine req.user.id against route parameters to reject multi-tenant data leaks.",
      evidence: "middlewares/auth.middleware.js",
    },
    {
      area: "Process Stability",
      impl: "Port Probing & Graceful Teardown",
      rigor: "Tests port availability across 10 sequential attempts to recover from EADDRINUSE collisions. Intercepts SIGINT/SIGTERM, drains active sockets, and forces exit after 8000ms.",
      evidence: "app.js",
    },
  ];

  return (
    <section id="rigor" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
          <span>07</span>
          <span className="w-8 h-px bg-emerald-500/30" />
          <span>TECHNICAL RIGOR</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Verified Implementation Matrix
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Every architecture choice is grounded in the actual codebase. This matrix details the exact
          mechanisms protecting data consistency, server resources, and API boundaries.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950">
        <table className="w-full text-left text-xs text-neutral-300">
          <thead className="bg-neutral-900/80 border-b border-neutral-800 font-mono text-neutral-400 uppercase">
            <tr>
              <th className="py-3.5 px-4 font-semibold">Architectural Area</th>
              <th className="py-3.5 px-4 font-semibold">Repository Implementation</th>
              <th className="py-3.5 px-4 font-semibold">Engineering Defense &amp; Rigor</th>
              <th className="py-3.5 px-4 font-semibold">Source File</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60 font-sans">
            {rigorItems.map((item, idx) => (
              <tr key={idx} className="hover:bg-neutral-900/40 transition-colors">
                <td className="py-3 px-4 font-semibold text-white whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <LuShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item.area}</span>
                  </div>
                </td>
                <td className="py-3 px-4 font-mono text-emerald-400 text-[11px] whitespace-nowrap">
                  {item.impl}
                </td>
                <td className="py-3 px-4 text-neutral-400 leading-relaxed max-w-md">
                  {item.rigor}
                </td>
                <td className="py-3 px-4 font-mono text-[11px] text-neutral-400 whitespace-nowrap">
                  <code>{item.evidence}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
