import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/shared/JsonLd";
import { projectsData } from "@/constant/projects";
import { getAllArticles } from "@/lib/articleLoader";
import { buildPageMetadata } from "@/lib/seo";
import { generateBreadcrumbListStructuredData, generateCaseStudyStructuredData, generateSoftwareApplicationStructuredData } from "@/lib/structured-data";
import { absoluteUrl } from "@/lib/seo";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
      robots: { index: false, follow: false },
    };
  }

  return buildPageMetadata({
    title: `${project.name} | Projects`,
    description: project.description,
    path: `/projects/${project.slug}`,
    type: "article",
    keywords: [...project.tech, project.role, "project details", "Tushar Kanti Dey"],
  });
}

export function generateStaticParams() {
  return projectsData.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsData.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const linkedNotes = (await getAllArticles()).slice(0, 2);
  const projectSchema = generateCaseStudyStructuredData({
    title: project.name,
    description: project.description,
    slug: project.slug,
  });
  const softwareSchema = generateSoftwareApplicationStructuredData(project);
  const breadcrumbSchema = generateBreadcrumbListStructuredData([
    { name: "Tushar Kanti Dey", url: absoluteUrl("/") },
    { name: "Projects", url: absoluteUrl("/projects") },
    { name: project.name, url: absoluteUrl(`/projects/${project.slug}`) },
  ]);

  return (
    <main className="min-h-screen bg-black">
      <JsonLd data={projectSchema} />
      <JsonLd data={softwareSchema} />
      <JsonLd data={breadcrumbSchema} />
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16">
        <h1 className="text-4xl sm:text-6xl font-semibold text-white tracking-tight">{project.name}</h1>
        <p className="mt-5 text-base sm:text-lg text-neutral-400 max-w-3xl leading-relaxed">{project.description}</p>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">
        <div className="flex flex-wrap gap-2.5 mb-8">
          {project.tech.map((item) => (
            <span key={item} className="px-2.5 py-1 rounded text-xs border border-neutral-700 text-neutral-300">
              {item}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-5 text-neutral-300">
          <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white">
            View GitHub repository
          </a>
          {project.demo ? (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white">
              Open live demo
            </a>
          ) : null}
          <Link href="/projects" className="underline underline-offset-4 hover:text-white">
            Back to projects
          </Link>
        </div>

        <nav aria-label="Related engineering notes" className="sr-only">
          <ul>
            {linkedNotes.map((item) => (
              <li key={item.slug}>
                <Link href={`/engineering-notes/${item.slug}`}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer link back to homepage for entity reinforcement */}
        <div className="mt-16 pt-8 border-t border-neutral-800">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-medium text-neutral-400 hover:text-white transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Tushar Kanti Dey&apos;s Portfolio
          </Link>
        </div>
      </section>
    </main>
  );
}
