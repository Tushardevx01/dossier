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
  FaGaugeHigh,
  FaTruckMoving,
  FaWheelchair,
  FaBookOpen,
  FaCodeBranch,
  FaRobot,
  FaBootstrap,
  FaSearchengin,
  FaSquareJs,
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
  SiReplit,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

import { GiBrain } from "react-icons/gi";
import { MdApi } from "react-icons/md";
import { TbBrandCpp } from "react-icons/tb";
import { GrOracle } from "react-icons/gr";

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
    title: "Languages & Databases",
    data: [
      { title: "C/C++", logoComponent: TbBrandCpp, color: "#00599C" },
      { title: "HTML5", logoComponent: FaHtml5, color: "#E34F26" },
      { title: "CSS3", logoComponent: FaCss3, color: "#1572B6" },
      { title: "Java", logoComponent: FaJava, color: "#007396" },
      { title: "JavaScript", logoComponent: FaSquareJs, color: "#F7DF1E" },
      { title: "TypeScript", logoComponent: SiTypescript, color: "#3178C6" },
      { title: "Python", logoComponent: FaPython, color: "#3776AB" },
      { title: "MongoDB", logoComponent: SiMongodb, color: "#47A248" },
      { title: "MySQL", logoComponent: SiMysql, color: "#4479A1" },

      // Added
      { title: "PowerShell", logoComponent: FaSquareJs, color: "#5391FE" },
      { title: "Redis", logoComponent: SiMongodb, color: "#DC382D" },
      { title: "Supabase", logoComponent: SiFirebase, color: "#3ECF8E" },
      { title: "Prisma", logoComponent: SiNextdotjs, color: "#2D3748" },
      { title: "Neon DB", logoComponent: SiMysql, color: "#00E599" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    data: [
      { title: "Bootstrap", logoComponent: FaBootstrap, color: "#7952B3" },
      { title: "Express.js", logoComponent: SiExpress, color: "#d4d4d8" },
      { title: "Framer Motion", logoComponent: SiFramer, color: "#0055FF" },
      { title: "Next.js", logoComponent: SiNextdotjs, color: "#d4d4d8" },
      { title: "React", logoComponent: FaReact, color: "#61DAFB" },
      { title: "Tailwind CSS", logoComponent: SiTailwindcss, color: "#06B6D4" },

      // Added
      { title: "NestJS", logoComponent: SiExpress, color: "#E0234E" },
      { title: "WebSockets", logoComponent: MdApi, color: "#0A66C2" },
      { title: "Radix UI", logoComponent: FaReact, color: "#161618" },
      { title: "Webpack", logoComponent: FaCodeBranch, color: "#8DD6F9" },
    ],
  },
  {
    title: "Dev Tools & Platforms",
    data: [
      { title: "Git", logoComponent: FaGitAlt, color: "#F05032" },
      { title: "GitHub", logoComponent: FaGithub, color: "#d4d4d8" },
      { title: "Netlify", logoComponent: SiNetlify, color: "#00C7B7" },
      { title: "Postman", logoComponent: SiPostman, color: "#FF6C37" },
      { title: "Replit", logoComponent: SiReplit, color: "#667881" },
      { title: "Vercel", logoComponent: SiVercel, color: "#d4d4d8" },
      { title: "Firebase", logoComponent: SiFirebase, color: "#FFCA28" },

      // Added
      { title: "Docker", logoComponent: FaTruckMoving, color: "#2496ED" },
      { title: "Linux (Fedora)", logoComponent: FaLaptopCode, color: "#294172" },
      { title: "Clerk Auth", logoComponent: MdApi, color: "#6C47FF" },
      { title: "AWS", logoComponent: FaLaptopCode, color: "#FF9900" },
      { title: "Google Cloud", logoComponent: FaLaptopCode, color: "#4285F4" },
      { title: "Cloudflare", logoComponent: FaLaptopCode, color: "#F38020" },
      { title: "Render", logoComponent: FaLaptopCode, color: "#46E3B7" },
      { title: "Appwrite", logoComponent: FaLaptopCode, color: "#F02E65" },
    ],
  },
  {
    title: "Concepts & Technologies",
    data: [
      { title: "API Design", logoComponent: MdApi, color: "#5C2D91" },
      { title: "Accessibility", logoComponent: FaWheelchair, color: "#1E88E5" },
      { title: "BERT", logoComponent: FaBookOpen, color: "#2196F3" },
      { title: "CI/CD", logoComponent: FaTruckMoving, color: "#0A66C2" },
      { title: "Machine Learning", logoComponent: GiBrain, color: "#3F51B5" },
      { title: "Performance Optimization", logoComponent: FaGaugeHigh, color: "#388E3C" },
      { title: "Responsive Design", logoComponent: FaMobile, color: "#009688" },
      { title: "SEO Optimization", logoComponent: FaSearchengin, color: "#FF5722" },
      { title: "Software Development", logoComponent: FaLaptopCode, color: "#607D8B" },
      { title: "Test Automation", logoComponent: FaRobot, color: "#9C27B0" },
      { title: "Version Control", logoComponent: FaCodeBranch, color: "#4CAF50" },

      // Added
      { title: "Web3.js", logoComponent: FaSquareJs, color: "#F16822" },
      { title: "Real-time Systems", logoComponent: GiBrain, color: "#00C2CB" },
      { title: "System Architecture", logoComponent: FaLaptopCode, color: "#795548" },
      { title: "Scalable Infrastructure", logoComponent: FaGaugeHigh, color: "#1E293B" },
    ],
  },
];