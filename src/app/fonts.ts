import localFont from "next/font/local";

// Keep font exports stable without remote Google font fetches during builds.
export const inter = {
  className: "",
  variable: "",
} as const;

export const mono = {
  className: "",
  variable: "",
} as const;

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

