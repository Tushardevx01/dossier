import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticlePage } from "@/components/ArticlePage";
import { JsonLd } from "@/components/shared/JsonLd";
import { generateArticleStaticParams, getAllArticles, getArticle } from "@/lib/articleLoader";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { generateArticleStructuredData } from "@/lib/structured-data";
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
    image: absoluteUrl(`/engineering-notes/${slug}/opengraph-image`),
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

  const allArticles = getAllArticles();
  const relatedArticles = allArticles.filter((item) => item.slug !== slug).slice(0, 2);

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
      <nav aria-label="Related engineering notes" className="sr-only">
        <ul>
          {relatedArticles.map((item) => (
            <li key={item.slug}>
              <Link href={`/engineering-notes/${item.slug}`}>{item.title}</Link>
            </li>
          ))}
          <li>
            <Link href="/projects">Projects</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
