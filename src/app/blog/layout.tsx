import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Notes - Tushardevx01",
  description: "Articles about systems architecture, DevOps, full-stack development, and production engineering lessons.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
