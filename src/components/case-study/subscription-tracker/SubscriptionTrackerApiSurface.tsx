"use client";

import { LuCircleCheck, LuClock } from "react-icons/lu";

export const SubscriptionTrackerApiSurface = () => {
  const implementedEndpoints = [
    {
      method: "POST",
      path: "/api/v1/auth/sign-up",
      auth: "Public / Arcjet",
      desc: "Registers new account within a Mongoose session transaction; hashes password with bcrypt and issues JWT.",
    },
    {
      method: "POST",
      path: "/api/v1/auth/sign-in",
      auth: "Public / Arcjet",
      desc: "Validates email and password hash; returns authenticated user profile and signed bearer token.",
    },
    {
      method: "POST",
      path: "/api/v1/auth/sign-out",
      auth: "Public / Arcjet",
      desc: "Terminates client auth session and confirms logout state.",
    },
    {
      method: "POST",
      path: "/api/v1/subscriptions",
      auth: "Bearer JWT",
      desc: "Creates subscription, executes pre-save renewal calculation hook, and triggers Upstash reminder workflow.",
    },
    {
      method: "GET",
      path: "/api/v1/subscriptions/user/:id",
      auth: "Bearer JWT (Ownership)",
      desc: "Returns subscriptions for a specific user ID. Strictly checks req.user.id === req.params.id to block tenant leaks.",
    },
    {
      method: "POST",
      path: "/api/v1/workflows/subscription/reminder",
      auth: "Upstash Signature",
      desc: "Durable step function endpoint; orchestrates 7d, 5d, 2d, 1d sleep cycles and dispatches Nodemailer alerts.",
    },
  ];

  const stagedEndpoints = [
    {
      method: "GET",
      path: "/api/v1/subscriptions",
      status: "Router Defined",
      desc: "Global query endpoint for administrative subscription filtering.",
    },
    {
      method: "GET",
      path: "/api/v1/subscriptions/:id",
      status: "Router Defined",
      desc: "Retrieve granular details for a single subscription document.",
    },
    {
      method: "PUT",
      path: "/api/v1/subscriptions/:id",
      status: "Router Defined",
      desc: "Update subscription metadata (price, paymentMethod, frequency).",
    },
    {
      method: "DELETE",
      path: "/api/v1/subscriptions/:id",
      status: "Router Defined",
      desc: "Purge subscription record from database.",
    },
    {
      method: "PUT",
      path: "/api/v1/subscriptions/:id/cancel",
      status: "Router Defined",
      desc: "Explicit user endpoint to transition status to 'cancelled'.",
    },
    {
      method: "GET",
      path: "/api/v1/subscriptions/upcoming-renewals",
      status: "Router Defined",
      desc: "Query filter for subscriptions renewing within a given timeframe.",
    },
    {
      method: "GET",
      path: "/api/v1/users & /:id",
      status: "Router Defined",
      desc: "User query endpoints for administrative and profile management.",
    },
  ];

  return (
    <section id="api-surface" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          RESTful API Endpoints &amp; Routing Topology
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          To maintain transparency, this breakdown distinguishes between active production endpoints
          with verified controller implementations and scaffolded router placeholders in the repository.
        </p>
      </div>

      {/* Implemented Endpoints */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LuCircleCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white uppercase font-mono tracking-wider">
              Implemented Production Endpoints
            </h3>
          </div>
          <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
            Active Controllers
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-neutral-900/80 border-b border-neutral-800 font-mono text-neutral-400 uppercase">
              <tr>
                <th className="py-3 px-4 font-semibold">Method</th>
                <th className="py-3 px-4 font-semibold">Endpoint Path</th>
                <th className="py-3 px-4 font-semibold">Authorization &amp; Guard</th>
                <th className="py-3 px-4 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 font-sans">
              {implementedEndpoints.map((ep, idx) => (
                <tr key={idx} className="hover:bg-neutral-900/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[11px] whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded ${
                        ep.method === "POST"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      }`}
                    >
                      {ep.method}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-white text-[11px] whitespace-nowrap">
                    {ep.path}
                  </td>
                  <td className="py-3 px-4 font-mono text-neutral-400 text-[11px] whitespace-nowrap">
                    {ep.auth}
                  </td>
                  <td className="py-3 px-4 text-neutral-400 leading-relaxed max-w-md">
                    {ep.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Staged / Router Defined Endpoints */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LuClock className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-white uppercase font-mono tracking-wider">
              Scaffolded Router Definitions in Repo
            </h3>
          </div>
          <span className="font-mono text-xs text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
            Route Architecture Staged
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-neutral-900/80 border-b border-neutral-800 font-mono text-neutral-400 uppercase">
              <tr>
                <th className="py-3 px-4 font-semibold">Method</th>
                <th className="py-3 px-4 font-semibold">Endpoint Path</th>
                <th className="py-3 px-4 font-semibold">Status in Codebase</th>
                <th className="py-3 px-4 font-semibold">Intended Functionality</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 font-sans">
              {stagedEndpoints.map((ep, idx) => (
                <tr key={idx} className="hover:bg-neutral-900/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[11px] whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                      {ep.method}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-neutral-300 text-[11px] whitespace-nowrap">
                    {ep.path}
                  </td>
                  <td className="py-3 px-4 font-mono text-amber-400/90 text-[11px] whitespace-nowrap">
                    {ep.status}
                  </td>
                  <td className="py-3 px-4 text-neutral-400 leading-relaxed max-w-md">
                    {ep.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
