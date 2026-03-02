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

  const baseUrl = "https://tushardevx01.tech";
  const articleUrl = `${baseUrl}/engineering-notes/${slug}`;

  return {
    title: `${article.title} | Tushar Kanti Dey`,
    description: article.description,
    authors: [{ name: "Tushar Kanti Dey", url: baseUrl }],
    creator: "Tushar Kanti Dey",
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: `${article.title} | Tushar Kanti Dey`,
      description: article.description,
      type: "article",
      url: articleUrl,
      publishedTime: article.date,
      authors: ["Tushar Kanti Dey"],
      tags: [article.category, "engineering", "software development"],
      siteName: "Tushar Kanti Dey - Portfolio",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      creator: "@tushardevX01",
    },
    keywords: [article.category, "engineering", "software development", "Tushar Kanti Dey"],
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
