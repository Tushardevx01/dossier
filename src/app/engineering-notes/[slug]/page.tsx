import { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogArticlePage } from "@/components/BlogArticlePage";
import { generateBlogStaticParams, getBlogPost } from "@/lib/blogLoader";
import "prismjs/themes/prism-tomorrow.css";

interface GenerateMetadataParams {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: GenerateMetadataParams
): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogPost(slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  const baseUrl = "https://tushardevx01.dev";
  const articleUrl = `${baseUrl}/engineering-notes/${slug}`;

  return {
    title: `${article.title} — Tushar DevX`,
    description: article.description,
    authors: [{ name: "Tushar DevX" }],
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url: articleUrl,
      publishedTime: article.date,
      authors: ["Tushar DevX"],
      tags: [article.category],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
    keywords: [article.category, "engineering", "software development"],
  };
}

export function generateStaticParams() {
  return generateBlogStaticParams();
}

export default async function EngineeringNotesArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getBlogPost(slug);

  if (!article) {
    notFound();
  }

  return <BlogArticlePage post={article} slug={slug} />;
}
