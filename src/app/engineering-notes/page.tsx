import type { Metadata } from "next";

import { nasalization } from "@/app/fonts";
import { NotesListClient } from "@/components/NotesListClient";
import NotesBackHandler from "@/components/NotesBackHandler";
import { JsonLd } from "@/components/shared/JsonLd";
import { getAllArticles, getArticleCategories } from "@/lib/articleLoader";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { generateBreadcrumbListStructuredData, generateEngineeringNotesItemListStructuredData } from "@/lib/structured-data";

export const revalidate = 60;

export const metadata: Metadata = buildPageMetadata({
  title: "Engineering Notes | Tushar Kanti Dey",
  description:
    "Technical articles by Tushar Kanti Dey covering systems architecture, full stack development, deployment strategy, and production engineering decisions.",
  path: "/engineering-notes",
  keywords: ["Full Stack Developer and DevOps Engineer", "Next.js Developer India", "Portfolio of Full Stack Developer"],
});

export default async function EngineeringNotesPage() {
  const posts = await getAllArticles();
  const categories = await getArticleCategories();

  const breadcrumbSchema = generateBreadcrumbListStructuredData([
    { name: "Tushar Kanti Dey", url: absoluteUrl("/") },
    { name: "Engineering Notes", url: absoluteUrl("/engineering-notes") },
  ]);

  const itemListSchema = generateEngineeringNotesItemListStructuredData(posts);

  return (
    <div className="min-h-screen bg-black">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />
      <NotesBackHandler />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-20 sm:pb-28">
        <h1
          className={`${nasalization.className} text-4xl sm:text-6xl lg:text-7xl font-semibold text-white mb-5 sm:mb-6 tracking-tight leading-tight`}
        >
          Engineering Notes
        </h1>
        <p className="text-base sm:text-lg text-neutral-400 max-w-2xl leading-relaxed">
          Articles on architecture choices, production trade-offs, and the systems behind web products that stay reliable after launch.
        </p>
      </section>

      <NotesListClient posts={posts} categories={categories} />
    </div>
  );
}
