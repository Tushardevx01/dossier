"use client";

export const SubscriptionTrackerProblem = () => {
  return (
    <section id="problem" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Subscription Tracking Demands Rigorous Backend Architecture
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Subscription tracking looks deceptively simple at the UI layer, but the backend must
          reliably orchestrate multi-tenant ownership, recurring renewal dates, background scheduling,
          API defense, and server resilience.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Bullet List */}
        <div className="lg:col-span-6 space-y-2.5 font-mono text-xs text-neutral-300">
          <div className="flex items-start gap-2">
            <span className="text-emerald-400">•</span>
            <span><strong className="text-white">Authenticated user data:</strong> Strict JWT resolution on private routes.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-400">•</span>
            <span><strong className="text-white">Subscription ownership:</strong> Enforcing matching account IDs on data access.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-400">•</span>
            <span><strong className="text-white">Recurring renewal dates:</strong> Pre-save calculation across daily/weekly/monthly/yearly cycles.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-400">•</span>
            <span><strong className="text-white">Lifecycle states:</strong> Automatic transition between active, cancelled, and expired.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-400">•</span>
            <span><strong className="text-white">Automated reminders:</strong> Decoupling long sleep intervals from request threads.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-400">•</span>
            <span><strong className="text-white">API abuse protection:</strong> Guarding routes against bots and rate flooding via Arcjet.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-400">•</span>
            <span><strong className="text-white">Reliable server lifecycle:</strong> Dynamic port fallback and graceful process termination.</span>
          </div>
        </div>

        {/* ASCII Problem Flow */}
        <div className="lg:col-span-6 p-4 sm:p-5 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto">
          <pre className="leading-relaxed">
{`USER
 │
 ▼
SUBSCRIPTION DATA
 │
 ├── COST
 ├── FREQUENCY (daily / weekly / monthly / yearly)
 ├── RENEWAL DATE (auto-calculated)
 ├── PAYMENT METHOD
 └── STATUS (active / cancelled / expired)
        │
        ▼
AUTOMATED REMINDER (7d / 5d / 2d / 1d)
        │
        ▼
EMAIL (Nodemailer HTML template)`}
          </pre>
        </div>
      </div>
    </section>
  );
};
