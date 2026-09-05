"use client";

import { LuUser, LuCalendar, LuCreditCard, LuQrCode, LuClock, LuCheck } from "react-icons/lu";

const LIFECYCLE_STAGES = [
  {
    step: "STAGE 01",
    title: "Identity & Booking ID Minting",
    icon: LuUser,
    desc: "User logs in via Better Auth (Email or OAuth). The AuthContext checks for an assigned bookingId; if missing, it immediately mints an immutable booking token format (SGF26-XXXXXXXX) and writes it to the user table.",
    details: [
      "Client-side entropy generation with DB persistence",
      "Automatic prefill into subsequent registration forms",
      "Used as primary foreign key for ticket validation",
    ],
  },
  {
    step: "STAGE 02",
    title: "Event & Tier Selection",
    icon: LuCalendar,
    desc: "Attendees choose between Visitor Passes or 18 competitive events. The UI dynamically presents team size rules (Solo to 7-player rosters), weight categories for Arm Wrestling, and gaming handle fields (Riot ID, BGMI UUID).",
    details: [
      "Differential pricing: In-House (Adamas) vs Outside",
      "Arm Wrestling weight class selection (60-70kg, 70-80kg, etc.)",
      "Roster size validation per competitive discipline",
    ],
  },
  {
    step: "STAGE 03",
    title: "Temporal Discount Evaluation",
    icon: LuClock,
    desc: "Pricing is evaluated dynamically via pricingUtils.ts. The engine calculates active temporal sales based on millisecond system time (Launch 10%, Holi 5%, Weekend Blast 5%, Final 24h 10%) without server round-trips.",
    details: [
      "Real-time client countdowns and discount badges",
      "Zero server mutation for flash sale calculation",
      "Calculates discounted subtotal and savings tally",
    ],
  },
  {
    step: "STAGE 04",
    title: "Session Lock & Payment Processing",
    icon: LuCreditCard,
    desc: "A 14-minute 30-second (870s) countdown timer initiates upon reaching the payment screen. Attendees either pay via react-native-razorpay native SDK or upload a verified 12-digit transaction UTR string with instant anti-tamper checks.",
    details: [
      "Strict 12-digit UTR alphanumeric length validation",
      "14:30 session expiry forces re-validation on timeout",
      "Anti-double-submission lock during network transit",
    ],
  },
  {
    step: "STAGE 05",
    title: "Relational DB Insertion",
    icon: LuCheck,
    desc: "The client generates an isolated UUID and commits relational data to Supabase PostgreSQL: participant_team record, individual participant_team_member records, and cross-reference links in participant_team_event.",
    details: [
      "Single-transaction parent-child roster writes",
      "Eliminated .select().single() to prevent RLS read stalls",
      "Partial failure tolerance with defensive sync error flags",
    ],
  },
  {
    step: "STAGE 06",
    title: "Digital Pass & Gate Verification",
    icon: LuQrCode,
    desc: "Upon approval, the mobile app renders an animated digital pass inside an expo-video looping video canvas (bg.mp4). The embedded vector QR code encodes the verified booking token for offline-safe scanning across Day 1 and Day 2 entry gates.",
    details: [
      "Looped native MP4 video canvas running on GPU",
      "Integrated vector QR generation for physical gate scanners",
      "Dual-day gate tracking (verifiedDay1At, verifiedDay2At)",
    ],
  },
];

export const SignifiyaRegistrationLifecycle = () => {
  return (
    <section id="lifecycle" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          The 6-Stage Event Registration State Machine
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          From the initial user authentication to physical barcode gate entry, every state
          transition is designed to guarantee payment validity, prevent duplicate bookings, and
          render fraud-resistant digital passes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {LIFECYCLE_STAGES.map((stage) => {
          const Icon = stage.icon;
          return (
            <div
              key={stage.step}
              className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-emerald-400 tracking-wider">
                    {stage.step}
                  </span>
                  <div className="w-7 h-7 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-white">{stage.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{stage.desc}</p>
              </div>

              <div className="pt-3 border-t border-neutral-900 space-y-1.5">
                {stage.details.map((detail) => (
                  <div
                    key={detail}
                    className="flex items-center gap-2 font-mono text-[11px] text-neutral-400"
                  >
                    <span className="w-1 h-1 rounded-full bg-emerald-500/60 shrink-0" />
                    <span>{detail}</span>
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
