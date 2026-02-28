/**
 * Home Page (Server Component)
 *
 * The route file stays thin — all client state and dynamic imports
 * are encapsulated in HomePageShell.
 */

import { HomePageShell } from "@/components/HomePageShell";

export default function Home() {
  return <HomePageShell />;
}
