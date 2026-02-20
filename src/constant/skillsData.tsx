import React from "react";

import {
  FaCss3,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJava,
  FaLaptopCode,
  FaMobile,
  FaPython,
  FaReact,
  FaSquareJs,
  FaBootstrap,
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
  SiCloudflare,
  SiGooglecloud,
  SiAmazon,
  SiRender,
  SiAppwrite,
  SiWeb3Dotjs,
  SiEslint,
} from "react-icons/si";

import { TbBrandCpp } from "react-icons/tb";
import { GrOracle } from "react-icons/gr";
import { MdApi } from "react-icons/md";
import { FaDocker, FaLinux } from "react-icons/fa";

interface LogoProps {
  title: string;
  logoComponent: React.ElementType;
  color?: string;
}

interface SkillsDataProps {
  title: string;
  data: LogoProps[];
}

export const skillsData: SkillsDataProps[] = [
  {
    title: "Programming Languages",
    data: [
      { title: "C", logoComponent: TbBrandCpp, color: "#00599C" },
      { title: "C++", logoComponent: TbBrandCpp, color: "#00599C" },
      { title: "Java", logoComponent: FaJava, color: "#007396" },
      { title: "Python", logoComponent: FaPython, color: "#3776AB" },
      { title: "JavaScript", logoComponent: FaSquareJs, color: "#F7DF1E" },
      { title: "TypeScript", logoComponent: SiTypescript, color: "#3178C6" },
      { title: "Shell", logoComponent: FaSquareJs, color: "#5391FE" },
    ],
  },
  {
    title: "Frontend Development",
    data: [
      { title: "HTML5", logoComponent: FaHtml5, color: "#E34F26" },
      { title: "CSS3", logoComponent: FaCss3, color: "#1572B6" },
      { title: "SASS", logoComponent: FaCss3, color: "#CC6699" },
      { title: "Tailwind CSS", logoComponent: SiTailwindcss, color: "#06B6D4" },
      { title: "Next.js", logoComponent: SiNextdotjs, color: "#ffffff" },
      { title: "React Native", logoComponent: FaReact, color: "#61DAFB" },
      { title: "Radix UI", logoComponent: FaReact, color: "#161618" },
      { title: "Webpack", logoComponent: FaLaptopCode, color: "#8DD6F9" },
      { title: "Bootstrap", logoComponent: FaBootstrap, color: "#7952B3" },
      { title: "Framer Motion", logoComponent: SiFramer, color: "#0055FF" },
    ],
  },
  {
    title: "Backend Development",
    data: [
      { title: "Node.js", logoComponent: SiExpress, color: "#339933" },
      { title: "Nodemon", logoComponent: SiExpress, color: "#76D04B" },
      { title: "NPM", logoComponent: FaSquareJs, color: "#CB3837" },
      { title: "NestJS", logoComponent: SiExpress, color: "#E0234E" },
      { title: "JWT", logoComponent: MdApi, color: "#000000" },
      { title: "WebSockets", logoComponent: MdApi, color: "#0A66C2" },
      { title: "Express.js", logoComponent: SiExpress, color: "#ffffff" },
    ],
  },
  {
    title: "Databases",
    data: [
      { title: "MongoDB", logoComponent: SiMongodb, color: "#47A248" },
      { title: "MySQL", logoComponent: SiMysql, color: "#4479A1" },
      { title: "Redis", logoComponent: SiRedis, color: "#DC382D" },
      { title: "Supabase", logoComponent: SiSupabase, color: "#3ECF8E" },
      { title: "Prisma", logoComponent: SiPrisma, color: "#2D3748" },
    ],
  },
  {
    title: "Cloud & Deployment",
    data: [
      { title: "AWS", logoComponent: SiAmazon, color: "#FF9900" },
      { title: "Google Cloud", logoComponent: SiGooglecloud, color: "#4285F4" },
      { title: "Firebase", logoComponent: SiFirebase, color: "#FFCA28" },
      { title: "Cloudflare", logoComponent: SiCloudflare, color: "#F38020" },
      { title: "Netlify", logoComponent: SiNetlify, color: "#00C7B7" },
      { title: "Vercel", logoComponent: SiVercel, color: "#ffffff" },
      { title: "Render", logoComponent: SiRender, color: "#46E3B7" },
      { title: "Appwrite", logoComponent: SiAppwrite, color: "#F02E65" },
    ],
  },
  {
    title: "Web3",
    data: [
      { title: "Web3.js", logoComponent: SiWeb3Dotjs, color: "#F16822" },
    ],
  },
  {
    title: "DevOps & Tools",
    data: [
      { title: "Git", logoComponent: FaGitAlt, color: "#F05032" },
      { title: "GitHub", logoComponent: FaGithub, color: "#ffffff" },
      { title: "Postman", logoComponent: SiPostman, color: "#FF6C37" },
      { title: "ESLint", logoComponent: SiEslint, color: "#4B32C3" },
      { title: "Docker", logoComponent: FaDocker, color: "#2496ED" },
      { title: "Linux (Fedora)", logoComponent: FaLinux, color: "#294172" },
    ],
  },
  {
    title: "UI/UX & Design",
    data: [
      { title: "Figma", logoComponent: FaLaptopCode, color: "#F24E1E" },
      { title: "Canva", logoComponent: FaLaptopCode, color: "#00C4CC" },
      { title: "Adobe Photoshop", logoComponent: FaLaptopCode, color: "#31A8FF" },
      { title: "Adobe Illustrator", logoComponent: FaLaptopCode, color: "#FF9A00" },
      { title: "Adobe XD", logoComponent: FaLaptopCode, color: "#FF61F6" },
    ],
  },
];