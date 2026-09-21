import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  LuArrowLeft,
  LuAward,
  LuCalendar,
} from "react-icons/lu";

import { Navbar, Footer, Background } from "@/components/common";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { generateBreadcrumbListStructuredData } from "@/lib/structured-data";
import {
  getCredentialBySlugOrId,
  getAllCredentials,
  getAllCredentialSlugs,
} from "@/lib/credentials";
import {
  formatFullDate,
  slugifyTitle,
} from "@/lib/credential-utils";
import { CertificatePreviewWrapper } from "@/components/credentials/CertificatePreviewWrapper";
import { renderMarkdownToHtml } from "@/lib/markdown";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllCredentialSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!slug?.trim()) return { title: "Credential Not Found" };

  const cred = await getCredentialBySlugOrId(slug);
  if (!cred) return { title: "Credential Not Found" };

  const canonicalSlug = cred.slug || slugifyTitle(cred.title);

  return buildPageMetadata({
    title: `${cred.title} | Certification | Tushar Kanti Dey`,
    description:
      cred.description
        ? cred.description.replace(/[#*`_>|~[\]()-]/g, " ").replace(/\s+/g, " ").trim().slice(0, 160)
        : `Certification credential record for ${cred.title} issued by ${cred.issuer}.`,
    path: `/credentials/${canonicalSlug}`,
    keywords: [
      cred.title,
      cred.issuer,
      "Certification",
      "Credential",
      "Tushar Kanti Dey",
    ].filter(Boolean) as string[],
  });
}

export default async function CredentialDetailPage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug?.trim()) {
    notFound();
  }

  const [cred, allCreds] = await Promise.all([
    getCredentialBySlugOrId(slug),
    getAllCredentials(),
  ]);

  if (!cred) {
    notFound();
  }

  const credSlug = cred.slug || slugifyTitle(cred.title);
  const isVerified = Boolean(cred.credentialLink && cred.credentialLink.trim().length > 0);

  const breadcrumbsSchema = generateBreadcrumbListStructuredData([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Certifications", url: absoluteUrl("/credentials") },
    { name: cred.title, url: absoluteUrl(`/credentials/${credSlug}`) },
  ]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/20 relative flex flex-col justify-between">
      <Background />
      <Navbar credentialCount={allCreds.length} />
      <JsonLd data={breadcrumbsSchema} />

      <main className="max-w-[720px] mx-auto px-4 sm:px-6 md:px-8 pt-28 sm:pt-32 pb-24 sm:pb-32 w-full">

        {/* Page Header */}
        <div className="flex items-center justify-between pb-5 mb-8 sm:mb-10 border-b border-neutral-800/80">
          <Link
            href="/credentials"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors group"
          >
            <LuArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Certifications</span>
          </Link>

          {/* Status indicator */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono tracking-wider uppercase ${
                isVerified
                  ? "text-emerald-400/90 bg-emerald-950/30 border border-emerald-900/40"
                  : "text-neutral-400 bg-neutral-900/60 border border-neutral-800/80"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isVerified ? "bg-emerald-400" : "bg-neutral-500"
                }`}
              />
              {isVerified ? "VERIFIED" : "RECORDED"}
            </span>
          </div>
        </div>

        {/* Certificate Preview */}
        <div className="mb-8 sm:mb-10">
          <CertificatePreviewWrapper credential={cred} />
        </div>

        {/* Credential Information */}
        <div className="mb-6">
          <div className="text-xs font-mono tracking-widest text-neutral-400 uppercase mb-3">
            CERTIFICATION
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight leading-[1.16]">
            {cred.title}
          </h1>
        </div>

        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-6 sm:mb-8 text-xs font-mono text-neutral-400">
          {cred.issuer && (
            <div className="inline-flex items-center gap-2 text-neutral-300">
              <LuAward className="w-3.5 h-3.5 text-neutral-400" />
              <span>{cred.issuer}</span>
            </div>
          )}

          <div className="inline-flex items-center gap-2 text-neutral-300">
            <LuCalendar className="w-3.5 h-3.5 text-neutral-400" />
            <time dateTime={new Date(cred.issueDate).toISOString()}>
              {formatFullDate(cred.issueDate)}
            </time>
          </div>
        </div>

        {/* Long-Form Markdown Description / Article */}
        {cred.description ? (
          <article className="article-content">
            <div
              className="prose prose-invert max-w-none text-neutral-300"
              dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(cred.description) }}
            />
          </article>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}
