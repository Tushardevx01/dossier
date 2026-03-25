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

  // Standalone output for Docker only (set DOCKER_BUILD=true when building Docker image)
  // Vercel uses default serverless output - do NOT enable standalone for Vercel
  ...(process.env.DOCKER_BUILD === "true" ? { output: "standalone" } : {}),

  // No experimental features for deployment stability

  async headers() {
    const contentSecurityPolicy = [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'self'",
      "object-src 'none'",
      "form-action 'self'",
      "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://tushardevx01.tech https://github-readme-activity-graph.vercel.app https://camo.githubusercontent.com",
      "font-src 'self' data:",
      "connect-src 'self' https://vitals.vercel-insights.com",
      "frame-src 'self'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
          { key: "X-DNS-Prefetch-Control", value: "off" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), accelerometer=(), gyroscope=()",
          },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          {
            key: "X-Robots-Tag",
            value: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      { source: "/blog", destination: "/engineering-notes", permanent: true },
      { source: "/blog/:slug", destination: "/engineering-notes/:slug", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/email", destination: "mailto:Tushar.Dey@gmail.com", permanent: true },
      { source: "/directresume", destination: "/docs/Resume.pdf", permanent: true },
      { source: "/direct-resume", destination: "/docs/Resume.pdf", permanent: true },
      { source: "/github", destination: "https://www.github.com/Tusharxhub", permanent: true },
    ];
  },
};

export default nextConfig;

