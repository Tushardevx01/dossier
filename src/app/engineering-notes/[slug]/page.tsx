import { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticlePage } from "@/components/ArticlePage";
import { JsonLd } from "@/components/shared/JsonLd";
import { generateArticleStaticParams, getAllArticles, getArticle } from "@/lib/articleLoader";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { generateArticleStructuredData } from "@/lib/structured-data";
import "prismjs/themes/prism-tomorrow.css";

export const revalidate = 60;

interface GenerateMetadataParams {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: GenerateMetadataParams
): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

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
    image: absoluteUrl(`/engineering-notes/${slug}/opengraph-image`),
  });
}

export async function generateStaticParams() {
  return await generateArticleStaticParams();
}

export default async function EngineeringNotesArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const articleStructuredData = generateArticleStructuredData({
    title: article.title,
    description: article.description,
    slug,
    publishedAt: new Date(article.date).toISOString(),
  });

  return (
    <>
      <JsonLd data={articleStructuredData} />
      <ArticlePage post={article} slug={slug} />
    </>
  );
}
