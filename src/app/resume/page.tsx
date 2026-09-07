import type { Metadata } from "next";
import { ResumePage } from "@/components/resume/ResumePage";
import { resumeKeywords } from "@/constant";
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

export default function Resume() {
  return <ResumePage />;
}
