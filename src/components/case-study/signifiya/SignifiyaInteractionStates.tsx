"use client";

import { LuLayers, LuClock, LuMusic, LuQrCode } from "react-icons/lu";

export const SignifiyaInteractionStates = () => {
  return (
    <section id="states" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          State Machines & Context Interactions
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Signifiya manages complex state lifecycles across registration flows, global audio
          services, hardware navigation handlers, and modal pass projections.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* State 1 */}
        <div className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-emerald-400 uppercase">
              STATE MODEL 01
            </span>
            <div className="w-7 h-7 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
              <LuClock className="w-3.5 h-3.5" />
            </div>
          </div>
          <h3 className="text-sm font-semibold text-white">
            4-Step Registration Wizard with 14:30 Expiry Timer
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Multi-step state machine: Step 1 (Leader Details) → Step 2 (Event Selection & Weight Class)
            → Step 3 (Roster Assembly & Game IDs) → Step 4 (Payment Checkout). Step 4 mounts an
            870-second countdown interval; upon expiry, state resets to prevent stale pricing locks.
          </p>
          <div className="font-mono text-[11px] text-neutral-400 bg-neutral-900/50 p-2.5 rounded border border-neutral-800 space-y-1">
            <div className="text-emerald-400">STATE FLOW:</div>
            <div>Leader Input → Event Select → Team Roster → 14:30 Timer Lock → Submit</div>
          </div>
        </div>

        {/* State 2 */}
        <div className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-emerald-400 uppercase">
              STATE MODEL 02
            </span>
            <div className="w-7 h-7 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
              <LuLayers className="w-3.5 h-3.5" />
            </div>
          </div>
          <h3 className="text-sm font-semibold text-white">
            Smart Tab Navigation & Double-Tap Scroll Dispatcher
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Custom bottom tab bar tracks consecutive user taps within a 400ms threshold on the active
            screen. Touching &ldquo;Home&rdquo; while already on Home triggers an animated scroll-to-top
            event, preventing deep scroll fatigue across long event feeds.
          </p>
          <div className="font-mono text-[11px] text-neutral-400 bg-neutral-900/50 p-2.5 rounded border border-neutral-800 space-y-1">
            <div className="text-emerald-400">DISPATCH FLOW:</div>
            <div>Tab Press → Consecutive Check (400ms) → Scroll Event Emission</div>
          </div>
        </div>

        {/* State 3 */}
        <div className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-emerald-400 uppercase">
              STATE MODEL 03
            </span>
            <div className="w-7 h-7 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
              <LuMusic className="w-3.5 h-3.5" />
            </div>
          </div>
          <h3 className="text-sm font-semibold text-white">
            Global Background Audio State (MusicContext)
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            A singleton audio service built over <code className="text-neutral-300">expo-av</code> provides
            persistent festival music playback across all navigation stacks. Users control playback
            via a floating interactive button with haptic feedback, while modal prompts respect user audio preferences.
          </p>
          <div className="font-mono text-[11px] text-neutral-400 bg-neutral-900/50 p-2.5 rounded border border-neutral-800 space-y-1">
            <div className="text-emerald-400">AUDIO FLOW:</div>
            <div>User Consent Modal → Background Loop → Floating HUD → Smooth Tear-down</div>
          </div>
        </div>

        {/* State 4 */}
        <div className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-emerald-400 uppercase">
              STATE MODEL 04
            </span>
            <div className="w-7 h-7 rounded-md bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
              <LuQrCode className="w-3.5 h-3.5" />
            </div>
          </div>
          <h3 className="text-sm font-semibold text-white">
            Dynamic Pass Presentation & Copy Feedback
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Profile screen provides an interactive pass projection modal with dynamic QR expansion,
            one-tap booking token clipboard copy with haptic response (<code className="text-neutral-300">expo-haptics</code>),
            and custom avatar selection modal updating user profile records in Supabase.
          </p>
          <div className="font-mono text-[11px] text-neutral-400 bg-neutral-900/50 p-2.5 rounded border border-neutral-800 space-y-1">
            <div className="text-emerald-400">MODAL FLOW:</div>
            <div>Select Pass Card → GPU Video Render → Vector QR Zoom → Clipboard Copy</div>
          </div>
        </div>
      </div>
    </section>
  );
};
