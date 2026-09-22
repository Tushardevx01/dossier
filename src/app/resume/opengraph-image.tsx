import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "Resume - Tushar Kanti Dey | Full Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          backgroundImage:
            "radial-gradient(circle at 50% 18%, rgba(59, 130, 246, 0.16) 0%, transparent 60%), radial-gradient(circle at 85% 85%, rgba(99, 102, 241, 0.08) 0%, transparent 45%)",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          position: "relative",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* Outer border frame */}
        <div
          style={{
            position: "absolute",
            top: 24,
            bottom: 24,
            left: 24,
            right: 24,
            borderRadius: 24,
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            position: "relative",
          }}
        >
          {/* Glass text badge */}
          <div
            style={{
              width: "84px",
              height: "84px",
              borderRadius: "22px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.14)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
            }}
          >
            <span
              style={{
                fontSize: "34px",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "-1px",
              }}
            >
              CV
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#ffffff",
              margin: "0 0 10px 0",
              textAlign: "center",
              letterSpacing: "-2px",
              textShadow: "0 2px 24px rgba(0,0,0,0.8)",
            }}
          >
            Resume
          </h1>

          {/* Name */}
          <p
            style={{
              fontSize: "32px",
              color: "#FFFFFF",
              margin: "0 0 14px 0",
              fontWeight: 700,
              letterSpacing: "-0.5px",
            }}
          >
            Tushar Kanti Dey
          </p>

          {/* Role */}
          <p
            style={{
              fontSize: "20px",
              color: "#60a5fa",
              margin: "0 0 16px 0",
              textTransform: "uppercase",
              letterSpacing: "1.2px",
              fontWeight: 600,
              fontFamily: "monospace",
            }}
          >
            Full Stack Developer and DevOps Engineer
          </p>

          {/* Description */}
          <p
            style={{
              fontSize: "19px",
              color: "rgba(255, 255, 255, 0.68)",
              margin: 0,
              textAlign: "center",
              maxWidth: "620px",
              lineHeight: 1.5,
            }}
          >
            Curriculum Vitae • Systems Architecture • Next.js • Cloud Infrastructure
          </p>

          {/* Website */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "36px",
              padding: "10px 24px",
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "9999px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.4)",
            }}
          >
            <span style={{ fontSize: "15px", color: "rgba(255, 255, 255, 0.85)", fontFamily: "monospace" }}>
              tushardevx01.tech/resume
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
