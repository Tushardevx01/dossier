import { MetadataRoute } from "next";
import { generateArticleStaticParams } from "@/lib/articleLoader";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.tushardevx01.tech";
  const lastModified = new Date("2026-03-03");
  const engineeringNotesSlugs = generateArticleStaticParams();

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
  ];
}
