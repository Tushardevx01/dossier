import "./globals.css";
import type { Metadata } from "next";

import { SITE_URL, defaultSeoKeywords, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.fullName}`,
  },
  description: siteConfig.description,
  keywords: defaultSeoKeywords,
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.json",
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.fullName, url: SITE_URL }],
  creator: siteConfig.fullName,
  publisher: siteConfig.fullName,
  icons: {
    icon: ["/favicon.ico", "/favicon-32x32.png", "/favicon-16x16.png", "/android-chrome-192x192.png", "/android-chrome-512x512.png"],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: SITE_URL,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} portfolio preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@tushardevX01",
    images: ["/twitter-image"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className="font-sans antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}