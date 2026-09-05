"use client";

import { LuZap, LuCircleAlert, LuQrCode, LuCpu } from "react-icons/lu";

export const SignifiyaChallenges = () => {
  return (
    <section id="challenges" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
          <span>05</span>
          <span className="w-8 h-px bg-emerald-500/30" />
          <span>ENGINEERING CHALLENGES</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Overcoming Mobile Hardware, Network, and Runtime Bottlenecks
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Building a consumer-facing festival app on React Native exposed tough engineering
          hurdles spanning native Android display modes, defensive array parsers, gate entry
          race conditions, and mobile memory limits.
        </p>
      </div>

      <div className="space-y-4">
        {/* Challenge 1 */}
        <div className="p-5 sm:p-6 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-amber-400 uppercase tracking-wider">
                CHALLENGE 01 // HARDWARE LAYER
              </span>
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Android 60Hz Display Throttling on 120Hz/144Hz Capable Hardware
              </h3>
            </div>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <LuZap className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            By default, Android&apos;s window manager restricts third-party React Native activities to
            60Hz refresh rates even on high-end 90Hz, 120Hz, or 144Hz displays. Complex gesture
            carousels (using <code className="text-neutral-300">react-native-reanimated-carousel</code>)
            and multi-item event feeds stuttered visibly during rapid touch interactions. Standard
            Expo configuration provides no direct setting for Android display modes.
          </p>
          <div className="p-3.5 rounded-lg bg-neutral-900/70 border border-neutral-800/80 text-xs text-neutral-300 space-y-1">
            <div className="font-mono text-[11px] text-emerald-400">ENGINEERING SOLUTION:</div>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Authored an Expo Config Plugin (<code className="text-emerald-400">plugins/withHighRefreshRate.js</code>)
              that injects Kotlin code directly into <code className="text-neutral-300">MainActivity.kt</code> during prebuild.
              The code inspects <code className="text-neutral-300">display.supportedModes</code> at startup, finds the
              mode with the maximum refresh rate, and binds <code className="text-neutral-300">windowParams.preferredDisplayModeId</code>
              to force the Android display server to run at the hardware&apos;s peak refresh rate.
            </p>
          </div>
        </div>

        {/* Challenge 2 */}
        <div className="p-5 sm:p-6 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-red-400 uppercase tracking-wider">
                CHALLENGE 02 // DATA & RUNTIME LAYER
              </span>
              <h3 className="text-base sm:text-lg font-semibold text-white">
                PostgREST Payload Deviations Causing Client Array Crashes
              </h3>
            </div>
            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
              <LuCircleAlert className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            In mobile production, network dropouts or database connection timeouts cause PostgREST
            to return single error objects (<code className="text-neutral-300">&#123; message, code &#125;</code>)
            or nested response envelopes (<code className="text-neutral-300">&#123; data: [...] &#125;</code>)
            rather than a flat list. Naively executing <code className="text-red-400">registrations.map(...)</code>
            crashes the entire React Native JavaScript thread with an unhandled TypeError.
          </p>
          <div className="p-3.5 rounded-lg bg-neutral-900/70 border border-neutral-800/80 text-xs text-neutral-300 space-y-1">
            <div className="font-mono text-[11px] text-emerald-400">ENGINEERING SOLUTION:</div>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Engineered a multi-stage defensive parser (<code className="text-emerald-400">src/lib/defensiveHandler.ts</code>).
              The utility recursively unboxes wrapper keys (<code className="text-neutral-300">data</code>, <code className="text-neutral-300">rows</code>, <code className="text-neutral-300">items</code>),
              validates item shapes via strict TypeScript type guards (<code className="text-neutral-300">isValidVisitorRegistration</code>, <code className="text-neutral-300">isValidEventRegistration</code>),
              and returns fallback empty arrays upon structural errors, ensuring zero runtime crashes.
            </p>
          </div>
        </div>

        {/* Challenge 3 */}
        <div className="p-5 sm:p-6 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider">
                CHALLENGE 03 // GATE VERIFICATION LAYER
              </span>
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Multi-Day Gate Check-In Fraud & Screenshot Pass Sharing
              </h3>
            </div>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <LuQrCode className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            With thousands of students entering physical gates across two festival days, static
            screenshots or forwardable images risked widespread ticket fraud and double-entry
            attempts. Relying on continuous real-time server check-in calls created fatal bottlenecks
            when on-campus cellular towers were congested by festival crowds.
          </p>
          <div className="p-3.5 rounded-lg bg-neutral-900/70 border border-neutral-800/80 text-xs text-neutral-300 space-y-1">
            <div className="font-mono text-[11px] text-emerald-400">ENGINEERING SOLUTION:</div>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Designed digital passes with two-factor verification: a high-frame-rate animated video
              canvas (<code className="text-emerald-400">expo-video</code> playing <code className="text-neutral-300">bg.mp4</code>)
              that visually prevents static screenshot fraud, coupled with vector QR codes encoding
              the unique Booking ID (<code className="text-neutral-300">SGF26-XXXXXXXX</code>). Gate scanners
              record independent timestamps (<code className="text-neutral-300">verifiedDay1At</code>, <code className="text-neutral-300">verifiedDay2At</code>),
              enabling deterministic multi-day gate validation.
            </p>
          </div>
        </div>

        {/* Challenge 4 */}
        <div className="p-5 sm:p-6 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider">
                CHALLENGE 04 // MOBILE MEMORY & PERFORMANCE
              </span>
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Startup RAM Footprint & Background Media Leaks
              </h3>
            </div>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <LuCpu className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            The app features an interactive 18-event schedule, high-resolution photo gallery, team
            showcase, global festival background music (<code className="text-neutral-300">expo-av</code>),
            and video passes. Mounting all five main bottom tabs on initial launch caused memory
            spikes above 280MB on mid-tier Android devices, risking system out-of-memory kills.
          </p>
          <div className="p-3.5 rounded-lg bg-neutral-900/70 border border-neutral-800/80 text-xs text-neutral-300 space-y-1">
            <div className="font-mono text-[11px] text-emerald-400">ENGINEERING SOLUTION:</div>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Configured React Navigation with <code className="text-emerald-400">lazy: true</code> and
              <code className="text-emerald-400">detachInactiveScreens: true</code>, unmounting inactive tabs
              from native memory and reducing startup RAM consumption by ~40%. Coupled this with
              modern WebP asset compression and a centralized audio state machine in
              <code className="text-neutral-300">MusicService.ts</code> that cleanly pauses and releases audio tracks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
