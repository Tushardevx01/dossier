import { MetadataRoute } from "next";
import { generateArticleStaticParams } from "@/lib/articleLoader";
import { generateBuildLogStaticParams } from "@/lib/buildLogLoader";
import { generateProjectStaticParams } from "@/lib/projectLoader";
import { generateSystemDesignStaticParams } from "@/lib/systemDesignLoader";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.tushardevx01.tech";
  const lastModified = new Date("2026-03-03");
  const engineeringNotesSlugs = generateArticleStaticParams();
  const projectSlugs = generateProjectStaticParams();
  const buildLogEntries = generateBuildLogStaticParams();
  const systemDesignSlugs = generateSystemDesignStaticParams();

  return [
    // Homepage - highest priority
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    // Engineering Notes index
    {
      url: `${baseUrl}/engineering-notes`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    // Individual engineering notes
    ...engineeringNotesSlugs.map(({ slug }) => ({
      url: `${baseUrl}/engineering-notes/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // Resume page
    {
      url: `${baseUrl}/resume`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/build-log`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...buildLogEntries.map(({ entry }) => ({
      url: `${baseUrl}/build-log/${entry}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${baseUrl}/system-design`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    ...systemDesignSlugs.map(({ slug }) => ({
      url: `${baseUrl}/system-design/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...projectSlugs.map(({ slug }) => ({
      url: `${baseUrl}/projects/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/engineering-philosophy`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/now`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ];
}
