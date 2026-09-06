import React from "react";
import type { IconType } from "react-icons";
import { FaDocker, FaGithub, FaReact } from "react-icons/fa6";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiShadcnui,
  SiAppwrite,
  SiSentry,
  SiVercel,
  SiGo,
  SiApachekafka,
  SiKubernetes,
  SiPostgresql,
  SiRedis,
  SiPython,
  SiMongodb,
  SiMongoose,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiPrisma,
  SiExpo,
  SiWebrtc,
  SiClerk,
  SiSupabase,
  SiUpstash,
  SiRazorpay,
  SiCheerio,
  SiAxios,
  SiJsonwebtokens,
  SiRadixui,
  SiLinux,
  SiFramer,
  SiJavascript,
  SiGraphql,
  SiZod,
  SiPrometheus,
} from "react-icons/si";
import { TbBrandTwilio } from "react-icons/tb";
import { LuGlobe, LuLock, LuMail, LuVideo, LuCode } from "react-icons/lu";

export const techIconMap: Record<string, IconType> = {
  // Languages & Core Runtimes
  go: SiGo,
  golang: SiGo,
  typescript: SiTypescript,
  ts: SiTypescript,
  javascript: SiJavascript,
  js: SiJavascript,
  python: SiPython,
  "node.js": SiNodedotjs,
  nodejs: SiNodedotjs,
  node: SiNodedotjs,

  // Frameworks & Libraries
  react: FaReact,
  "react native": FaReact,
  "next.js": SiNextdotjs,
  nextjs: SiNextdotjs,
  "next.js 14": SiNextdotjs,
  "next.js 14 app router": SiNextdotjs,
  nextauth: SiNextdotjs,
  express: SiExpress,
  "express 4": SiExpress,
  "express.js": SiExpress,
  nestjs: SiNestjs,
  expo: SiExpo,
  "expo sdk 54": SiExpo,
  "expo react native": SiExpo,
  "tailwind css": SiTailwindcss,
  tailwind: SiTailwindcss,
  nativewind: SiTailwindcss,
  "shadcn/ui": SiShadcnui,
  shadcn: SiShadcnui,
  "radix ui": SiRadixui,
  "framer motion": SiFramer,
  framer: SiFramer,

  // Databases & ORMs
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  mongodb: SiMongodb,
  mongoose: SiMongoose,
  redis: SiRedis,
  supabase: SiSupabase,
  prisma: SiPrisma,

  // Infrastructure, Cloud & DevOps
  docker: FaDocker,
  "docker / podman": FaDocker,
  "docker engine api": FaDocker,
  linux: SiLinux,
  "linux cgroups": SiLinux,
  kubernetes: SiKubernetes,
  kafka: SiApachekafka,
  apachekafka: SiApachekafka,
  upstash: SiUpstash,
  "upstash workflow": SiUpstash,
  vercel: SiVercel,
  prometheus: SiPrometheus,
  "prometheus metrics": SiPrometheus,

  // Services & APIs
  appwrite: SiAppwrite,
  clerk: SiClerk,
  "clerk auth": SiClerk,
  twilio: TbBrandTwilio,
  "twilio sms": TbBrandTwilio,
  sentry: SiSentry,
  razorpay: SiRazorpay,
  cheerio: SiCheerio,
  axios: SiAxios,
  jwt: SiJsonwebtokens,
  zod: SiZod,
  graphql: SiGraphql,
  github: FaGithub,
  "github api": FaGithub,
  "github graphql api": FaGithub,

  // Realtime & Media
  webrtc: SiWebrtc,
  "stream video": LuVideo,
  "stream video sdk": LuVideo,
  "stream node sdk": LuVideo,

  // Protocols & Utilities
  lucide: LuCode,
  http: LuGlobe,
  rest: LuGlobe,
  nodemailer: LuMail,
  bcryptjs: LuLock,
  "better auth": LuLock,
};

