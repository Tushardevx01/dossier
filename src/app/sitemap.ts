import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllCaseStudies } from "@/lib/case-studies";
import { getAllArticles } from "@/lib/articleLoader";
import { getAllCredentials, slugifyTitle } from "@/lib/credentials";

function safeDate(value: string | Date | null | undefined, fallback = new Date()): Date {
  if (!value) return fallback;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL.replace(/\/$/, "");

  let caseStudies: Awaited<ReturnType<typeof getAllCaseStudies>> = [];
  let articles: Awaited<ReturnType<typeof getAllArticles>> = [];
  let credentialsList: Awaited<ReturnType<typeof getAllCredentials>> = [];

  try {
    [caseStudies, articles, credentialsList] = await Promise.all([
      getAllCaseStudies(),
      getAllArticles(),
      getAllCredentials(),
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
      url: `${baseUrl}/credentials`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...credentialsList.map((cred) => ({
      url: `${baseUrl}/credentials/${cred.slug || slugifyTitle(cred.title)}`,
      lastModified: safeDate(cred.updatedAt || cred.createdAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
