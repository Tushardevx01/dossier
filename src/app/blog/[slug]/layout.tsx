import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Post",
  description: "Read the full blog post",
};

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
