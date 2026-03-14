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
          {/* Local text badge avoids remote emoji fetches during build */}
          <div
            style={{
              width: "96px",
              height: "96px",
              borderRadius: "24px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
            }}
          >
            <span
              style={{
                fontSize: "38px",
                fontWeight: 800,
                color: "#0a0a0a",
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
              fontWeight: "bold",
              color: "#ffffff",
              margin: "0 0 16px 0",
              textAlign: "center",
              letterSpacing: "-2px",
            }}
          >
            Engineering Notes
          </h1>

          {/* Author */}
          <p
            style={{
              fontSize: "32px",
              color: "#4ade80",
              margin: "0 0 24px 0",
              fontWeight: "500",
            }}
          >
            by Tushar Kanti Dey
          </p>

          {/* Description */}
          <p
            style={{
              fontSize: "22px",
              color: "rgba(255, 255, 255, 0.7)",
              margin: 0,
              textAlign: "center",
              maxWidth: "700px",
            }}
          >
            Systems Architecture • DevOps • Full-Stack Development • Production Engineering
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
