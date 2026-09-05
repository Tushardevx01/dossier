"use client";

import { LuLayers, LuShieldCheck, LuCreditCard, LuDatabase } from "react-icons/lu";

interface DecisionItem {
  number: string;
  title: string;
  chosen: string;
  rejected: string;
  icon: typeof LuLayers;
  rationale: string;
  tradeoff: string;
}

const DECISIONS: DecisionItem[] = [
  {
    number: "01",
    title: "Mobile Framework & Styling Engine",
    chosen: "Expo SDK 54 + NativeWind v4",
    rejected: "Bare React Native or Pure Web Views",
    icon: LuLayers,
    rationale:
      "NativeWind v4 compiles Tailwind CSS classes into native style objects ahead-of-time with zero runtime JavaScript overhead. Expo SDK 54 enables EAS cloud builds and config plugins, allowing low-level Kotlin customizations while preserving rapid development cycles.",
    tradeoff:
      "Requires custom config plugins to inject native code into MainActivity.kt instead of directly editing Gradle and Android manifests.",
  },
  {
    number: "02",
    title: "Authentication Architecture",
    chosen: "Better Auth + Supabase Row-Level Security",
    rejected: "Firebase Auth or Single-Vendor Monolith",
    icon: LuShieldCheck,
    rationale:
      "Better Auth manages flexible session tokens and OAuth deep linking via expo-linking, while Supabase PostgreSQL enforces database-level Row-Level Security (RLS) policies. This decouples user session lifecycle from data isolation rules.",
    tradeoff:
      "Requires passing session tokens between Better Auth and PostgREST headers and running synchronization routines in AuthContext.",
  },
  {
    number: "03",
    title: "Payment Processing & Checkout Strategy",
    chosen: "Razorpay Native SDK + UTR Fallback",
    rejected: "Pure In-App Webview Checkout",
    icon: LuCreditCard,
    rationale:
      "react-native-razorpay provides native UPI app intents (GPay, PhonePe, Paytm) without jarring webview redirects. A secondary 12-digit UTR submission pipeline with 14:30 countdown timers guarantees attendees can complete payment even when cellular bandwidth degrades.",
    tradeoff:
      "Requires dual verification pathways: automated webhook callbacks for Razorpay and terminal monitor scripts for manual UTR reconciliation.",
  },
  {
    number: "04",
    title: "Database Modeling & API Layer",
    chosen: "Prisma Schema + Supabase PostgREST",
    rejected: "Custom Express/NestJS API Monolith",
    icon: LuDatabase,
    rationale:
      "Prisma schema provides declarative, version-controlled relational modeling (teams, members, events, passes) and typed database migrations. PostgREST serves performant REST endpoints directly from PostgreSQL without operating dedicated API servers.",
    tradeoff:
      "Demands defensive parsing in the mobile client to guard against PostgREST JSON wrapper nuances and network error shapes.",
  },
];

export const SignifiyaDecisions = () => {
  return (
    <section id="decisions" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
          <span>08</span>
          <span className="w-8 h-px bg-emerald-500/30" />
          <span>ARCHITECTURAL DECISIONS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Engineering Tradeoffs & Architectural Rationale
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Every layer was chosen to balance native mobile responsiveness, high-density gate
          reliability, and bulletproof database security.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DECISIONS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.number}
              className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-emerald-400">
                    DECISION {item.number}
                  </span>
                  <div className="w-7 h-7 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h3 className="text-base font-semibold text-white">{item.title}</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 rounded bg-emerald-950/20 border border-emerald-800/30 text-emerald-300">
                    <span className="text-[10px] text-emerald-400/70 block">CHOSEN</span>
                    {item.chosen}
                  </div>
                  <div className="p-2 rounded bg-neutral-900/60 border border-neutral-800 text-neutral-400">
                    <span className="text-[10px] text-neutral-400 block">REJECTED</span>
                    {item.rejected}
                  </div>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed">{item.rationale}</p>
              </div>

              <div className="pt-3 border-t border-neutral-900">
                <div className="font-mono text-[10px] text-neutral-400 uppercase">
                  ARCHITECTURAL TRADEOFF
                </div>
                <div className="text-xs text-neutral-300 mt-1">{item.tradeoff}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
