import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "Tushar Kanti Dey - Full Stack Developer in Kolkata";
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
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Gradient accent circle */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(74, 222, 128, 0.15) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            zIndex: 10,
          }}
        >
          {/* Profile circle placeholder */}
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "30px",
              boxShadow: "0 0 40px rgba(74, 222, 128, 0.3)",
            }}
          >
            <span style={{ fontSize: "48px", color: "#0a0a0a", fontWeight: "bold" }}>
              TKD
            </span>
          </div>

          {/* Name - Primary keyword */}
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              color: "#ffffff",
              margin: "0 0 16px 0",
              textAlign: "center",
              letterSpacing: "-2px",
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            Tushar Kanti Dey
          </h1>

          {/* Role/Title */}
          <p
            style={{
              fontSize: "28px",
              color: "#4ade80",
              margin: "0 0 24px 0",
              fontWeight: "500",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Full Stack Developer in Kolkata
          </p>

          {/* Brief tagline */}
          <p
            style={{
              fontSize: "20px",
              color: "rgba(255, 255, 255, 0.7)",
              margin: 0,
              textAlign: "center",
              maxWidth: "700px",
            }}
          >
            Building modern web applications with Next.js, React, TypeScript & Cloud Technologies
          </p>

          {/* Website URL */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "40px",
              padding: "12px 24px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "30px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <span style={{ fontSize: "18px", color: "rgba(255, 255, 255, 0.8)" }}>
              tushardevx01.tech
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
