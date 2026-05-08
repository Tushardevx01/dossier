import { MetadataRoute } from "next";
import { projectsData } from "@/constant/projects";
import { generateArticleStaticParams } from "@/lib/articleLoader";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;
  const now = new Date();
  const engineeringNotesSlugs = await generateArticleStaticParams();
  const projectSlugs = projectsData.map((project) => project.slug);

  return [
    // Homepage - highest priority
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    // About page - critical for personal brand entity
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.95,
    },
    // Engineering Notes index
    {
      url: `${baseUrl}/engineering-notes`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    // Projects index
    {
      url: `${baseUrl}/projects`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    // Individual project pages
    ...projectSlugs.map((slug) => ({
      url: `${baseUrl}/projects/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Individual engineering notes
    ...engineeringNotesSlugs.map(({ slug }) => ({
      url: `${baseUrl}/engineering-notes/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    // Resume page
    {
      url: `${baseUrl}/resume`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];
}
