import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

// Inter for all paragraph text and body content
export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// JetBrains Mono for subheadings, code, and dashboard aesthetics
export const mono = JetBrains_Mono({
  weight: ["300", "400", "500", "600"],
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

// Nasalization for all main headings
export const nasalization = localFont({
  src: [
    {
      path: "../assets/fonts/nasalization.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-nasalization",
  display: "swap",
});

// Quentine specifically for my name
export const quentine = localFont({
  src: [
    {
      path: "../assets/fonts/quentin.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-quentine",
  display: "swap",
});
