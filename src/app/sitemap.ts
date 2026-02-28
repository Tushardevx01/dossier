import { MetadataRoute } from "next";
import { generateArticleStaticParams } from "@/lib/articleLoader";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tushardevx01.vercel.app";
  const lastModified = new Date();
  const engineeringNotesSlugs = generateArticleStaticParams();

  const sections = [
    { id: "", priority: 1.0 },
    { id: "#about", priority: 0.9 },
    { id: "#skills", priority: 0.8 },
    { id: "#experience", priority: 0.8 },
    { id: "#projects", priority: 0.9 },
    { id: "#contact", priority: 0.8 },
  ];

  const mainPageEntries = sections.map((section) => ({
    url: `${baseUrl}/${section.id}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: section.priority,
  }));

  return [
    ...mainPageEntries,
    {
      url: `${baseUrl}/engineering-notes`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...engineeringNotesSlugs.map(({ slug }) => ({
      url: `${baseUrl}/engineering-notes/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${baseUrl}/resume`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/docs/Resume.pdf`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ];
}
