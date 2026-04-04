import { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticlePage } from "@/components/ArticlePage";
import { generateArticleStaticParams, getArticle } from "@/lib/articleLoader";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
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

  return buildPageMetadata({
    title: `${article.title} | Tushar Kanti Dey`,
    description: article.description,
    path: `/engineering-notes/${slug}`,
    type: "article",
    keywords: [article.category, "engineering", "software development", "Tushar Kanti Dey"],
    image: absoluteUrl("/engineering-notes/opengraph-image"),
  });
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
