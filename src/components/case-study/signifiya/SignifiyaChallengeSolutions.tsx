"use client";

import { LuCode, LuZap, LuShieldCheck, LuQrCode } from "react-icons/lu";

export const SignifiyaChallengeSolutions = () => {
  return (
    <section id="solutions" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Production Implementations Grounded in Repository Code
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Direct analysis of the actual codebase modules solving display refresh constraints,
          defensive API parsing, booking token persistence, and hardware-accelerated pass rendering.
        </p>
      </div>

      <div className="space-y-8">
        {/* Solution 1: withHighRefreshRate.js */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
              <LuZap className="w-4 h-4" />
              <span>KOTLIN DISPLAY MODE INJECTION (plugins/withHighRefreshRate.js)</span>
            </div>
            <span className="text-[10px] font-mono text-neutral-400">EXPO CONFIG PLUGIN</span>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto">
            <pre className="leading-relaxed">
{`const { withMainActivity } = require("expo/config-plugins");

/** Injected into MainActivity.kt onCreate after super.onCreate(null) */
const HIGH_REFRESH_RATE_CODE = \`
    // Unlock high refresh rate (90/120/144Hz) on capable devices
    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
      val windowParams = window.attributes
      val display = windowManager.defaultDisplay
      val supportedModes = display.supportedModes
      val highestMode = supportedModes.maxByOrNull { it.refreshRate }
      if (highestMode != null) {
        windowParams.preferredDisplayModeId = highestMode.modeId
        window.attributes = windowParams
      }
    }\`;

function withHighRefreshRate(config) {
  return withMainActivity(config, (mod) => {
    const contents = mod.modResults.contents;
    if (contents.includes("preferredDisplayModeId")) return mod;

    const superOnCreateRegex = /super\\.onCreate\\(null\\)/;
    if (superOnCreateRegex.test(contents)) {
      mod.modResults.contents = contents.replace(
        superOnCreateRegex,
        \`super.onCreate(null)\${HIGH_REFRESH_RATE_CODE}\`
      );
    }
    return mod;
  });
}

module.exports = withHighRefreshRate;`}
            </pre>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            By querying <code className="text-neutral-300">display.supportedModes</code> directly from the Android
            display manager and selecting the highest refresh rate mode ID, this plugin lifts Android&apos;s
            default 60fps ceiling without modifying upstream React Native dependencies.
          </p>
        </div>

        {/* Solution 2: defensiveHandler.ts */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
              <LuShieldCheck className="w-4 h-4" />
              <span>ENTERPRISE DEFENSIVE PARSER (src/lib/defensiveHandler.ts)</span>
            </div>
            <span className="text-[10px] font-mono text-neutral-400">RUNTIME CRASH PREVENTION</span>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto">
            <pre className="leading-relaxed">
{`export function safeArrayParse<T>(
  data: unknown,
  itemValidator: (item: unknown) => item is T
): ValidationResult<T[]> {
  const errors: string[] = [];

  if (data === null || data === undefined) {
    return { isValid: false, data: null, errors: ["Data is null or undefined"] };
  }

  if (!Array.isArray(data)) {
    return { isValid: false, data: null, errors: [\`Expected array, got \${typeof data}\`] };
  }

  const validatedItems: T[] = [];
  data.forEach((item, index) => {
    if (!itemValidator(item)) {
      errors.push(\`Item at index \${index} failed schema validation\`);
    } else {
      validatedItems.push(item);
    }
  });

  return {
    isValid: validatedItems.length > 0,
    data: validatedItems.length > 0 ? validatedItems : null,
    errors,
  };
}`}
            </pre>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Prevents fatal client-side JavaScript crashes when calling <code className="text-neutral-300">.map()</code>
            on API responses by enforcing strict shape validation, stripping invalid records, and returning
            resilient fallback structures.
          </p>
        </div>

        {/* Solution 3: AuthContext Booking ID */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
              <LuCode className="w-4 h-4" />
              <span>BOOKING ID GENERATION & PERSISTENCE (src/context/AuthContext.tsx)</span>
            </div>
            <span className="text-[10px] font-mono text-neutral-400">SESSION SYNCHRONIZATION</span>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto">
            <pre className="leading-relaxed">
{`// Helper to sync profile data from Supabase & mint booking token
const syncUserProfile = async (baseUser: any) => {
  let finalUser: User = { ...baseUser };
  if (!finalUser.email) return finalUser;

  const { data: sbUser } = await supabase
    .from('user')
    .select('bookingId, mobileNo, collegeName, gender, image, email, id')
    .eq('email', finalUser.email)
    .single();

  if (sbUser) {
    // Validate identity match before state update
    if (sbUser.email && sbUser.email !== finalUser.email) return finalUser;
    finalUser = { ...finalUser, ...sbUser };
  }

  // Ensure all registered attendees receive an immutable booking token
  if (!finalUser.bookingId) {
    const randomPart = Math.random().toString(36).substring(2, 10).toUpperCase();
    const newBookingId = \`SGF26-\${randomPart}\`;

    await supabase
      .from('user')
      .update({ bookingId: newBookingId, updatedAt: new Date().toISOString() })
      .eq('email', finalUser.email);

    finalUser = { ...finalUser, bookingId: newBookingId };
  }
  return finalUser;
};`}
            </pre>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Guarantees that every authenticated user possesses an immutable <code className="text-emerald-400">SGF26-XXXXXXXX</code> identifier
            prefilled across forms and encoded into tickets, preventing null booking references during high-concurrency ticket claims.
          </p>
        </div>

        {/* Solution 4: Animated Pass Video Canvas */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
              <LuQrCode className="w-4 h-4" />
              <span>ANIMATED VIDEO PASS & VECTOR QR (src/components/passes/VisitorPass.tsx)</span>
            </div>
            <span className="text-[10px] font-mono text-neutral-400">GATE VERIFICATION</span>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto">
            <pre className="leading-relaxed">
{`const VisitorPass = ({ data, userName, bookingId, onClose }: VisitorPassProps) => {
  const currentBookingId = data.userBookingId || bookingId;

  // Embedded vector QR pointing to verified booking identifier
  const qrUrl = \`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=\${encodeURIComponent(
    currentBookingId || ''
  )}&bgcolor=ffffff&color=000000&margin=0\`;

  // Hardware-accelerated background video player
  const videoSource = require('../../../assets/bg.mp4');
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  return (
    <Animated.View entering={FadeIn.duration(400)} className="w-full max-w-[380px]">
      <VideoView player={player} style={StyleSheet.absoluteFill} contentFit="cover" />
      {/* Pass details, QR code, and attendee credentials rendered over looping canvas */}
    </Animated.View>
  );
};`}
            </pre>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            The looping MP4 video layer renders directly on the GPU via <code className="text-neutral-300">expo-video</code>,
            providing immediate visual verification for gate security that cannot be replicated via a static screenshot.
          </p>
        </div>
      </div>
    </section>
  );
};
