"use client";

import { LuFolderGit2 } from "react-icons/lu";

export const SignifiyaCodeStructure = () => {
  return (
    <section id="structure" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
          <span>12</span>
          <span className="w-8 h-px bg-emerald-500/30" />
          <span>CODEBASE TOPOLOGY</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Repository Structure & Module Organization
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Direct map of the actual Signifiya repository modules, plugins, schemas, and screens.
        </p>
      </div>

      <div className="p-4 sm:p-6 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-[11px] sm:text-xs text-neutral-300 overflow-x-auto">
        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-neutral-800 text-emerald-400 text-xs font-semibold">
          <LuFolderGit2 className="w-4 h-4" />
          <span>AbhishekS04/Signifiyaa (master branch)</span>
        </div>

        <pre className="leading-relaxed text-neutral-400">
{`Signifiyaa/
├── plugins/
│   └── withHighRefreshRate.js        # Expo config plugin: Injects Kotlin into MainActivity.kt
├── prisma/
│   └── schema.prisma                 # Declarative PostgreSQL schema: User, Pass, ParticipantTeam
├── scripts/
│   ├── live_payment_monitor.js       # Live terminal payment & registration watcher
│   ├── test_payment_utr.js           # UTR transaction string validation script
│   └── test_db.js                    # Database connection test suite
├── src/
│   ├── components/
│   │   ├── navigation/
│   │   │   ├── CustomTabBar.tsx      # Smart tab bar with double-tap scroll-to-top
│   │   │   └── PageTransition.tsx    # Native screen transition driver
│   │   ├── passes/
│   │   │   ├── EventPass.tsx         # Competitive pass with vector QR & video canvas
│   │   │   └── VisitorPass.tsx       # Visitor pass with day selection & QR code
│   │   ├── ui/
│   │   │   ├── AvatarChooserModal.tsx# Profile avatar selector
│   │   │   ├── SketchyEventCard.tsx  # Dynamic event discipline card
│   │   │   └── SmoothButton.tsx      # Haptic interactive button
│   │   ├── HeroSection.tsx           # Summit landing & animated countdown
│   │   ├── TeamSection.tsx           # Organizing committee & core team list
│   │   └── DepartmentsEvents.tsx     # Department-wise event categorization
│   ├── context/
│   │   ├── AuthContext.tsx           # Better Auth session, bookingId minting, Supabase sync
│   │   └── MusicContext.tsx          # Global background music state
│   ├── data/
│   │   ├── EventsData.ts             # 18 event definitions, team sizes, price tiers
│   │   └── GalleryData.ts            # High-resolution gallery metadata
│   ├── lib/
│   │   ├── api.ts                    # Supabase PostgREST client & array extractors
│   │   ├── betterAuthClient.ts       # Better Auth mobile SDK client
│   │   ├── defensiveHandler.ts       # safeArrayParse, schema type guards, atomic state
│   │   ├── pricingUtils.ts           # Temporal discount calculator & tier logic
│   │   └── supabase.ts               # Authenticated Supabase client
│   ├── navigation/
│   │   └── AppNavigator.tsx          # Tab & stack navigators (lazy: true, detachInactiveScreens)
│   ├── screens/
│   │   ├── AuthScreen.tsx            # Email & OAuth authentication
│   │   ├── EventRegistrationScreen.tsx # 4-step wizard, 14:30 timer, Razorpay / UTR checkout
│   │   ├── EventsScreen.tsx          # Event search, filters, category tabs
│   │   ├── GalleryScreen.tsx         # Media masonry gallery
│   │   ├── HomeScreen.tsx            # Main summit hub & real-time ticker
│   │   ├── PaymentsScreen.tsx        # Payment instructions & QR display
│   │   ├── ProfileScreen.tsx         # Attendee credentials, passes, booking ID copy
│   │   └── VisitorRegistrationForm.tsx # Visitor pass checkout pipeline
│   └── services/
│       └── MusicService.ts           # expo-av background audio coordinator
├── supabase_rls_setup.sql            # PostgreSQL Row-Level Security policies
├── tailwind.config.js                # NativeWind styling theme configuration
├── app.json                          # Expo configuration & iOS ProMotion flags
└── package.json                      # Expo SDK 54, React Native 0.81.5, Better Auth`}
        </pre>
      </div>
    </section>
  );
};
