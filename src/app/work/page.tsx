import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/shared/JsonLd";
import { projectsData } from "@/constant/projects";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { generateBreadcrumbListStructuredData } from "@/lib/structured-data";
import { ProjectCard } from "@/components/case-study/ProjectCard";
import { nasalization, mono } from "@/app/fonts";
import { Navbar, Footer, Background } from "@/components/common";
import { LuArrowLeft } from "react-icons/lu";

export const metadata: Metadata = buildPageMetadata({
  title: "Engineering Systems & Case Studies | Tushar Kanti Dey",
  description:
    "Engineering case studies by Tushar Kanti Dey covering distributed systems, job orchestration, autonomous resilience engines, and full-stack web platforms.",
  path: "/work",
  keywords: ["engineering case studies", "distributed systems", "Go", "Kafka", "Docker", "Next.js", "Tushar Kanti Dey"],
});

export default function WorkPage() {
  const breadcrumbSchema = generateBreadcrumbListStructuredData([
    { name: "Tushar Kanti Dey", url: absoluteUrl("/") },
    { name: "Work", url: absoluteUrl("/work") },
  ]);

  return (
    <div className="min-h-screen bg-black text-foreground relative">
      <Background />
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-24 relative z-10 space-y-12">
        <JsonLd data={breadcrumbSchema} />

        {/* Back & Breadcrumb */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-white transition-colors group"
          >
            <LuArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>RETURN HOME</span>
          </Link>
          <span className="font-mono text-xs text-emerald-400">
            {projectsData.length} SYSTEMS DOCUMENTED
          </span>
        </div>

        {/* Header */}
        <header className="space-y-4">
          <span className={`${mono.className} text-[11px] tracking-[0.24em] text-neutral-500 uppercase font-semibold block`}>
            ENGINEERING DOSSIER
          </span>
          <h1 className={`${nasalization.className} text-4xl sm:text-6xl font-bold text-white uppercase tracking-tight`}>
            SELECTED WORK & CASE STUDIES
          </h1>
          <p className="text-base sm:text-lg text-neutral-400 font-sans max-w-3xl leading-relaxed">
            Technical postmortems, architecture breakdowns, problem statements, and verifiable outcomes from production systems.
          </p>
        </header>

        {/* Projects List */}
        <div className="space-y-8 pt-6">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
