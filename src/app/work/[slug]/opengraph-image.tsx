import { ImageResponse } from "next/og";

import { getCaseStudyBySlug } from "@/lib/case-studies";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};
export const alt = "Case Study";

interface ImageRouteProps {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: ImageRouteProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  const title = caseStudy?.title ?? "Case Study";
  const category = caseStudy?.category ?? "Architecture";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
          color: "#ffffff",
          padding: "48px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              fontSize: 14,
              color: "#0a0a0a",
              background: "#4ade80",
              padding: "6px 14px",
              borderRadius: 6,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            CASE STUDY
          </div>
          <div style={{ fontSize: 20, color: "#9CA3AF" }}>{category}</div>
        </div>
        <div>
          <div
            style={{
              fontSize: 58,
              lineHeight: 1.1,
              letterSpacing: "-1px",
              maxWidth: "1060px",
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#9CA3AF" }}>tushardevx01.tech</div>
      </div>
    ),
    {
      ...size,
    }
  );
}
