import { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticlePage } from "@/components/ArticlePage";
import { generateArticleStaticParams, getArticle } from "@/lib/articleLoader";
import "prismjs/themes/prism-tomorrow.css";

interface GenerateMetadataParams {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: GenerateMetadataParams
): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

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
  return generateArticleStaticParams();
}

export default async function EngineeringNotesArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  return <ArticlePage post={article} slug={slug} />;
}
