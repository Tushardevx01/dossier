import type { TechIconKey } from "./tech-icons";

export interface Skill {
  techKey: TechIconKey;
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
      { techKey: "TypeScript" },
      { techKey: "React" },
      { techKey: "Next.js" },
      { techKey: "Tailwind CSS" },
      { techKey: "JavaScript" },
    ],
  },
  {
    title: "Backend Services",
    skills: [
      { techKey: "Node.js" },
      { techKey: "Express.js" },
      { techKey: "NestJS" },
      { techKey: "JWT / OAuth" },
      { techKey: "WebSockets" },
    ],
  },
  {
    title: "Data Layer",
    skills: [
      { techKey: "Supabase" },
      { techKey: "MySQL" },
      { techKey: "Prisma" },
      { techKey: "MongoDB" },
    ],
  },
  {
    title: "Infrastructure",
    skills: [
      { techKey: "Docker" },
      { techKey: "Google Cloud" },
      { techKey: "Vercel" },
      { techKey: "Render" },
    ],
  },
  {
    title: "Tooling",
    skills: [
      { techKey: "Git" },
      { techKey: "GitHub" },
      { techKey: "Postman" },
      { techKey: "ESLint" },
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
      { techKey: "HTML5" },
      { techKey: "CSS3" },
      { techKey: "SASS" },
      { techKey: "React Native" },
      { techKey: "Radix UI" },
      { techKey: "Framer Motion" },
      { techKey: "Webpack" },
    ],
  },
  {
    title: "Backend & Services",
    skills: [
      { techKey: "NestJS" },
      { techKey: "JWT / OAuth" },
      { techKey: "WebSockets" },
      { techKey: "NPM" },
      { techKey: "Nodemon" },
    ],
  },
  {
    title: "Data & Persistence",
    skills: [
      { techKey: "MySQL" },
      { techKey: "MongoDB" },
      { techKey: "Appwrite" },
      { techKey: "Redis" },
      { techKey: "Prisma" },
    ],
  },
  {
    title: "Cloud & Edge",
    skills: [
      { techKey: "Google Cloud" },
      { techKey: "Netlify" },
      { techKey: "Vercel" },
      { techKey: "Render" },
    ],
  },
  {
    title: "Tooling & Operations",
    skills: [
      { techKey: "GitHub" },
      { techKey: "Postman" },
      { techKey: "ESLint" },
      { techKey: "Linux(Fedora)" },
      { techKey: "OpenAPI" },
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
      { techKey: "C" },
      { techKey: "C++" },
      { techKey: "Java" },
      { techKey: "Shell (Bash)" },
      { techKey: "Python" },

    ],
  },
  {
    title: "Design & Specification",
    skills: [
      { techKey: "Figma" },
      { techKey: "Canva" },
      { techKey: "Photoshop" },
      { techKey: "Illustrator" },
      { techKey: "XD" },
    ],
  },
];
