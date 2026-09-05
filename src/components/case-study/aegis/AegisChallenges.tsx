"use client";

import { nasalization } from "@/app/fonts";

const AEGIS_CHALLENGES = [
  {
    number: "01",
    tag: "SECURITY",
    title: "AUTOMATED REMEDIATION WITHOUT RCE",
    desc: "Giving an autonomous system unrestricted shell access creates an unacceptable vulnerability if arbitrary commands enter the execution path.",
  },
  {
    number: "02",
    tag: "ACCURACY",
    title: "AI UNCERTAINTY & FALSE DIAGNOSIS",
    desc: "A neural diagnosis can be wrong or low-confidence. Automated remediation on incorrect assumptions can amplify cluster instability.",
  },
  {
    number: "03",
    tag: "CONCURRENCY",
    title: "EVENT DECOUPLING & LATENCY SKEW",
    desc: "Docker container death events occur in microsecond bursts, whereas local model inference has completely different latency characteristics.",
  },
  {
    number: "04",
    tag: "COMPLIANCE",
    title: "ABSOLUTE AUDITABILITY",
    desc: "Every automated remediation decision, raw diagnostic log tail, vector similarity score, and Docker call must be fully traceable post-mortem.",
  },
  {
    number: "05",
    tag: "ISOLATION",
    title: "AIR-GAPPED OPERATION",
    desc: "The entire platform must function without outbound internet access, cloud AI endpoints, or external model hosting infrastructure.",
  },
  {
    number: "06",
    tag: "RESILIENCE",
    title: "INDEPENDENT FAILURE RECOVERY",
    desc: "Kafka brokers, consumer orchestrators, target microservices, or MongoDB storage can fail independently without dropping inflight incidents.",
  },
];

export const AegisChallenges = () => {
  return (
    <section id="challenges" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          ENGINEERING CHALLENGES
        </h2>
      </div>

      <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-3xl leading-relaxed">
        Key architectural challenges encountered when designing a self-healing SRE platform operating in sensitive, air-gapped container environments.
      </p>

      {/* 6 Challenges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
        {AEGIS_CHALLENGES.map((item) => (
          <div
            key={item.number}
            className="p-5 rounded-xl border border-neutral-800 bg-[#070709] hover:border-neutral-700 transition-colors space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-emerald-400 font-bold">
                // {item.number}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 bg-neutral-900 px-2 py-0.5 rounded">
                {item.tag}
              </span>
            </div>

            <h3 className={`${nasalization.className} text-sm font-bold text-white uppercase tracking-wide`}>
              {item.title}
            </h3>

            <p className="text-xs text-neutral-400 font-sans leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
