"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import type { IconType } from "react-icons";
import { FaDocker, FaGithub, FaReact } from "react-icons/fa6";
import {
  SiAppwrite,
  SiExpress,
  SiFramer,
  SiGo,
  SiJavascript,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiRedis,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

import { mono, nasalization } from "@/app/fonts";
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  index: number;
}

interface StatusConfig {
  label: string;
  dotClass: string;
  ping: boolean;
  textClass: string;
  containerClass: string;
}

const techIconMap: Record<string, IconType> = {
  go: SiGo,
  golang: SiGo,
  docker: FaDocker,
  "docker engine api": FaDocker,
  typescript: SiTypescript,
  javascript: SiJavascript,
  react: FaReact,
  "next.js": SiNextdotjs,
  nextjs: SiNextdotjs,
  "node.js": SiNodedotjs,
  nodejs: SiNodedotjs,
  node: SiNodedotjs,
  express: SiExpress,
  "express.js": SiExpress,
  nestjs: SiNestjs,
  "tailwind css": SiTailwindcss,
  tailwind: SiTailwindcss,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  redis: SiRedis,
  python: SiPython,
  supabase: SiSupabase,
  appwrite: SiAppwrite,
  "framer motion": SiFramer,
  github: FaGithub,
  "github api": FaGithub,
  "github graphql api": FaGithub,
};

function getTechIcon(name: string): IconType | null {
  const key = name.toLowerCase().trim();
  if (techIconMap[key]) return techIconMap[key];
  for (const [techKey, icon] of Object.entries(techIconMap)) {
    if (key.includes(techKey)) return icon;
  }
  return null;
}

