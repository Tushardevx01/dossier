/**
 * Home Page (Server Component)
 *
 * The route file stays thin — all client state and dynamic imports
 * are encapsulated in HomePageShell.
 */

import type { Metadata } from "next";

import { HomePageShell } from "@/components/HomePageShell";
import { JsonLd } from "@/components/shared/JsonLd";
import { projectsData } from "@/constant/projects";
import { getAllArticles } from "@/lib/articleLoader";
import { buildPageMetadata } from "@/lib/seo";
import {
  generateEngineeringNotesItemListStructuredData,
  generateOrganizationStructuredData,
  generatePersonStructuredData,
  generateSoftwareApplicationStructuredData,
  generateWebsiteStructuredData,
} from "@/lib/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Tushar Kanti Dey | Full Stack Developer and DevOps Engineer",
  description:
    "Portfolio of Tushar Kanti Dey, a Full Stack Developer and DevOps Engineer building scalable Next.js apps, real-time systems, and product-ready web experiences.",
  path: "/",
  keywords: [
    "Full Stack Developer and DevOps Engineer",
    "Next.js Developer India",
    "Real-Time App Developer",
  ],
});

export default function Home() {
  const latestNotes = getAllArticles().slice(0, 6);
  const featuredProject = projectsData[0];

  const homepageSchemas = [
    generatePersonStructuredData(),
    generateWebsiteStructuredData(),
    generateOrganizationStructuredData(),
    generateEngineeringNotesItemListStructuredData(latestNotes),
    generateSoftwareApplicationStructuredData(featuredProject),
  ];

  return (
    <>
      {homepageSchemas.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}
      <HomePageShell />
    </>
  );
}
