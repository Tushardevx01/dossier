"use client";

import { LuDatabase, LuSmartphone, LuShieldCheck } from "react-icons/lu";

export const SignifiyaArchitecture = () => {
  return (
    <section id="architecture" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
          <span>03</span>
          <span className="w-8 h-px bg-emerald-500/30" />
          <span>SYSTEM ARCHITECTURE</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          End-to-End System Topology & Security Boundary
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          The Signifiya platform couples an unthrottled React Native client with hybrid session
          authentication, transactional PostgreSQL operations, and multi-tier payment reconciliation.
        </p>
      </div>

      {/* ASCII Topology Diagram */}
      <div className="p-4 sm:p-6 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-[11px] sm:text-xs text-neutral-300 overflow-x-auto">
        <pre className="leading-relaxed">
{`+---------------------------------------------------------------------------------------------------+
|                                 REACT NATIVE MOBILE CLIENT (EXPO 54)                              |
|                                                                                                   |
|  [ UI & Animation Engine ]          [ Core Services ]                  [ Security & Defense ]     |
|   * NativeWind v4 (Tailwind CSS)     * AuthContext (Better Auth Expo)   * defensiveHandler.ts     |
|   * Reanimated v4 (UI Worklets)      * MusicService (expo-av)           * safeArrayParse()        |
|   * expo-video (Pass Video Canvas)   * pricingUtils.ts (Time Discounts) * Column Whitelisting     |
|   * withHighRefreshRate.js (120Hz)   * CustomTabBar (Smart Double-Tap)  * Post-Query Email Verify |
+------------------------------------+----------------------------------+---------------------------+
                                     |                                  |
                                     |  Auth Session / JWT              |  Explicit Column Projections
                                     v                                  v
+---------------------------------------------------------------------------------------------------+
|                                     AUTHENTICATION & API GATEWAY                                  |
|                                                                                                   |
|     +-------------------------------+                 +------------------------------------+      |
|     |     BETTER AUTH SERVER        |                 |       SUPABASE POSTGREST API       |      |
|     |  * Email/Password & OAuth     |                 |  * Bearer Token Authorization      |      |
|     |  * Session Token Issuance     |                 |  * Field-limited Select/Inserts    |      |
|     +---------------+---------------+                 +-----------------+------------------+      |
+---------------------|---------------------------------------------------|-------------------------+
                      |                                                   |
                      v                                                   v
+---------------------------------------------------------------------------------------------------+
|                                  SUPABASE POSTGRESQL + PRISMA ORM                                 |
|                                                                                                   |
|  [ ROW-LEVEL SECURITY (RLS) POLICIES ]                                                            |
|   * "user"                   -> auth.uid()::text = id                                             |
|   * "visitor_registration"   -> auth.uid()::text = userId OR email = auth.jwt()->>'email'        |
|   * "participant_team"       -> auth.uid()::text = leaderUserId OR leaderEmail = auth.jwt()       |
|   * "participant_team_member"-> EXISTS in participant_team WHERE leaderEmail = auth.jwt()        |
|   * "pass" & "session"       -> auth.uid()::text = userId                                         |
|                                                                                                   |
|  [ RELATIONAL SCHEMA (prisma/schema.prisma) ]                                                     |
|   User (bookingId SGF26-*) <--- Pass (QR Token, Multi-Day Attendance)                             |
|   ParticipantTeam <-----------> ParticipantTeamMember (Name, Phone, Game ID)                      |
|   ParticipantTeam <-----------> ParticipantTeamEvent (18 Competitive Events)                      |
+---------------------------------------------------------------------------------------------------+
                      ^                                                   ^
                      | Webhook / Verification                             | Terminal DB Poll
                      |                                                   |
+---------------------+-------------------------+   +---------------------+-------------------------+
|             PAYMENT INFRASTRUCTURE            |   |         OPERATIONAL MONITORING                |
|  * react-native-razorpay (Native Checkout)    |   |  * scripts/live_payment_monitor.js (3s Poll)  |
|  * 15-Minute Locked Checkout Countdown Timer  |   |  * scripts/test_payment_utr.js (Integrity)    |
|  * 12-Digit UTR Payment Fallback Pipeline     |   |  * scripts/test_db.js (Connectivity Watcher)  |
+-----------------------------------------------+   +-----------------------------------------------+`}
        </pre>
      </div>

      {/* Layer Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
            <LuSmartphone className="w-4 h-4" />
            <span>01 // NATIVE RUNTIME</span>
          </div>
          <h4 className="text-sm font-semibold text-white">Expo 54 & Android Display Hack</h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Compiled with NativeWind v4 for zero-runtime styling overhead, Reanimated v4 for native
            60/120fps gesture drivers, and a Kotlin MainActivity injector forcing the display mode to
            hardware max refresh rates.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
            <LuShieldCheck className="w-4 h-4" />
            <span>02 // ZERO-TRUST BOUNDARY</span>
          </div>
          <h4 className="text-sm font-semibold text-white">Hybrid Auth & RLS Enforcement</h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Session credentials managed via Better Auth client, passing verified JWT tokens into
            Supabase PostgREST. PostgreSQL enforces row isolation on all visitor and team rosters
            regardless of client requests.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
            <LuDatabase className="w-4 h-4" />
            <span>03 // DATA MODEL & OPS</span>
          </div>
          <h4 className="text-sm font-semibold text-white">Prisma Relational Model & Monitors</h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Normalized schema mapping teams to multiple events and members with unique game handles.
            Real-time terminal CLI scripts poll database status during live ticket bursts to detect
            payment anomalies instantly.
          </p>
        </div>
      </div>
    </section>
  );
};
