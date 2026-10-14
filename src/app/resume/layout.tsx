import { JsonLd } from "@/components/shared/JsonLd";
import { generateResumeStructuredData } from "@/lib/structured-data";

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
