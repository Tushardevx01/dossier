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
import {
  generateEngineeringNotesItemListStructuredData,
  generateOrganizationStructuredData,
  generatePersonStructuredData,
  generateSoftwareApplicationStructuredData,
  generateWebsiteStructuredData,
} from "@/lib/structured-data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: { absolute: "Tushar Kanti Dey | Full-Stack Developer & DevOps Engineer" },
  description:
    "Tushar Kanti Dey — Full-Stack Developer and DevOps Engineer based in Kolkata, India. I build production-grade Next.js and Node.js applications, CI/CD pipelines, and scalable real-time systems focused on reliability and product outcomes.",
};

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
