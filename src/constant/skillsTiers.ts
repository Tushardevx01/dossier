import React from "react";
import { MdApi } from "react-icons/md";

import {
  FaCss3,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJava,
  FaPython,
  FaReact,
  FaDocker,
} from "react-icons/fa6";

import {
  SiExpress,
  SiFirebase,
  SiFramer,
  SiMongodb,
  SiMysql,
  SiNetlify,
  SiNextdotjs,
  SiPostman,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiRedis,
  SiSupabase,
  SiPrisma,
  SiGooglecloud,
  SiRender,
  SiAppwrite,
  SiWeb3Dotjs,
  SiEslint,
  SiNodedotjs,
  SiNestjs,
  SiNpm,
  SiGnubash,
  SiC,
  SiFigma,
  SiCanva,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAdobexd,
  SiSass,
  SiWebpack,
  SiRadixui,
  SiJsonwebtokens,
  SiSocketdotio,
  SiJavascript,
  SiFedora,
  SiOpenai,
} from "react-icons/si";

import { TbBrandCpp } from "react-icons/tb";

export interface Skill {
  title: string;
  logoComponent: React.ElementType;
  color?: string;
}

export interface SkillsCategory {
  title: string;
  skills: Skill[];
}

export interface SkillsTier {
  label: string;
  description: string;
  categories: SkillsCategory[];
}

/**
 * PRIMARY STACK
 * Technologies I build production systems with daily.
 */
export const primaryStack: SkillsCategory[] = [
  {
    title: "Application Layer",
    skills: [
      { title: "TypeScript", logoComponent: SiTypescript, color: "#3178C6" },
      { title: "React", logoComponent: FaReact, color: "#61DAFB" },
      { title: "Next.js", logoComponent: SiNextdotjs, color: "#000000" },
      { title: "Tailwind CSS", logoComponent: SiTailwindcss, color: "#06B6D4" },
      { title: "JavaScript", logoComponent: SiJavascript, color: "#F7DF1E" },
    ],
  },
  {
    title: "Backend Services",
    skills: [
      { title: "Node.js", logoComponent: SiNodedotjs, color: "#339933" },
      { title: "Express.js", logoComponent: SiExpress, color: "#000000" },
      { title: "NestJS", logoComponent: SiNestjs, color: "#E0234E" },
      { title: "JWT / OAuth", logoComponent: SiJsonwebtokens, color: "#000000" },
      { title: "WebSockets", logoComponent: SiSocketdotio, color: "#010101" },
    ],
  },
  {
    title: "Data Layer",
    skills: [
      { title: "Supabase", logoComponent: SiSupabase, color: "#3ECF8E" },
      { title: "MySQL", logoComponent: SiMysql, color: "#4479A1" },
      { title: "Prisma", logoComponent: SiPrisma, color: "#2D3748" },
      { title: "MongoDB", logoComponent: SiMongodb, color: "#47A248" },
    ],
  },
  {
    title: "Infrastructure",
    skills: [
      { title: "Docker", logoComponent: FaDocker, color: "#2496ED" },
      { title: "Google Cloud", logoComponent: SiGooglecloud, color: "#4285F4" },
      { title: "Vercel", logoComponent: SiVercel, color: "#000000" },
      { title: "Render", logoComponent: SiRender, color: "#46E3B7" },
    ],
  },
  {
    title: "Tooling",
    skills: [
      { title: "Git", logoComponent: FaGitAlt, color: "#F05032" },
      { title: "GitHub", logoComponent: FaGithub, color: "#181717" },
      { title: "Postman", logoComponent: SiPostman, color: "#FF6C37" },
      { title: "ESLint", logoComponent: SiEslint, color: "#4B32C3" },
    ],
  },
];

/**
 * SUPPORTING TOOLS
 * Regular tools for deployment, architecture, and operational workflow.
 */
export const supportingStack: SkillsCategory[] = [
  {
    title: "Frontend & Motion",
    skills: [
      { title: "HTML5", logoComponent: FaHtml5, color: "#E34F26" },
      { title: "CSS3", logoComponent: FaCss3, color: "#1572B6" },
      { title: "SASS", logoComponent: SiSass, color: "#CC6699" },
      { title: "React Native", logoComponent: FaReact, color: "#61DAFB" },
      { title: "Radix UI", logoComponent: SiRadixui, color: "#161618" },
      { title: "Framer Motion", logoComponent: SiFramer, color: "#0055FF" },
      { title: "Webpack", logoComponent: SiWebpack, color: "#8DD6F9" },
    ],
  },
  {
    title: "Backend & Services",
    skills: [
      { title: "NestJS", logoComponent: SiNestjs, color: "#E0234E" },
      { title: "JWT / OAuth", logoComponent: SiJsonwebtokens, color: "#000000" },
      { title: "WebSockets", logoComponent: SiSocketdotio, color: "#010101" },
      { title: "NPM", logoComponent: SiNpm, color: "#CB3837" },
      { title: "Nodemon", logoComponent: SiNodedotjs, color: "#76D04B" },
    ],
  },
  {
    title: "Data & Persistence",
    skills: [
      { title: "MySQL", logoComponent: SiMysql, color: "#4479A1" },
      { title: "MongoDB", logoComponent: SiMongodb, color: "#47A248" },
      { title: "Appwrite", logoComponent: SiAppwrite, color: "#F02E65" },
      { title: "Redis", logoComponent: SiRedis, color: "#DC382D" },
      { title: "Prisma", logoComponent: SiPrisma, color: "#2D3748" },
    ],
  },
  {
    title: "Cloud & Edge",
    skills: [
      { title: "Google Cloud", logoComponent: SiGooglecloud, color: "#4285F4" },
      { title: "Netlify", logoComponent: SiNetlify, color: "#00C7B7" },
      { title: "Vercel", logoComponent: SiVercel, color: "#000000" },
      { title: "Render", logoComponent: SiRender, color: "#46E3B7" },
    ],
  },
  {
    title: "Tooling & Operations",
    skills: [
      { title: "GitHub", logoComponent: FaGithub, color: "#181717" },
      { title: "Postman", logoComponent: SiPostman, color: "#FF6C37" },
      { title: "ESLint", logoComponent: SiEslint, color: "#4B32C3" },
      { title: "Linux(Fedora)", logoComponent: SiFedora, color: "#51A2DA" },
      { title: "OpenAPI", logoComponent: SiOpenai, color: "#FFFFFF" },
    ],
  },
];

/**
 * ADDITIONAL TECHNOLOGIES
 * Broader experience from systems programming and design work.
 */
export const additionalStack: SkillsCategory[] = [
  {
    title: "Systems & Scripting",
    skills: [
      { title: "C", logoComponent: SiC, color: "#A8B9CC" },
      { title: "C++", logoComponent: TbBrandCpp, color: "#00599C" },
      { title: "Java", logoComponent: FaJava, color: "#007396" },
      { title: "Shell (Bash)", logoComponent: SiGnubash, color: "#4EAA25" },
      { title: "Python", logoComponent: FaPython, color: "#3776AB" },

    ],
  },
  {
    title: "Design & Specification",
    skills: [
      { title: "Figma", logoComponent: SiFigma, color: "#F24E1E" },
      { title: "Canva", logoComponent: SiCanva, color: "#00C4CC" },
      { title: "Photoshop", logoComponent: SiAdobephotoshop, color: "#31A8FF" },
      { title: "Illustrator", logoComponent: SiAdobeillustrator, color: "#FF9A00" },
      { title: "XD", logoComponent: SiAdobexd, color: "#FF61F6" },
    ],
  },
]
