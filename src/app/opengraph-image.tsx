import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "Tushar Kanti Dey - Full Stack Developer and DevOps Engineer";
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
          padding: "48px 32px",
        }}
      >
        {/* Subtle engineering grid overlay */}
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

        {/* Content Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Logo badge with official geometric logo */}
          <div
            style={{
              width: "84px",
              height: "84px",
              borderRadius: "22px",
              background: "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.14)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "18px",
            }}
          >
            <svg width="44" height="44" viewBox="0 0 512 512">
              <path
                fill="#FFFFFF"
                d="M61 97h247v95H61zM308 192l129-124v124zM308 192L179 316V192zM179 316h129v196H179z"
              />
            </svg>
          </div>

          {/* Category Chip */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 9999,
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                boxShadow: "0 0 10px rgba(34, 197, 94, 0.8)",
              }}
            />
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "rgba(255, 255, 255, 0.65)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontFamily: "monospace",
              }}
            >
              Systems • Infrastructure • Product
            </span>
          </div>

          {/* Name */}
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#FFFFFF",
              margin: "0 0 10px 0",
              textAlign: "center",
              letterSpacing: "-2px",
              textShadow: "0 2px 24px rgba(0,0,0,0.8)",
            }}
          >
            Tushar Kanti Dey
          </h1>

          {/* Role */}
          <p
            style={{
              fontSize: "22px",
              color: "#60a5fa",
              margin: "0 0 16px 0",
              fontWeight: 600,
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              fontFamily: "monospace",
            }}
          >
            Full Stack Developer and DevOps Engineer
          </p>

          {/* Tagline */}
          <p
            style={{
              fontSize: "19px",
              color: "rgba(255, 255, 255, 0.68)",
              margin: "0 0 26px 0",
              textAlign: "center",
              maxWidth: "760px",
              lineHeight: 1.45,
            }}
          >
            Building scalable full-stack products, connecting polished interfaces with reliable systems &amp; cloud architecture.
          </p>

          {/* Tech Stack Badges */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 28,
            }}
          >
            {["Next.js", "TypeScript", "React", "Node.js", "Docker", "PostgreSQL"].map((tech) => (
              <div
                key={tech}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "6px 14px",
                  borderRadius: 9999,
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          {/* Website URL Pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 24px",
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "9999px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.4)",
            }}
          >
            <span
              style={{
                fontSize: "15px",
                color: "rgba(255, 255, 255, 0.85)",
                fontWeight: 500,
                letterSpacing: "0.03em",
                fontFamily: "monospace",
              }}
            >
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
