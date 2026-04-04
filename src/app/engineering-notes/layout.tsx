import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Engineering Notes | Tushar Kanti Dey",
  description:
    "Technical articles by Tushar Kanti Dey covering systems architecture, full stack development, deployment strategy, and production engineering decisions.",
  path: "/engineering-notes",
  keywords: [
    "engineering notes",
    "technical articles",
    "systems architecture",
    "full-stack development",
    "production engineering",
  ],
});

export default function EngineeringNotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
