"use client";

import { LuWorkflow, LuClock, LuCircleCheck } from "react-icons/lu";

export const SubscriptionTrackerWorkflow = () => {
  const reminderWindows = [
    { days: "7 Days Before", purpose: "Early advance notice: allows user to budget or review upcoming charge." },
    { days: "5 Days Before", purpose: "Decision window: subscriber can update card info or plan cancellation." },
    { days: "2 Days Before", purpose: "Urgent warning: final reminder before payment gateway locks order." },
    { days: "1 Day Before", purpose: "Imminent renewal: final transactional confirmation alert." },
  ];

  return (
    <section id="workflow" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
          <span>10</span>
          <span className="w-8 h-px bg-emerald-500/30" />
          <span>AUTOMATED REMINDER WORKFLOW</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Durable Step Functions with Upstash Workflow
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Instead of holding memory-heavy timers or continuously querying the database with cron jobs,
          the system leverages durable serverless step functions to coordinate multi-day sleep cycles.
        </p>
      </div>

      {/* Reminder Timeline ASCII */}
      <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto space-y-3">
        <div className="flex items-center justify-between text-neutral-400 border-b border-neutral-800 pb-2">
          <span>SCHEDULED REMINDER TIMELINE ([7, 5, 2, 1] DAYS)</span>
          <span className="text-emerald-400">REMOTE QSTASH ORCHESTRATION</span>
        </div>
        <pre className="leading-relaxed">
{`SUBSCRIPTION CREATED (startDate)
       │
       ▼
[Upstash Workflow Initialized] ──▶ context.run('get subscription')
       │
       ├───────────────────────────────────────────┐
       ▼ (sleepUntil: 7 days before)               ▼
┌───────────────┐                           ┌────────────────────────────────────┐
│   T - 7 DAYS  │ ──▶ context.run() ──────▶ │ Nodemailer: "7 Days Before" Email  │
└──────┬────────┘                           └────────────────────────────────────┘
       ▼ (sleepUntil: 5 days before)
┌───────────────┐                           ┌────────────────────────────────────┐
│   T - 5 DAYS  │ ──▶ context.run() ──────▶ │ Nodemailer: "5 Days Before" Email  │
└──────┬────────┘                           └────────────────────────────────────┘
       ▼ (sleepUntil: 2 days before)
┌───────────────┐                           ┌────────────────────────────────────┐
│   T - 2 DAYS  │ ──▶ context.run() ──────▶ │ Nodemailer: "2 Days Before" Email  │
└──────┬────────┘                           └────────────────────────────────────┘
       ▼ (sleepUntil: 1 day before)
┌───────────────┐                           ┌────────────────────────────────────┐
│   T - 1 DAY   │ ──▶ context.run() ──────▶ │ Nodemailer: "1 Day Before" Email   │
└──────┬────────┘                           └────────────────────────────────────┘
       ▼
RENEWAL DATE REACHED (Auto-transition or next billing cycle)`}
        </pre>
      </div>

      {/* 4 Reminder Windows Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reminderWindows.map((rw, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <div className="p-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                <LuClock className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="font-mono text-[10px] text-neutral-400">Step {i + 1} of 4</span>
            </div>
            <h3 className="text-sm font-bold text-white font-mono">{rw.days}</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">{rw.purpose}</p>
          </div>
        ))}
      </div>

      {/* Code Breakdown */}
      <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LuWorkflow className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">
              Workflow Controller Engine (workflow.controller.js)
            </h3>
          </div>
          <span className="font-mono text-xs text-emerald-400">@upstash/workflow/express</span>
        </div>

        <div className="p-4 rounded-lg bg-neutral-900/80 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto">
          <pre className="leading-relaxed">
{`const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  
  // Step 1: Memoized fetch & active status check
  const subscription = await fetchSubscription(context, subscriptionId);
  if (!subscription || subscription.status !== 'active') return;

  const renewalDate = dayjs(subscription.renewalDate);

  // Step 2: Iterate through reminder intervals
  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, 'day');

    if (reminderDate.isAfter(dayjs())) {
      // Remote sleep until target date: 0 node process memory held
      await sleepUntilReminder(context, \`Reminder \${daysBefore} days before\`, reminderDate);
    }

    if (dayjs().isSame(reminderDate, 'day')) {
      // Trigger transactional email via Nodemailer
      await triggerReminder(context, \`\${daysBefore} days before reminder\`, subscription);
    }
  }
});`}
          </pre>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <LuCircleCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>State checkpointed automatically on every step</span>
          </div>
          <div className="flex items-center gap-2">
            <LuCircleCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Survives API crashes without lost schedules</span>
          </div>
          <div className="flex items-center gap-2">
            <LuCircleCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Verifies subscription active status prior to dispatch</span>
          </div>
        </div>
      </div>
    </section>
  );
};
