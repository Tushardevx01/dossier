import type { Metadata } from "next";
import { resumeKeywords } from "@/constant";
import { generateResumeStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Resume - Tushar kanti Dey",
  description:
    "View and download Tushar kanti Dey's professional resume. Student developer with expertise in React, Next.js, and full-stack development.",
  keywords: resumeKeywords,
  openGraph: {
    title: "Resume - Tushar kanti Dey",
    description:
      "View and download Tushar kanti Dey's professional resume featuring his experience and skills as a student developer.",
    url: "https://tushar.vercel.app",
    siteName: "Tushar kanti Dey",
    images: [
      {
        url: "/images/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Tushar kanti Dey Resume",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume - Tushar kanti Dey",
    description:
      "View Tushar kanti Dey's professional resume and experience as a student developer.",
    images: ["/images/thumbnail.png"],
  },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(resumeStructuredData),
        }}
      />
      {children}
    </>
  );
}
