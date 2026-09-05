import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import {
  generateBreadcrumbListStructuredData,
  generateCaseStudyStructuredData,
} from "@/lib/structured-data";
import { UniversalCaseStudy } from "@/components/case-study/UniversalCaseStudy";
import {
  getCaseStudyBySlug,
  getAllCaseStudySlugs,
  getAllCaseStudies,
} from "@/lib/case-studies";
import { Navbar, Footer, Background } from "@/components/common";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Project Not Found",
      robots: { index: false, follow: false },
    };
  }

  return buildPageMetadata({
    title: `${caseStudy.title} — Architecture & Case Study | Tushar Kanti Dey`,
    description: `${caseStudy.subtitle}. ${caseStudy.excerpt}`,
    path: `/projects/${caseStudy.slug}`,
    type: "article",
    keywords: [
      ...caseStudy.tags,
      caseStudy.category,
      "case study",
      "software architecture",
      "Tushar Kanti Dey",
    ],
  });
}

export async function generateStaticParams() {
  const slugs = await getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const allCaseStudies = await getAllCaseStudies();
  const currentIndex = allCaseStudies.findIndex((cs) => cs.slug === caseStudy.slug);
  const nextCaseStudy =
    allCaseStudies.length > 1 && currentIndex !== -1
      ? allCaseStudies[(currentIndex + 1) % allCaseStudies.length]
      : null;

  const projectSchema = generateCaseStudyStructuredData({
    title: caseStudy.title,
    description: caseStudy.excerpt,
    slug: caseStudy.slug,
  });

  const breadcrumbSchema = generateBreadcrumbListStructuredData([
    { name: "Tushar Kanti Dey", url: absoluteUrl("/") },
    { name: "Projects", url: absoluteUrl("/projects") },
    { name: caseStudy.title, url: absoluteUrl(`/projects/${caseStudy.slug}`) },
  ]);

  return (
    <div className="min-h-screen bg-black text-foreground relative">
      <Background />
      <Navbar />
      <JsonLd data={projectSchema} />
      <JsonLd data={breadcrumbSchema} />
      <UniversalCaseStudy caseStudy={caseStudy} nextCaseStudy={nextCaseStudy} />
      <Footer />
    </div>
  );
}
