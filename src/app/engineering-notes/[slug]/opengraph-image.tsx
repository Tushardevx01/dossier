import { ImageResponse } from "next/og";

import { getArticle } from "@/lib/articleLoader";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

interface ImageRouteProps {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: ImageRouteProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  const title = article?.title ?? "Engineering Notes";
  const category = article?.category ?? "Engineering";

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
        <div style={{ fontSize: 24, color: "#9CA3AF" }}>Engineering Notes</div>
        <div>
          <div style={{ fontSize: 20, color: "#4ade80", marginBottom: 14 }}>{category}</div>
          <div style={{ fontSize: 58, lineHeight: 1.1, letterSpacing: "-1px", maxWidth: "1060px" }}>{title}</div>
        </div>
        <div style={{ fontSize: 24, color: "#9CA3AF" }}>tushardevx01.tech</div>
      </div>
    ),
    {
      ...size,
    }
  );
}
