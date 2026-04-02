import "./globals.css";
import type { Metadata } from "next";

import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";

import { inter, mono, nasalization, quentine } from "./fonts";

import {
  generatePersonStructuredData,
  generateWebsiteStructuredData,
  generateOrganizationStructuredData,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  applicationName: "Tushar Kanti Dey",
  title: "Tushar Kanti Dey | Full Stack Developer & DevOps Engineer",
  description:
    "Portfolio of Tushar Kanti Dey, 3rd-year B.Tech CSE student at Adamas University. Full Stack Developer & DevOps Engineer specializing in full-stack engineering, scalable web apps, and DevOps automation.",
  authors: [
    {
      name: "Tushar Kanti Dey",
      url: "https://tushardevx01.tech",
    },
  ],
  creator: "Tushar Kanti Dey",
  referrer: "origin-when-cross-origin",
  category: "Portfolio",
  classification: "Software Development",
  keywords: ["Tushar Kanti Dey", "Tushar Dev", "Full Stack Developer", "DevOps Engineer", "Cloud Engineering", "CI/CD", "React", "Java", "Docker", "Kubernetes", "Adamas University"],
  metadataBase: new URL("https://www.tushardevx01.tech"),


  alternates: {
    canonical: "https://www.tushardevx01.tech",
    languages: {
      "en-US": "https://www.tushardevx01.tech",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "1c8e801d4931baa4",
  },
  appleWebApp: {
    capable: true,
    title: "Tushar Kanti Dey",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/manifest.json",

  twitter: {
    card: "summary_large_image",
    title: "Tushar Kanti Dey | Full Stack & DevOps Engineer",
    description: "Full Stack Developer & DevOps Engineer building scalable web apps with Next.js, React, Node.js, and cloud infrastructure.",
    site: "@tushardevX01",
    creator: "@tushardevX01",
    images: [
      {
        url: "https://www.tushardevx01.tech/assets/devops-portfolio-preview.png",
        width: 1200,
        height: 630,
        alt: "Tushar Kanti Dey - Full Stack Developer Portfolio",
      },
    ],
  },

  openGraph: {
    title: "Tushar Kanti Dey | Full Stack & DevOps Expert",
    description:
      "Bridging the gap between development and operations. 3rd-year B.Tech CSE student at Adamas University focusing on automated CI/CD and full-stack systems.",
    url: "https://www.tushardevx01.tech/",
    siteName: "Tushar Kanti Dey - Portfolio",
    images: [
      {
        url: "https://www.tushardevx01.tech/assets/devops-portfolio-preview.png",
        width: 1200,
        height: 630,
        alt: "Tushar Kanti Dey - Full Stack Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personStructuredData = generatePersonStructuredData();
  const websiteStructuredData = generateWebsiteStructuredData();
  const organizationStructuredData = generateOrganizationStructuredData();

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${mono.variable} ${nasalization.variable} ${quentine.variable} font-sans`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        {children}
        <Toaster position="bottom-right" richColors closeButton />
        <Analytics />
      </body>
    </html>
  );
}
