import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/shared/JsonLd";
import { projectsData } from "@/constant/projects";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import {
  generateBreadcrumbListStructuredData,
  generateCaseStudyStructuredData,
  generateSoftwareApplicationStructuredData,
} from "@/lib/structured-data";
import { ProjectCaseStudy } from "@/components/case-study/ProjectCaseStudy";
import { Navbar, Footer, Background } from "@/components/common";

interface WorkDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Case Study Not Found",
      robots: { index: false, follow: false },
    };
  }

  return buildPageMetadata({
    title: `${project.name} — Architecture & Case Study | Tushar Kanti Dey`,
    description: `${project.subtitle}. ${project.problem}`,
    path: `/work/${project.slug}`,
    type: "article",
    keywords: [...project.tech, project.role, "case study", "software architecture", "Tushar Kanti Dey"],
  });
}

export function generateStaticParams() {
  return projectsData.map((project) => ({ slug: project.slug }));
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const projectIndex = projectsData.findIndex((item) => item.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projectsData[projectIndex];
  const nextProject = projectsData[(projectIndex + 1) % projectsData.length];

  const projectSchema = generateCaseStudyStructuredData({
    title: project.name,
    description: project.description,
    slug: project.slug,
  });
  const softwareSchema = generateSoftwareApplicationStructuredData(project);
  const breadcrumbSchema = generateBreadcrumbListStructuredData([
    { name: "Tushar Kanti Dey", url: absoluteUrl("/") },
    { name: "Work", url: absoluteUrl("/work") },
    { name: project.name, url: absoluteUrl(`/work/${project.slug}`) },
  ]);

  return (
    <div className="min-h-screen bg-black text-foreground relative">
      <Background />
      <Navbar />
      <JsonLd data={projectSchema} />
      <JsonLd data={softwareSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ProjectCaseStudy project={project} nextProject={nextProject} />
      <Footer />
    </div>
  );
}
