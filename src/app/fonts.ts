import localFont from "next/font/local";

/**
 * Local font setup (next/font/local).
 *
 * Fonts are self-hosted from src/assets/fonts and preloaded by Next.js —
 * no manual @font-face declarations, no layout shift (display: swap), and
 * no remote font fetches during builds.
 *
 * Every font is used with `.className` at its call sites; the Tailwind
 * `font-*` utilities additionally map to the CSS variables below.
 */

// Nasalization — all main headings (widely used across sections/pages)
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

// Quentine — display font used for the hero name only
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

// Monospace accents (imports as `mono.className`)
// Resolves via the CSS stack `var(--font-mono), monospace`
export const mono = {
  className: "font-mono",
} as const;
