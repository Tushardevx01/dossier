import "./globals.css";
import type { Metadata, Viewport } from "next"; // Added Viewport for better mobile ranking

import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";

import { JsonLd } from "@/components/shared/JsonLd";
import { inter, mono, nasalization, quentine } from "./fonts";

import {
  generatePersonStructuredData,
  generateWebsiteStructuredData,
  generateOrganizationStructuredData,
} from "@/lib/structured-data";
import { SITE_URL, siteConfig } from "@/lib/site";

// 1. IMPROVED VIEWPORT: Google rewards "mobile-first" high-performance layouts
export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Allows accessibility zooming (Google ranking factor)
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`, // Dynamic titles help internal pages rank
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name, url: SITE_URL }],
  creator: siteConfig.name,
  publisher: siteConfig.name, // Added publisher for authority
  referrer: "origin-when-cross-origin",
  category: "technology",
  
  // 2. KEYWORD CLUSTERING: Grouping your skills to help Google's AI understand your niche
  keywords: [
    "Full Stack Developer",
    "DevOps Engineer",
    "Next.js Expert",
    "React Engineer",
    "TypeScript Specialist",
    "Tailwind CSS Designer",
    "Kolkata Software Developer",
    "Adamas University",
    "Zenyte Analytics",
    "namespace Ecosystems",
    "Web Performance Optimization"
  ],

  alternates: {
    canonical: "/", // Using relative path is safer for Next.js consistency
  },

  robots: {
    index: true,
    follow: true,
    nocache: false, // Allow caching for speed
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

  // ... (Icons and Manifest remain the same)
  icons: {
    icon: "/favicon.ico", // Simplified for faster discovery
    apple: "/apple-touch-icon.png",
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@tushardevX01",
    images: [`${SITE_URL}/api/og`], // Pro-tip: Use an API route for dynamic OG images
  },

  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: SITE_URL,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/api/og`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Portfolio Preview`,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 3. AGGREGATED DATA: Combining these into one call improves hydration speed
  const personStructuredData = generatePersonStructuredData();
  const websiteStructuredData = generateWebsiteStructuredData();
  const organizationStructuredData = generateOrganizationStructuredData();

  return (
    <html lang="en" className="scroll-smooth"> 
      <body
        className={`${inter.variable} ${mono.variable} ${nasalization.variable} ${quentine.variable} font-sans antialiased`}
      >
        {/* Structured Data helps Google create "Rich Snippets" (those fancy boxes in search) */}
        <JsonLd data={personStructuredData} />
        <JsonLd data={websiteStructuredData} />
        <JsonLd data={organizationStructuredData} />
        
        <main>{children}</main>
        
        <Toaster position="bottom-right" richColors closeButton />
        <Analytics />
      </body>
    </html>
  );
}