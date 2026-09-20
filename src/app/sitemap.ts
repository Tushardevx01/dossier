import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllCaseStudies } from "@/lib/case-studies";
import { getAllArticles } from "@/lib/articleLoader";

function safeDate(value: string | Date | null | undefined, fallback = new Date()): Date {
  if (!value) return fallback;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL.replace(/\/$/, "");

  let caseStudies: Awaited<ReturnType<typeof getAllCaseStudies>> = [];
  let articles: Awaited<ReturnType<typeof getAllArticles>> = [];

  try {
    [caseStudies, articles] = await Promise.all([
      getAllCaseStudies(),
      getAllArticles(),
    ]);
  } catch {
    // Graceful degradation: return a minimal sitemap if DB is unreachable
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...caseStudies.map((cs) => ({
      url: `${baseUrl}/work/${cs.slug}`,
      lastModified: safeDate(cs.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    {
      url: `${baseUrl}/engineering-notes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...articles.map((article) => ({
      url: `${baseUrl}/engineering-notes/${article.slug}`,
      lastModified: safeDate(article.date),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
