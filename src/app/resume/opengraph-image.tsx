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
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
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
            zIndex: 10,
          }}
        >
          {/* Icon */}
          <div
            style={{
              fontSize: "64px",
              marginBottom: "24px",
            }}
          >
            📄
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              color: "#ffffff",
              margin: "0 0 16px 0",
              textAlign: "center",
              letterSpacing: "-2px",
            }}
          >
            Resume
          </h1>

          {/* Name */}
          <p
            style={{
              fontSize: "36px",
              color: "#4ade80",
              margin: "0 0 24px 0",
              fontWeight: "bold",
            }}
          >
            Tushar Kanti Dey
          </p>

          {/* Role */}
          <p
            style={{
              fontSize: "24px",
              color: "rgba(255, 255, 255, 0.8)",
              margin: "0 0 16px 0",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Full Stack Developer & DevOps Engineer
          </p>

          {/* Description */}
          <p
            style={{
              fontSize: "20px",
              color: "rgba(255, 255, 255, 0.6)",
              margin: 0,
              textAlign: "center",
              maxWidth: "600px",
            }}
          >
            View and download professional resume
          </p>

          {/* Website */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "40px",
              padding: "12px 24px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "30px",
            }}
          >
            <span style={{ fontSize: "18px", color: "rgba(255, 255, 255, 0.8)" }}>
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
