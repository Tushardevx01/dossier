import type { Project } from "@/types/project";

export const projectsData = [
  {
    slug: "simpui",
    name: "SimpUI",
    description:
      "Component system with motion primitives, design tokens, and reuse patterns. Built for teams that need consistency across large product surfaces without sacrificing velocity.",
    github_link: "https://github.com/AbhishekS04/SimpyUI",
    demo: "https://simpyui.vercel.app/",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    role: "Frontend Systems",
  },
  {
    slug: "signifiya",
    name: "Signifiya",
    description:
      "Event operations platform — schedules, registration, live coordination. Handles peak traffic with real-time state sync across distributed teams and attendees.",
    github_link: "https://github.com/AbhishekS04/signifiyaAppFinal",
    demo: "https://signifiya.in",
    tech: ["Next.js", "Expo", "Supabase"],
    role: "Full-Stack Platform",
  },
  {
    slug: "carepulse",
    name: "CarePulse",
    description:
      "Healthcare platform for clinics — appointment workflows, provider integrations, patient data handling. Built with strict security constraints and production-grade error boundaries.",
    github_link: "https://github.com/Tusharxhub/carepulse",
    demo: "https://carepulse-brown-omega.vercel.app/",
    tech: ["TypeScript", "Appwrite", "Next.js"],
    role: "Full-Stack + Integrations",
  },
  {
    slug: "fenix",
    name: "Fenix",
    description:
      "Real-time video platform with low-latency media, secure auth, and session stability under variable network conditions. Focused on connection reliability over feature count.",
    github_link: "https://github.com/Tusharxhub/Fenix",
    demo: "https://fenix-ecru.vercel.app/",
    tech: ["Next.js", "Clerk", "LiveKit"],
    role: "Realtime Infrastructure",
  },
  {
    slug: "webscope",
    name: "WebScope",
    description:
      "Web intelligence platform — extraction, processing, and structured output from dynamic sources. Clean service boundaries with failure-aware retry logic and rate-limited crawling.",
    github_link: "https://github.com/Tusharxhub/webscope",
    demo: "https://webscope-three.vercel.app",
    tech: ["Next.js", "Node.js", "API Integration"],
    role: "System Architecture",
  },
  {
    slug: "subscription-tracker",
    name: "Subscription Tracker",
    description:
      "REST API for subscription lifecycle management — tracking, automated reminders, cost projections. Designed for predictable financial operations with auditable state transitions.",
    github_link: "https://github.com/Tusharxhub/subscription-tracker",
    demo: "https://subscription-tracker-jet.vercel.app/",
    tech: ["Node.js", "Express", "MongoDB"],
    role: "Backend API",
  },
] satisfies Project[];
