import type { Metadata } from "next";

import { nasalization } from "@/app/fonts";
import { Navbar, Footer, Background } from "@/components/common";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import { generateBreadcrumbListStructuredData } from "@/lib/structured-data";
import { getAllCredentials } from "@/lib/credentials";
import { CredentialsRegistry } from "@/components/credentials/CredentialsRegistry";

export const revalidate = 60;

export const metadata: Metadata = buildPageMetadata({
  title: "Credentials | Tushar Kanti Dey",
  description:
    "A structured archive of verified technical certifications and engineering credentials.",
  path: "/credentials",
  keywords: [
    "Tushar Kanti Dey credentials",
    "Tushar Kanti Dey certifications",
    "Verified Credentials Registry",
    "Software Engineer Qualifications",
    "Cloudflare R2 Certificates",
  ],
});

export default async function CredentialsPage() {
  const credentialsList = await getAllCredentials();

  const breadcrumbsSchema = generateBreadcrumbListStructuredData([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Credentials", url: absoluteUrl("/credentials") },
  ]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/20">
      <Background />
      <Navbar credentialCount={credentialsList.length} />
      <JsonLd data={breadcrumbsSchema} />

      {/* Header Section (matching 2-column grid layout & proportions) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-10 sm:pb-12">
        <h1
          className={`${nasalization.className} text-4xl sm:text-6xl lg:text-7xl font-semibold text-white mb-5 sm:mb-6 tracking-tight leading-tight`}
        >
          Credentials
        </h1>

        <p className="text-base sm:text-lg text-neutral-400 max-w-2xl leading-relaxed">
          A structured archive of verified technical certifications and engineering credentials.
        </p>
      </section>

      {/* Registry Controls & Records List */}
      <CredentialsRegistry credentials={credentialsList} />

      <Footer />
    </div>
  );
}