export const techColorMap: Record<string, string> = {
  go: "#00ADD8",
  golang: "#00ADD8",
  typescript: "#3178C6",
  ts: "#3178C6",
  javascript: "#F7DF1E",
  js: "#F7DF1E",
  python: "#3776AB",
  "node.js": "#5FA04E",
  nodejs: "#5FA04E",
  node: "#5FA04E",

  react: "#61DAFB",
  "react native": "#61DAFB",
  "next.js": "#FFFFFF",
  nextjs: "#FFFFFF",
  "next.js 14": "#FFFFFF",
  "next.js 14 app router": "#FFFFFF",
  nextauth: "#FFFFFF",
  express: "#FFFFFF",
  "express 4": "#FFFFFF",
  "express.js": "#FFFFFF",
  nestjs: "#E0234E",
  expo: "#FFFFFF",
  "expo sdk 54": "#FFFFFF",
  "expo react native": "#FFFFFF",
  "tailwind css": "#06B6D4",
  tailwind: "#06B6D4",
  nativewind: "#06B6D4",
  "shadcn/ui": "#FFFFFF",
  shadcn: "#FFFFFF",
  "radix ui": "#FFFFFF",
  "framer motion": "#0055FF",
  framer: "#0055FF",

  postgresql: "#4169E1",
  postgres: "#4169E1",
  mongodb: "#47A248",
  mongoose: "#880000",
  redis: "#DC382D",
  supabase: "#3ECF8E",
  prisma: "#5A67D8",

  docker: "#2496ED",
  "docker / podman": "#2496ED",
  "docker engine api": "#2496ED",
  linux: "#FCC624",
  "linux cgroups": "#FCC624",
  kubernetes: "#326CE5",
  kafka: "#FFFFFF",
  apachekafka: "#FFFFFF",
  upstash: "#00E9A3",
  "upstash workflow": "#00E9A3",
  vercel: "#FFFFFF",
  prometheus: "#E6522C",
  "prometheus metrics": "#E6522C",

  appwrite: "#FD366E",
  clerk: "#6C47FF",
  "clerk auth": "#6C47FF",
  twilio: "#F22F46",
  "twilio sms": "#F22F46",
  sentry: "#9B51E0",
  razorpay: "#3395FF",
  cheerio: "#E88C1F",
  axios: "#5A29E4",
  jwt: "#D63AFF",
  zod: "#3E67B1",
  graphql: "#E10098",
  github: "#FFFFFF",
  "github api": "#FFFFFF",
  "github graphql api": "#FFFFFF",

  webrtc: "#FF5C5C",
  "stream video": "#005FFF",
  "stream video sdk": "#005FFF",
  "stream node sdk": "#005FFF",

  lucide: "#CBD5E1",
  http: "#00D26A",
  rest: "#00D26A",
  nodemailer: "#00B4D8",
  bcryptjs: "#E53E3E",
  "better auth": "#3ECF8E",
};

export function getTechIcon(name: string): IconType | null {
  const key = name.toLowerCase().trim();
  if (techIconMap[key]) return techIconMap[key];
  for (const [techKey, icon] of Object.entries(techIconMap)) {
    if (key.includes(techKey) || techKey.includes(key)) return icon;
  }
  return LuCode;
}

export function getTechColor(name: string): string {
  const key = name.toLowerCase().trim();
  if (techColorMap[key]) return techColorMap[key];
  for (const [techKey, color] of Object.entries(techColorMap)) {
    if (key.includes(techKey) || techKey.includes(key)) return color;
  }
  return "#A3A3A3";
}

export interface TechBadgeProps {
  name: string;
  size?: "sm" | "md";
  className?: string;
}

export const TechBadge: React.FC<TechBadgeProps> = ({
  name,
  size = "sm",
  className = "",
}) => {
  const Icon = getTechIcon(name);
  const color = getTechColor(name);

  const sizeClasses =
    size === "md"
      ? "px-3.5 py-2 text-xs gap-2"
      : "px-3 py-1.5 text-xs gap-2";

  return (
    <span
      className={`inline-flex items-center rounded-lg font-mono text-neutral-300 bg-[#0c0c0e] border border-neutral-800 hover:border-neutral-700 transition-colors select-none ${sizeClasses} ${className}`}
    >
      {Icon && (
        <Icon
          className="w-3.5 h-3.5 shrink-0"
          style={{ color }}
          aria-hidden="true"
        />
      )}
      <span>{name}</span>
    </span>
  );
};
