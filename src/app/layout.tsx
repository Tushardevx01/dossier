import "./globals.css";
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import { defaultSeoKeywords, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.fullName}`,
  },
  description: siteConfig.description,
  keywords: defaultSeoKeywords,
  alternates: {
    canonical: absoluteUrl("/"),
  },
  manifest: "/manifest.json",
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.fullName, url: absoluteUrl("/") }],
  icons: {
    icon: ["/android-chrome-192x192.png", "/android-chrome-512x512.png"],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
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
    images: [absoluteUrl("/opengraph-image")],
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