import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/JsonLd";
import { resumeKeywords } from "@/constant";
import { generateResumeStructuredData } from "@/lib/structured-data";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Resume | Tushar Kanti Dey",
    description:
      "View and download Tushar Kanti Dey's professional resume. Full stack developer focused on scalable Next.js apps, product engineering, and premium UI delivery.",
    path: "/resume",
    keywords: resumeKeywords,
    image: "/resume/opengraph-image",
  }),
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const resumeStructuredData = generateResumeStructuredData();

  return (
    <>
      <link
        rel="preload"
        href="/docs/Resume.pdf"
        as="fetch"
        type="application/pdf"
        crossOrigin="anonymous"
      />
      <JsonLd data={resumeStructuredData} />
      {children}
    </>
  );
}
