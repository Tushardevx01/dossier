import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tushardevx01.tech",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "github-readme-activity-graph.vercel.app",
        port: "",
        pathname: "/graph",
      },
      {
        protocol: "https",
        hostname: "camo.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  compress: true,
  poweredByHeader: false,

  experimental: {
    globalNotFound: true,
  },

  // Standalone output for Docker only (set DOCKER_BUILD=true when building Docker image)
  // Vercel uses default serverless output - do NOT enable standalone for Vercel
  ...(process.env.DOCKER_BUILD === "true" ? { output: "standalone" } : {}),

  // No experimental features for deployment stability

  async headers() {
    const isDev = process.env.NODE_ENV !== "production";
    const scriptSrc = [
      "'self'",
      "'unsafe-inline'",
      "https://va.vercel-scripts.com",
      ...(isDev ? ["'unsafe-eval'"] : []),
    ].join(" ");

    const contentSecurityPolicy = [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "form-action 'self'",
      `script-src ${scriptSrc}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://tushardevx01.tech https://github-readme-activity-graph.vercel.app https://camo.githubusercontent.com",
      "font-src 'self' data:",
      "connect-src 'self' https://vitals.vercel-insights.com",
      "upgrade-insecure-requests",
    ].join("; ");

    const commonSecurityHeaders = [
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
      { key: "X-DNS-Prefetch-Control", value: "off" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), accelerometer=(), gyroscope=()" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
      { key: "Content-Security-Policy", value: contentSecurityPolicy },
    ];

    return [
      {
        source: "/api/:path*",
        headers: [
          ...commonSecurityHeaders,
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
      {
        source: "/(.*)",
        headers: commonSecurityHeaders,
      },
    ];
  },

  async redirects() {
    return [
      { source: "/work", destination: "/#selected-work", permanent: false },
      { source: "/blog", destination: "/engineering-notes", permanent: true },
      { source: "/blog/:slug", destination: "/engineering-notes/:slug", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/email", destination: "mailto:thetushardev0@gmail.com", permanent: true },
      { source: "/directresume", destination: "/docs/Resume.pdf", permanent: true },
      { source: "/direct-resume", destination: "/docs/Resume.pdf", permanent: true },
      { source: "/github", destination: "https://www.github.com/tushardevx01", permanent: true },
    ];
  },
};

export default nextConfig;

