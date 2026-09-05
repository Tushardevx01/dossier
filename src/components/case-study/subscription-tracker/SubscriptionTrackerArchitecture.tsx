"use client";

import { LuCpu, LuShield, LuKey, LuDatabase, LuWorkflow, LuMail } from "react-icons/lu";

export const SubscriptionTrackerArchitecture = () => {
  const steps = [
    {
      num: "01",
      icon: <LuCpu className="w-4 h-4 text-emerald-400" />,
      title: "Client Dispatches Request",
      desc: "Incoming HTTP request targeting API endpoints (/api/v1/auth, /subscriptions, or /users) hits Express pipeline with JSON parsing and cookie inspection.",
    },
    {
      num: "02",
      icon: <LuShield className="w-4 h-4 text-emerald-400" />,
      title: "Arcjet Security Evaluation",
      desc: "aj.protect() checks the client IP against security policies. Bot attacks return 403 Forbidden; rate limit exhaustion triggers 429 Too Many Requests.",
    },
    {
      num: "03",
      icon: <LuKey className="w-4 h-4 text-emerald-400" />,
      title: "JWT Authentication & Route Guard",
      desc: "Bearer token extracted from Authorization header, verified against JWT_SECRET. The authenticated User document is attached to req.user for downstream handler authorization.",
    },
    {
      num: "04",
      icon: <LuDatabase className="w-4 h-4 text-emerald-400" />,
      title: "Mongoose Schema Validation & Pre-Save",
      desc: "Subscription document is populated. Pre-save middleware auto-calculates renewalDate from frequency and checks if renewal is already expired before persisting to MongoDB.",
    },
    {
      num: "05",
      icon: <LuWorkflow className="w-4 h-4 text-emerald-400" />,
      title: "Upstash Durable Workflow Triggering",
      desc: "Controller calls triggerWorkflow(SERVER_URL + /api/v1/workflows/subscription/reminder). Upstash QStash queues the durable execution context.",
    },
    {
      num: "06",
      icon: <LuMail className="w-4 h-4 text-emerald-400" />,
      title: "Step Sleeping & Email Notification",
      desc: "Step engine uses context.sleepUntil() across 7d, 5d, 2d, and 1d offsets. When reached, context.run triggers Nodemailer to send personalized HTML reminders.",
    },
  ];

  return (
    <section id="architecture" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
          <span>03</span>
          <span className="w-8 h-px bg-emerald-500/30" />
          <span>ARCHITECTURE & DATA FLOW</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Multi-Tier Express &amp; Serverless Workflow Architecture
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          The application decouples immediate synchronous HTTP transaction handling from asynchronous,
          long-running reminder cycles using durable cloud step functions.
        </p>
      </div>

      {/* Terminal Architecture Diagram */}
      <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto space-y-3">
        <div className="flex items-center justify-between text-neutral-400 border-b border-neutral-800 pb-2">
          <span>SYSTEM TOPOLOGY &amp; BOUNDARIES</span>
          <span className="text-emerald-400">EXPRESS + MONGOOSE + UPSTASH</span>
        </div>
        <pre className="leading-relaxed">
{`+─────────────────────────────────────────────────────────────────────────────────────────────+
│                                  INCOMING CLIENT TRAFFIC                                    │
│                              Web Clients / Mobile / API Consumers                           │
+─────────────────────────────────────────────────────────────────────────────────────────────+
                                              │
                                              ▼
+─────────────────────────────────────────────────────────────────────────────────────────────+
│                               EXPRESS 4 HTTP PIPELINE (app.js)                              │
│                                                                                             │
│  [express.json()] ──▶ [express.urlencoded()] ──▶ [cookieParser()] ──▶ [arcjetMiddleware()]  │
│                                                                              │              │
│                                         Rate Exceeded / Bot Detected ────────┴──▶ [429 / 403]│
+─────────────────────────────────────────────────────────────────────────────────────────────+
                                              │
                                              ▼
+─────────────────────────────────────────────────────────────────────────────────────────────+
│                               ROUTING & MIDDLEWARE BOUNDARY                                 │
│                                                                                             │
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌─────────────────────────────────┐  │
│  │   /api/v1/auth        │  │   /api/v1/users       │  │   /api/v1/subscriptions         │  │
│  │   • POST /sign-up     │  │   • GET / (admin)     │  │   • POST / (create + trigger)   │  │
│  │   • POST /sign-in     │  │   • GET /:id (jwt)    │  │   • GET /user/:id (ownership)   │  │
│  │   • POST /sign-out    │  │                       │  │   • [staged CRUD endpoints]     │  │
│  └───────────────────────┘  └───────────────────────┘  └─────────────────────────────────┘  │
│                                                                      │                      │
│                                                        authorize middleware (JWT)           │
+─────────────────────────────────────────────────────────────────────────────────────────────+
                                              │
                                              ▼
+───────────────────────────────────────────────┬─────────────────────────────────────────────+
│         DATA PERSISTENCE LAYER                │          DURABLE WORKFLOW ENGINE            │
│                                               │                                             │
│  Mongoose Models & Lifecycle Hooks:           │  Upstash Workflow (/api/v1/workflows):      │
│                                               │                                             │
│  • User Model:                                │  • serve(/subscription/reminder)            │
│    - Email unique index                       │  • context.run('get subscription')          │
│    - Bcrypt password hash                     │  • Reminders loop: [7, 5, 2, 1] days        │
│                                               │  • context.sleepUntil(reminderDate)         │
│  • Subscription Model:                        │  • context.run('triggerReminder')           │
│    - Frequency mapping (1, 7, 30, 365)        │                                             │
│    - Pre-save auto-renewal calculation        │                        │                    │
│    - Auto-expiration status flag              │                        ▼                    │
│                                               │            [NODEMAILER SMTP GATEWAY]        │
│  • MongoDB Atlas Database                     │            Personalized HTML Email Alerts   │
+───────────────────────────────────────────────┴─────────────────────────────────────────────+`}
        </pre>
      </div>

      {/* 6-Step Lifecycle Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {steps.map((step) => (
          <div
            key={step.num}
            className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-emerald-400 font-bold">{step.num}</span>
              <div className="p-1.5 rounded-md bg-neutral-900 border border-neutral-800">
                {step.icon}
              </div>
            </div>
            <h3 className="text-sm font-semibold text-white">{step.title}</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
