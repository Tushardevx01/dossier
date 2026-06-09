import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/shared/JsonLd";
import { projectsData } from "@/constant/projects";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { generateBreadcrumbListStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Projects | Tushar Kanti Dey",
  description:
    "Project portfolio of Tushar Kanti Dey covering full stack, real-time, and production-grade engineering systems.",
  path: "/projects",
  keywords: ["projects", "full stack", "devops", "case studies"],
});

export default function ProjectsPage() {
  const breadcrumbSchema = generateBreadcrumbListStructuredData([
    { name: "Tushar Kanti Dey", url: absoluteUrl("/") },
    { name: "Projects", url: absoluteUrl("/projects") },
  ]);

  return (
    <main className="min-h-screen bg-black">
      <JsonLd data={breadcrumbSchema} />
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16">
        <h1 className="text-4xl sm:text-6xl font-semibold text-white tracking-tight">Projects</h1>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">
        <div className="space-y-6">
          {projectsData.map((project) => (
            <article key={project.slug} className="border border-neutral-800 rounded-xl p-6 sm:p-8 bg-neutral-950/30">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white">{project.name}</h2>
              <p className="mt-3 text-neutral-400 leading-relaxed">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-neutral-300">
                <Link href={`/projects/${project.slug}`} className="underline underline-offset-4 hover:text-white">
                  View project details
                </Link>
                <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white">
                  GitHub
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
