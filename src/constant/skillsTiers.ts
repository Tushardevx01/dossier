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

interface Skill {
  title: string;
  logoComponent: React.ElementType;
  color?: string;
}

interface SkillsCategory {
  title: string;
  skills: Skill[];
}

interface SkillsTier {
  label: string;
  description: string;
  categories: SkillsCategory[];
}

/**
 * PRIMARY STACK (Core Identity)
 * 10-12 production-level technologies representing core specialization
 * Visually emphasized with larger cards/icons
 */
export const primaryStack: SkillsCategory[] = [
  {
    title: "Languages & Frameworks",
    skills: [
      { title: "TypeScript", logoComponent: SiTypescript, color: "#3178C6" },
      { title: "React", logoComponent: FaReact, color: "#61DAFB" },
      { title: "Next.js", logoComponent: SiNextdotjs, color: "#000000" },
      { title: "Node.js", logoComponent: SiNodedotjs, color: "#339933" },
      { title: "Express.js", logoComponent: SiExpress, color: "#000000" },
    ],
  },
  {
    title: "Data & Infrastructure",
    skills: [
      { title: "Supabase", logoComponent: SiSupabase, color: "#3ECF8E" },
      { title: "Docker", logoComponent: FaDocker, color: "#2496ED" },
      { title: "Git", logoComponent: FaGitAlt, color: "#F05032" },
    ],
  },
  {
    title: "Styling & UI",
    skills: [
      { title: "Tailwind CSS", logoComponent: SiTailwindcss, color: "#06B6D4" },
      { title: "JavaScript", logoComponent: SiJavascript, color: "#F7DF1E" },
    ],
  },
];

/**
 * SUPPORTING TOOLS (Operational Layer)
 * Medium emphasis tools used regularly in workflow, deployment, and architecture
 */
export const supportingStack: SkillsCategory[] = [
  {
    title: "Frontend Ecosystem",
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
    title: "Backend & APIs",
    skills: [
      { title: "NestJS", logoComponent: SiNestjs, color: "#E0234E" },
      { title: "JWT / OAuth", logoComponent: SiJsonwebtokens, color: "#000000" },
      { title: "WebSockets", logoComponent: SiSocketdotio, color: "#010101" },
      { title: "NPM", logoComponent: SiNpm, color: "#CB3837" },
      { title: "Nodemon", logoComponent: SiNodedotjs, color: "#76D04B" },
    ],
  },
  {
    title: "Databases & Libraries",
    skills: [
      { title: "MySQL", logoComponent: SiMysql, color: "#4479A1" },
      { title: "MongoDB", logoComponent: SiMongodb, color: "#47A248" },
      { title: "Appwrite", logoComponent: SiAppwrite, color: "#F02E65" },
      { title: "Redis", logoComponent: SiRedis, color: "#DC382D" },
      { title: "Prisma", logoComponent: SiPrisma, color: "#2D3748" },
    ],
  },
  {
    title: "Cloud & Deployment",
    skills: [
      { title: "Google Cloud", logoComponent: SiGooglecloud, color: "#4285F4" },
      { title: "Netlify", logoComponent: SiNetlify, color: "#00C7B7" },
      { title: "Vercel", logoComponent: SiVercel, color: "#000000" },
      { title: "Render", logoComponent: SiRender, color: "#46E3B7" },
    ],
  },
  {
    title: "DevOps & Tools",
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
 * ADDITIONAL TECHNOLOGIES (Exploration Layer)
 * Collapsible section for broader experience and emerging interests
 */
export const additionalStack: SkillsCategory[] = [
  {
    title: "Programming Languages",
    skills: [
      { title: "C", logoComponent: SiC, color: "#A8B9CC" },
      { title: "C++", logoComponent: TbBrandCpp, color: "#00599C" },
      { title: "Java", logoComponent: FaJava, color: "#007396" },
      { title: "Shell (Bash)", logoComponent: SiGnubash, color: "#4EAA25" },
      { title: "Python", logoComponent: FaPython, color: "#3776AB" },

    ],
  },
  {
    title: "UI/UX & Design",
    skills: [
      { title: "Figma", logoComponent: SiFigma, color: "#F24E1E" },
      { title: "Canva", logoComponent: SiCanva, color: "#00C4CC" },
      { title: "Photoshop", logoComponent: SiAdobephotoshop, color: "#31A8FF" },
      { title: "Illustrator", logoComponent: SiAdobeillustrator, color: "#FF9A00" },
      { title: "XD", logoComponent: SiAdobexd, color: "#FF61F6" },
    ],
  },
]
