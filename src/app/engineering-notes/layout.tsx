import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Notes - Tushar Kanti Dey",
  description:
    "Technical articles by Tushar Kanti Dey covering systems architecture, DevOps, full-stack development, and production engineering lessons.",
  keywords: [
    "Tushar Kanti Dey",
    "engineering notes",
    "technical articles",
    "systems architecture",
    "DevOps",
    "full-stack development",
    "production engineering",
  ],
  openGraph: {
    title: "Engineering Notes - Tushar Kanti Dey",
    description:
      "Technical articles by Tushar Kanti Dey covering systems architecture, DevOps, full-stack development, and production engineering lessons.",
    url: "https://www.tushardevx01.tech/engineering-notes",
    siteName: "Tushar Kanti Dey",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Notes - Tushar Kanti Dey",
    description:
      "Technical articles by Tushar Kanti Dey on systems architecture, DevOps, and production engineering.",
    creator: "@tushardevX01",
  },
  alternates: {
    canonical: "https://www.tushardevx01.tech/engineering-notes",
  },
};

export default function EngineeringNotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
