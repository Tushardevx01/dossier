"use client";

import { LuDatabase, LuKey, LuCalendar, LuCheck } from "react-icons/lu";

export const SubscriptionTrackerDataModel = () => {
  return (
    <section id="data-model" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
          <span>04</span>
          <span className="w-8 h-px bg-emerald-500/30" />
          <span>DATA MODEL</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Schema Integrity &amp; Automated Pre-Save Hooks
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Mongoose schemas enforce strict type validation, enum restrictions, and reference indexing.
          Pre-save hooks eliminate manual date math by deterministically computing renewal intervals.
        </p>
      </div>

      {/* Relational ASCII Diagram */}
      <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto">
        <div className="flex items-center justify-between text-neutral-400 border-b border-neutral-800 pb-2 mb-3">
          <span>MONGOOSE ENTITY RELATIONSHIP MODEL</span>
          <span className="text-emerald-400">1:N RELATIONSHIP</span>
        </div>
        <pre className="leading-relaxed">
{`┌───────────────────────────────────────┐
│              User Model               │
├───────────────────────────────────────┤
│ _id: ObjectId (PK, auto)              │
│ name: String (2-50 chars, trim)       │
│ email: String (unique, trim, regex)   │ ──┐
│ password: String (bcrypt hash, min 6) │   │
│ createdAt: Date                       │   │ 1 : N Reference
│ updatedAt: Date                       │   │
└───────────────────────────────────────┘   │
                                            │
                                            ▼
┌────────────────────────────────────────────────────────────────────────┐
│                          Subscription Model                            │
├────────────────────────────────────────────────────────────────────────┤
│ _id: ObjectId (PK, auto)                                               │
│ user: ObjectId (FK ──▶ User._id, indexed: true, required)             │
│ name: String (2-100 chars, trim)                                       │
│ price: Number (min: 0, max: 1000)                                      │
│ currency: String (enum: ['USD', 'EUR', 'GBP'], default: 'USD')         │
│ frequency: String (enum: ['daily', 'weekly', 'monthly', 'yearly'])     │
│ category: String (enum: sports, tech, entertainment, finance, ...)     │
│ paymentMethod: String (required, trim)                                 │
│ status: String (enum: ['active', 'cancelled', 'expired'])              │
│ startDate: Date (required, validation: <= current date)               │
│ renewalDate: Date (auto-calculated via pre-save hook)                  │
│ createdAt: Date, updatedAt: Date                                       │
└────────────────────────────────────────────────────────────────────────┘`}
        </pre>
      </div>

      {/* Schema Deep Dives Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Schema Card */}
        <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <LuKey className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">User Schema (user.model.js)</h3>
              <p className="text-xs text-neutral-400 font-mono">Collection: users</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-lg bg-neutral-900/70 border border-neutral-800 space-y-1">
              <div className="font-mono text-emerald-400 font-semibold">email: String</div>
              <p className="text-neutral-400">
                Guaranteed uniqueness via unique index. Lowercased, whitespace trimmed, and validated against standard email regex format.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-neutral-900/70 border border-neutral-800 space-y-1">
              <div className="font-mono text-emerald-400 font-semibold">password: String</div>
              <p className="text-neutral-400">
                Minimum 6 characters. Never stored in plaintext; salted and hashed via <code className="text-neutral-200">bcryptjs.hash()</code> during registration transactions.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-neutral-900/70 border border-neutral-800 space-y-1">
              <div className="font-mono text-emerald-400 font-semibold">timestamps: true</div>
              <p className="text-neutral-400">
                Auto-generates ISO-8601 <code className="text-neutral-200">createdAt</code> and <code className="text-neutral-200">updatedAt</code> metadata.
              </p>
            </div>
          </div>
        </div>

        {/* Subscription Schema Card */}
        <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <LuDatabase className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Subscription Schema (subscription.model.js)</h3>
              <p className="text-xs text-neutral-400 font-mono">Collection: subscriptions</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-lg bg-neutral-900/70 border border-neutral-800 space-y-1">
              <div className="font-mono text-emerald-400 font-semibold">user: ObjectId (Indexed)</div>
              <p className="text-neutral-400">
                Indexed foreign key referencing User. Enables O(log N) lookup speeds when querying <code className="text-neutral-200">/subscriptions/user/:id</code>.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-neutral-900/70 border border-neutral-800 space-y-1">
              <div className="font-mono text-emerald-400 font-semibold">Frequency &amp; Enums</div>
              <p className="text-neutral-400">
                Strict enums prevent malformed inputs: currencies (USD, EUR, GBP), frequencies (daily, weekly, monthly, yearly), and categories (8 distinct domains).
              </p>
            </div>
            <div className="p-3 rounded-lg bg-neutral-900/70 border border-neutral-800 space-y-1">
              <div className="font-mono text-emerald-400 font-semibold">Date Validation Constraints</div>
              <p className="text-neutral-400">
                Custom validator rejects future start dates (<code className="text-neutral-200">startDate &lt;= new Date()</code>) and verifies renewal occurs after start.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pre-Save Hook Inspection */}
      <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LuCalendar className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">Pre-Save Lifecycle Hook (subscription.model.js)</h3>
          </div>
          <span className="font-mono text-xs text-neutral-400">Mongoose Middleware</span>
        </div>

        <div className="p-4 rounded-lg bg-neutral-900/80 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto">
          <pre className="leading-relaxed">
{`subscriptionSchema.pre('save', function (next) {
  // 1. Auto-calculate renewal date if not explicitly supplied
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
  }

  // 2. Automatically mark subscription as expired if renewal period has lapsed
  if (this.renewalDate < new Date()) {
    this.status = 'expired';
  }

  next();
});`}
          </pre>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <LuCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Guarantees deterministic renewal dates without client-side computation</span>
          </div>
          <div className="flex items-center gap-2">
            <LuCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Prevents lapsed subscriptions from erroneously remaining in &apos;active&apos; status</span>
          </div>
        </div>
      </div>
    </section>
  );
};
