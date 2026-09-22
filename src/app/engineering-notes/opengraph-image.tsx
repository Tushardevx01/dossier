import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "Engineering Notes by Tushar Kanti Dey";
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
              EN
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#ffffff",
              margin: "0 0 12px 0",
              textAlign: "center",
              letterSpacing: "-2px",
              textShadow: "0 2px 24px rgba(0,0,0,0.8)",
            }}
          >
            Engineering Notes
          </h1>

          {/* Author */}
          <p
            style={{
              fontSize: "24px",
              color: "#60a5fa",
              margin: "0 0 20px 0",
              fontWeight: 600,
              fontFamily: "monospace",
              letterSpacing: "0.05em",
            }}
          >
            by Tushar Kanti Dey
          </p>

          {/* Description */}
          <p
            style={{
              fontSize: "20px",
              color: "rgba(255, 255, 255, 0.68)",
              margin: 0,
              textAlign: "center",
              maxWidth: "740px",
              lineHeight: 1.5,
            }}
          >
            Systems Architecture • DevOps • Full-Stack Development • Production Engineering
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
              tushardevx01.tech/engineering-notes
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