function getStatusConfig(status?: string, liveUrl?: string): StatusConfig {
  const norm = (status || "").trim().toUpperCase();

  if (norm === "LIVE" || norm === "ACTIVE" || norm === "PRODUCTION") {
    return {
      label: "LIVE",
      dotClass: "bg-emerald-500",
      ping: true,
      textClass: "text-emerald-400",
      containerClass: "border-emerald-500/20 bg-emerald-500/5",
    };
  }

  if (norm === "IN DEVELOPMENT" || norm === "DEVELOPMENT" || norm === "IN DEV") {
    return {
      label: "IN DEVELOPMENT",
      dotClass: "bg-amber-400",
      ping: true,
      textClass: "text-amber-400",
      containerClass: "border-amber-500/20 bg-amber-500/5",
    };
  }

  if (norm === "ARCHIVED") {
    return {
      label: "ARCHIVED",
      dotClass: "bg-neutral-600",
      ping: false,
      textClass: "text-neutral-500",
      containerClass: "border-neutral-800 bg-neutral-900/50",
    };
  }

  if (norm === "EXPERIMENTAL") {
    return {
      label: "EXPERIMENTAL",
      dotClass: "bg-cyan-400",
      ping: true,
      textClass: "text-cyan-400",
      containerClass: "border-cyan-500/20 bg-cyan-500/5",
    };
  }

  if (norm === "OPEN SOURCE") {
    if (liveUrl && !liveUrl.includes("github.com")) {
      return {
        label: "LIVE",
        dotClass: "bg-emerald-500",
        ping: true,
        textClass: "text-emerald-400",
        containerClass: "border-emerald-500/20 bg-emerald-500/5",
      };
    }
    return {
      label: "OPEN SOURCE",
      dotClass: "bg-neutral-400",
      ping: false,
      textClass: "text-neutral-300",
      containerClass: "border-neutral-800 bg-neutral-900/50",
    };
  }

  return {
    label: norm || "ACTIVE",
    dotClass: "bg-neutral-400",
    ping: false,
    textClass: "text-neutral-400",
    containerClass: "border-neutral-800 bg-neutral-900/50",
  };
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const shouldReduceMotion = useReducedMotion();

  const projectIndex = project.index || String(index + 1).padStart(2, "0");
  const liveUrl = project.liveUrl || project.demo;
  const githubUrl = project.githubUrl || project.github_link;
  const hasGithubUrl = Boolean(githubUrl);

  const statusConfig = getStatusConfig(project.status, liveUrl);
  const displayTech = (project.tech?.length ? project.tech : project.technologies) || [];
  const tags = displayTech.slice(0, 4);

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.45,
        delay: shouldReduceMotion ? 0 : index * 0.08,
        when: "beforeChildren",
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const childVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.35,
        ease: "easeOut",
      },
    },
  };

  const titleHoverVariants: Variants = {
    rest: { x: 0 },
    hover: { x: shouldReduceMotion ? 0 : 2 },
  };

  const arrowVariants: Variants = {
    rest: { x: 0 },
    hover: { x: shouldReduceMotion ? 0 : 4 },
  };

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      whileHover={shouldReduceMotion ? undefined : "hover"}
      viewport={{ once: true, margin: "-40px" }}
      variants={cardVariants}
      className="group relative rounded-xl border border-neutral-800/80 bg-[#0c0c0c] p-6 sm:p-7 md:p-8 transition-colors duration-300 hover:border-neutral-700/80 flex flex-col justify-between"
      style={{
        transform: shouldReduceMotion ? "none" : undefined,
      }}
    >
      {/* Subtle top ambient highlight on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_70%)]"
        aria-hidden="true"
      />

      {/* Top Section */}
      <div className="relative z-10">
        {/* 01 / CATEGORY  ● LIVE */}
        <motion.div
          variants={childVariants}
          className="flex items-center justify-between gap-3 mb-4"
        >
          <div
            className={`${mono.className} flex items-center gap-2 text-[11px] uppercase tracking-wider text-neutral-500`}
          >
            <span className="text-neutral-400 font-semibold">{projectIndex}</span>
            <span className="text-neutral-700 font-normal">/</span>
            <span className="truncate text-neutral-400 font-medium">
              {project.category}
            </span>
          </div>

          {/* Status badge */}
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${statusConfig.containerClass} shrink-0 transition-colors`}
          >
            <span className="relative flex h-2 w-2">
              {statusConfig.ping && (
                <span
                  className={`absolute inline-flex h-full w-full rounded-full ${statusConfig.dotClass} opacity-60 animate-ping [animation-duration:3s] motion-reduce:hidden`}
                />
              )}
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${statusConfig.dotClass}`}
              />
            </span>
            <span
              className={`${mono.className} text-[10px] font-semibold tracking-wider ${statusConfig.textClass} uppercase select-none`}
            >
              {statusConfig.label}
            </span>
          </div>
        </motion.div>

        {/* Project Name */}
        <motion.h3
          variants={childVariants}
          className={`${nasalization.className} text-xl sm:text-2xl font-bold tracking-tight text-white mb-3`}
        >
          <motion.span
            variants={titleHoverVariants}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="inline-block"
          >
            <Link
              href={`/work/${project.slug}`}
              className="hover:text-neutral-200 transition-colors focus-visible:outline-none focus-visible:underline decoration-neutral-500 underline-offset-4"
            >
              {project.name}
            </Link>
          </motion.span>
        </motion.h3>

        {/* Description */}
        <motion.p
          variants={childVariants}
          className="text-sm text-neutral-400 leading-relaxed line-clamp-3 mb-6 font-sans"
        >
          {project.description}
        </motion.p>

        {/* Technology Tags */}
        <motion.div variants={childVariants} className="flex flex-wrap gap-2 mb-8">
          {tags.map((techItem) => {
            const Icon = getTechIcon(techItem);
            return (
              <span
                key={techItem}
                className={`${mono.className} inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium text-neutral-300 bg-neutral-900/60 border border-neutral-800/80 transition-colors duration-200 group-hover:border-neutral-700/80`}
              >
                {Icon && (
                  <Icon className="w-3 h-3 text-neutral-400 shrink-0" aria-hidden="true" />
                )}
                <span>{techItem}</span>
              </span>
            );
          })}
        </motion.div>
      </div>

      {/* Bottom Section (Divider, Role, and Footer Action Bar) */}
      <motion.div
        variants={childVariants}
        className="relative z-10 pt-5 border-t border-neutral-800/80 space-y-4 mt-auto"
      >
        <p
          className={`${mono.className} text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-500 font-medium`}
        >
          {project.role}
        </p>

        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 pt-1">
          {/* Primary Action: Explore Case Study */}
          <Link
            href={`/work/${project.slug}`}
            className={`${mono.className} group/cta inline-flex items-center gap-2 text-xs font-medium text-neutral-200 px-4 py-2.5 rounded-lg border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800/70 hover:border-neutral-600 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400`}
          >
            <span>Explore Case Study</span>
            <motion.span
              variants={arrowVariants}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="inline-block text-neutral-400 group-hover/cta:text-white"
              aria-hidden="true"
            >
              →
            </motion.span>
          </Link>

          {/* Secondary Action: GitHub Repository */}
          {hasGithubUrl && (
            <div className="relative group/tooltip ml-auto sm:ml-0">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.name} GitHub repository`}
                className="w-10 h-10 rounded-lg border border-neutral-800/80 bg-neutral-900/40 hover:bg-neutral-800/70 hover:border-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
              >
                <FaGithub className="w-4 h-4 transition-transform duration-200 group-hover/tooltip:scale-110" />
              </a>
              <span
                role="tooltip"
                className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-150 px-2 py-0.5 text-[10px] font-mono tracking-wider text-neutral-200 bg-neutral-900 border border-neutral-800 rounded shadow-md whitespace-nowrap z-20"
              >
                GitHub Repository
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </motion.article>
  );
};
