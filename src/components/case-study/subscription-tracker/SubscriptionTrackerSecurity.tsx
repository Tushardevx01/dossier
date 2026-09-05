"use client";

import { LuShieldCheck, LuShieldAlert, LuKey, LuUserCheck } from "react-icons/lu";

export const SubscriptionTrackerSecurity = () => {
  const securityLayers = [
    {
      num: "01",
      icon: <LuShieldAlert className="w-5 h-5 text-emerald-400" />,
      title: "Arcjet Edge Defense",
      middleware: "middlewares/arcjet.middleware.js",
      desc: "Intercepts all requests before route matching. Detects automated scrapers, malicious bots, and rate limit exhaustion, returning 403 or 429 without database touch.",
      checks: ["Token bucket rate limiting", "Bot signature detection", "IP reputation evaluation"],
    },
    {
      num: "02",
      icon: <LuKey className="w-5 h-5 text-emerald-400" />,
      title: "Stateless JWT Authentication",
      middleware: "middlewares/auth.middleware.js",
      desc: "Guards private API routes by verifying Bearer JWT signatures against JWT_SECRET. Confirms cryptographic integrity and user existence before proceeding.",
      checks: ["HMAC-SHA256 signature verification", "Token expiration enforcement", "Payload user hydration into req.user"],
    },
    {
      num: "03",
      icon: <LuUserCheck className="w-5 h-5 text-emerald-400" />,
      title: "Multi-Tenant Ownership Guard",
      middleware: "controllers/subscription.controller.js",
      desc: "Enforces strict tenant isolation by checking that the authenticated req.user.id strictly matches the URL resource parameter req.params.id.",
      checks: ["Direct tenant ID comparison", "Blocks ID enumeration vulnerabilities", "Throws explicit 401 unauthorized on mismatch"],
    },
  ];

  return (
    <section id="security" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
          <span>14</span>
          <span className="w-8 h-px bg-emerald-500/30" />
          <span>SECURITY LAYER</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Three-Tier Defensive Perimeter
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Security is enforced in depth: automated bot threats are stopped at the edge, invalid tokens
          are rejected at the route level, and cross-tenant access is blocked at the controller.
        </p>
      </div>

      {/* Security Barrier ASCII */}
      <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto space-y-3">
        <div className="flex items-center justify-between text-neutral-400 border-b border-neutral-800 pb-2">
          <span>DEFENSIVE PIPELINE TOPOLOGY</span>
          <span className="text-emerald-400">DEFENSE IN DEPTH</span>
        </div>
        <pre className="leading-relaxed">
{`INCOMING REQUEST
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│ TIER 1: ARCJET EDGE SHIELD (Global Middleware)             │
│ • Bot Detected?         ──▶ 403 Forbidden                   │
│ • Rate Limit Exceeded?  ──▶ 429 Too Many Requests           │
└──────────────────────────────┬──────────────────────────────┘
                               │ (Allowed)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ TIER 2: JWT BEARER AUTHENTICATION (Route Guard)             │
│ • Missing Bearer Token? ──▶ 401 Unauthorized                │
│ • Invalid Signature?    ──▶ 401 Unauthorized                │
│ • User Not Found?       ──▶ 401 Unauthorized                │
└──────────────────────────────┬──────────────────────────────┘
                               │ (Authenticated: req.user attached)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ TIER 3: RESOURCE OWNERSHIP (Domain Controller)              │
│ • req.user.id !== req.params.id? ──▶ 401 Unauthorized       │
│ • Valid Owner?          ──▶ Proceed to Database Query       │
└─────────────────────────────────────────────────────────────┘`}
        </pre>
      </div>

      {/* 3 Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {securityLayers.map((layer) => (
          <div
            key={layer.num}
            className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-emerald-400">TIER {layer.num}</span>
                <div className="p-1.5 rounded-md bg-neutral-900 border border-neutral-800">
                  {layer.icon}
                </div>
              </div>
              <h3 className="text-base font-semibold text-white">{layer.title}</h3>
              <p className="font-mono text-[11px] text-neutral-400">{layer.middleware}</p>
              <p className="text-xs text-neutral-400 leading-relaxed">{layer.desc}</p>
            </div>

            <div className="pt-3 border-t border-neutral-800 space-y-1.5">
              {layer.checks.map((chk, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[11px] text-neutral-300">
                  <LuShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{chk}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
