"use client";

import { LuCheck, LuSmartphone, LuTicket, LuCalendar, LuCreditCard } from "react-icons/lu";

const CAPABILITIES = [
  {
    category: "Visitor Pass Ticketing",
    icon: LuTicket,
    items: [
      { name: "Single & Dual Day Passes", detail: "Support for Day 1, Day 2, and combined multi-day passes." },
      { name: "Dynamic Vector QR Encoding", detail: "Renders crisp QR codes linking to verified booking IDs." },
      { name: "Looped GPU Video Canvas", detail: "expo-video backdrop playback preventing static screenshot counterfeiting." },
      { name: "Multi-Day Gate Check-In", detail: "Independent database tracking for Day 1 and Day 2 entry timestamps." },
    ],
  },
  {
    category: "18 Competitive Events",
    icon: LuCalendar,
    items: [
      { name: "Esports Tournaments", detail: "Valorant (5-player), BGMI (4-player), Free Fire, and e-Football." },
      { name: "Robotics & Engineering", detail: "Path Follower, Circuitronics, Lathe War, Bridge Building, Robo Terrain." },
      { name: "Weight-Class Arm Wrestling", detail: "Category assignment for 60-70kg, 70-80kg, 80-90kg, and 90kg+." },
      { name: "Cultural & Creative Battles", detail: "Dance Battle (1-7 members), Rap Battle, Treasure Hunt, Tech Monopoly." },
    ],
  },
  {
    category: "Payment & Checkout",
    icon: LuCreditCard,
    items: [
      { name: "Native Razorpay Intent", detail: "Seamless checkout switching to GPay, PhonePe, and Paytm apps." },
      { name: "12-Digit UTR Fallback", detail: "Direct UPI payment proof entry with regex validation." },
      { name: "14:30 Session Countdown", detail: "Hardware-timed session lock to prevent stale reservation holds." },
      { name: "Temporal Flash Sales", detail: "Automated discounts for Launch (10%), Holi (5%), Weekend (5%)." },
    ],
  },
  {
    category: "Operations & Hardware",
    icon: LuSmartphone,
    items: [
      { name: "120Hz Kotlin Display Plugin", detail: "Forces Android display server to hardware max refresh rate." },
      { name: "Lazy Tab Lifecycle", detail: "Detaches inactive screens saving ~40% startup memory footprint." },
      { name: "Global Background Music", detail: "expo-av music service with interactive floating playback widget." },
      { name: "Live Terminal Monitor", detail: "CLI Node.js script polling Supabase database every 3 seconds." },
    ],
  },
];

export const SignifiyaFeatures = () => {
  return (
    <section id="features" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Verified Feature & Operations Surface
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Features implemented and validated directly in the Signifiya 2026 repository.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CAPABILITIES.map((group) => {
          const Icon = group.icon;
          return (
            <div
              key={group.category}
              className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-4"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-neutral-900">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-white text-sm sm:text-base">{group.category}</h3>
              </div>

              <div className="space-y-3">
                {group.items.map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-semibold text-neutral-200">
                      <LuCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{item.name}</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 pl-5.5 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
