"use client";

import { LuWorkflow, LuDatabase, LuCalendarCheck, LuShieldCheck, LuCheck } from "react-icons/lu";

export const SubscriptionTrackerChallengeSolutions = () => {
  const deepDives = [
    {
      badge: "CHALLENGE & SOLUTION 01",
      icon: <LuWorkflow className="w-5 h-5 text-emerald-400" />,
      title: "Durable Workflow Scheduling vs Ephemeral Timers",
      problem:
        "Traditional Node.js timers (setTimeout/setInterval) tie schedule states directly to server process memory. Any container restart, redeploy, or crash wipes pending timers. Conversely, polling cron jobs cause high O(N) database load even when no renewals are due.",
      solution:
        "Implemented Upstash Workflow step functions (/api/v1/workflows/subscription/reminder). The workflow executes context.run('get subscription'), iterates through [7, 5, 2, 1] day reminder intervals, and executes context.sleepUntil(reminderDate). Schedule state is durably offloaded to QStash.",
      codeSnippet: `// controllers/workflow.controller.js
export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);
  if (!subscription || subscription.status !== 'active') return;

  const renewalDate = dayjs(subscription.renewalDate);
  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, 'day');
    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(context, \`Reminder \${daysBefore} days before\`, reminderDate);
    }
    if (dayjs().isSame(reminderDate, 'day')) {
      await triggerReminder(context, \`\${daysBefore} days before reminder\`, subscription);
    }
  }
});`,
      results: [
        "0 in-memory timers consuming Node.js event loop resources",
        "Durable execution survives server restarts and redeployments",
        "Decoupled from periodic DB polling jobs",
      ],
    },
    {
      badge: "CHALLENGE & SOLUTION 02",
      icon: <LuDatabase className="w-5 h-5 text-emerald-400" />,
      title: "Atomic User Registration with Mongoose Transactions",
      problem:
        "Standard Mongoose save operations are non-transactional by default. If duplicate validation, password hashing, or downstream token creation throws an error midway, partial state could leave orphaned records or corrupted account collections.",
      solution:
        "Enforced Mongoose session transactions in auth.controller.js. The controller opens a session with mongoose.startSession(), executes validation and user creation within session.startTransaction(), and guarantees a complete session.abortTransaction() upon any thrown error.",
      codeSnippet: `// controllers/auth.controller.js
export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      const error = new Error('User already exists');
      error.statusCode = 409;
      throw error;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUsers = await User.create([{ name, email, password: hashedPassword }], { session });
    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    await session.commitTransaction();
    session.endSession();
    res.status(201).json({ success: true, data: { token, user: newUsers[0] } });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};`,
      results: [
        "ACID guarantees across multi-document user creation",
        "Zero risk of orphaned records during bcrypt hashing or token failures",
        "Clean, centralized rollback handling in the catch block",
      ],
    },
    {
      badge: "CHALLENGE & SOLUTION 03",
      icon: <LuCalendarCheck className="w-5 h-5 text-emerald-400" />,
      title: "Deterministic Date Calculation via Pre-Save Hooks",
      problem:
        "Relying on frontend clients to pass both startDate and renewalDate invites drift, timezone confusion, or deliberate tampering. Manually calculating renewal dates in controllers leads to duplicated code across creation and update handlers.",
      solution:
        "Centralized all renewal logic into a Mongoose pre-save lifecycle hook. It maps frequency strings (daily: 1, weekly: 7, monthly: 30, yearly: 365) to day offsets and sets renewalDate automatically. It also inspects if renewalDate < current date, auto-transitioning the status to 'expired'.",
      codeSnippet: `// models/subscription.model.js
subscriptionSchema.pre('save', function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  // Auto-expire subscriptions whose renewal has already lapsed
  if (this.renewalDate < new Date()) {
    this.status = 'expired';
  }

  next();
});`,
      results: [
        "Centralized, single source of truth for billing cycles",
        "Client only needs to supply startDate and frequency",
        "Automatic expiration state transitions without external cron sweeps",
      ],
    },
    {
      badge: "CHALLENGE & SOLUTION 04",
      icon: <LuShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: "Two-Tier Security: Edge Protection & Resource Ownership",
      problem:
        "Authentication alone is insufficient: attackers can flood auth endpoints with credential stuffing bots, or authenticated users can query other tenants' subscription IDs if ownership is not explicitly verified.",
      solution:
        "Configured Arcjet middleware globally with bot detection and token-bucket rate limiting before application routes execute. On private routes, JWT middleware validates bearer tokens and controllers explicitly verify that req.user._id matches req.params.id.",
      codeSnippet: `// middlewares/arcjet.middleware.js
const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) return res.status(429).json({ error: 'Rate limit exceeded' });
      if (decision.reason.isBot()) return res.status(403).json({ error: 'Bot detected' });
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  } catch (error) {
    next(error);
  }
};

// controllers/subscription.controller.js (Ownership Guard)
if (req.user.id !== req.params.id) {
  const error = new Error('You are not the owner of this account');
  error.status = 401;
  throw error;
}`,
      results: [
        "Edge-level bot and rate limit mitigation before reaching Express routing",
        "Strict multi-tenant resource isolation on user subscription endpoints",
        "Proper HTTP status propagation (401 Unauthorized, 403 Forbidden, 429 Too Many Requests)",
      ],
    },
  ];

  return (
    <section id="solutions" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Implementation Deep-Dives
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Examining the concrete code implementations that solved distributed scheduling, database
          concurrency, schema-driven lifecycle transitions, and API authorization.
        </p>
      </div>

      <div className="space-y-6">
        {deepDives.map((d, idx) => (
          <div
            key={idx}
            className="p-5 sm:p-6 rounded-xl bg-neutral-950 border border-neutral-800 space-y-5"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  {d.icon}
                </div>
                <div>
                  <span className="font-mono text-[11px] text-emerald-400 font-semibold tracking-wider">
                    {d.badge}
                  </span>
                  <h3 className="text-lg font-bold text-white">{d.title}</h3>
                </div>
              </div>
            </div>

            {/* Problem & Solution text */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
              <div className="p-3.5 rounded-lg bg-neutral-900/60 border border-neutral-800/80 space-y-1.5">
                <span className="font-mono text-amber-400 font-semibold uppercase text-[11px]">
                  Problem Context
                </span>
                <p className="text-neutral-400">{d.problem}</p>
              </div>
              <div className="p-3.5 rounded-lg bg-neutral-900/60 border border-neutral-800/80 space-y-1.5">
                <span className="font-mono text-emerald-400 font-semibold uppercase text-[11px]">
                  Engineered Solution
                </span>
                <p className="text-neutral-300">{d.solution}</p>
              </div>
            </div>

            {/* Code Block */}
            <div className="p-4 rounded-lg bg-neutral-900 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto">
              <pre className="leading-relaxed">{d.codeSnippet}</pre>
            </div>

            {/* Measurable Results */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              {d.results.map((res, rIdx) => (
                <div
                  key={rIdx}
                  className="flex items-start gap-2 p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/15 text-xs text-neutral-300"
                >
                  <LuCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{res}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
