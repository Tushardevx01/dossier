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

export const revalidate = 60;

export const metadata: Metadata = buildPageMetadata({
  title: "Tushar Kanti Dey — Full-Stack Developer & DevOps Engineer (Kolkata, India)",
  description:
    "Tushar Kanti Dey is a full-stack developer and DevOps engineer based near Kolkata, India. Building scalable Next.js apps, real-time systems, and product-ready web experiences.",
  path: "/",
  keywords: [
    "Tushar Kanti Dey",
    "Full Stack Developer and DevOps Engineer",
    "Next.js Developer India",
    "Real-Time App Developer",
    "Barasat developer",
    "West Bengal developer",
    "Kolkata full stack developer",
  ],
});

export default async function Home() {
  const latestNotes = (await getAllArticles()).slice(0, 6);
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
