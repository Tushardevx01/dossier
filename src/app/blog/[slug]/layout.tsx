import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Article - Engineering Notes",
  description: "Read an engineering article from Tushardevx01 about systems, architecture, and DevOps.",
};

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
