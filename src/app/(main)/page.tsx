/**
 * Home Page (Server Component)
 *
 * The route file stays thin — all client state and dynamic imports
 * are encapsulated in HomePageShell.
 */

import type { Metadata } from "next";

import { HomePageShell } from "@/components/HomePageShell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Tushar Kanti Dey | Full Stack Developer in Kolkata",
  description:
    "Portfolio of Tushar Kanti Dey, a full stack developer in Kolkata building scalable Next.js apps, real-time systems, and product-ready web experiences.",
  path: "/",
  keywords: [
    "Full Stack Developer in Kolkata",
    "Next.js Developer India",
    "Real-Time App Developer",
  ],
});

export default function Home() {
  return <HomePageShell />;
}
