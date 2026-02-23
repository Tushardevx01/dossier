import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Tushardevx01",
  description: "Articles and insights about web development, design, and technology",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
