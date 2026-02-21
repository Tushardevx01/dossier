import Link from "next/link";
import { FC, useRef } from "react";
import { motion, useInView } from "framer-motion";

import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiJavascript,
  SiSupabase,
  SiMongodb,
  SiExpress,
  SiNodedotjs,
  SiFirebase,
  SiTypescript,
  SiPostman,
  SiMysql,
  SiRedis,
} from "react-icons/si";
import { FaReact, FaCss3, FaHtml5, FaCircleUser } from "react-icons/fa6";
import { MdApi } from "react-icons/md";

interface ProjectCardProps {
  index: number;
  title: string;
  desc: string;
  github: string;
  demo?: string;
  tech: string[];
}

export const ProjectCard: FC<ProjectCardProps> = ({
  index,
  title,
  desc,
  github,
  demo,
  tech,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-50px",
    amount: 0.2,
  });

  // Tech icon mapping with official brand colors
  const techIconMap: Record<string, { icon: React.ElementType; color: string }> = {
    "Next.js": { icon: SiNextdotjs, color: "#FFFFFF" }, // White for dark backgrounds
    "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
    "Framer Motion": { icon: SiFramer, color: "#0055FF" },
    "JavaScript": { icon: SiJavascript, color: "#F7DF1E" },
    "Supabase": { icon: SiSupabase, color: "#3ECF8E" },
    "Expo Go": { icon: FaReact, color: "#61DAFB" },
    "CSS": { icon: FaCss3, color: "#1572B6" },
    "Css": { icon: FaCss3, color: "#1572B6" },
    "HTML": { icon: FaHtml5, color: "#E34F26" },
    "Node.js": { icon: SiNodedotjs, color: "#339933" },
    "Express": { icon: SiExpress, color: "#FFFFFF" }, // White for dark backgrounds
    "MongoDB": { icon: SiMongodb, color: "#47A248" },
    "clerk": { icon: FaCircleUser, color: "#6C47FF" }, // Clerk brand purple with user icon
    "LiveKit": { icon: MdApi, color: "#00C8FF" },
    "TMDB API": { icon: MdApi, color: "#01D277" },
    "TypeScript": { icon: SiTypescript, color: "#3178C6" },
    "React": { icon: FaReact, color: "#61DAFB" },
  };

  // Get first 3 tech icons
  const displayTech = tech.slice(0, 3);

  return (
    <motion.div
      ref={ref}
      key={title}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: "easeOut",
      }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group h-full"
    >
      <Card
        className="relative overflow-hidden border transition-all duration-300 ease-out h-full flex flex-col rounded-2xl"
        style={{
          background:
            "linear-gradient(180deg, hsl(245 25% 6% / 0.95) 0%, hsl(245 25% 4% / 0.95) 100%)",
          borderColor: "hsl(275 20% 25% / 0.35)",
          boxShadow: "0 10px 30px hsl(245 80% 2% / 0.35)",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{
            background:
              "linear-gradient(90deg, hsl(150 55% 45% / 0.8), hsl(175 55% 45% / 0.8), transparent)",
          }}
        />

        <div className="relative z-10 p-8 flex flex-col flex-grow">
          <motion.h3
            className="text-2xl md:text-3xl font-semibold tracking-tight"
            style={{ color: "hsl(var(--foreground))" }}
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4, delay: index * 0.08 + 0.1 }}
          >
            {title}
          </motion.h3>

          
          <motion.p
            className="text-sm mt-4 mb-6 leading-relaxed line-clamp-3"
            style={{ color: "hsl(var(--foreground) / 0.7)" }}
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4, delay: index * 0.08 + 0.2 }}
          >
            {desc}
          </motion.p>

          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4, delay: index * 0.08 + 0.3 }}
          >
            {displayTech.map((techItem) => {
              const techData = techIconMap[techItem];
              if (!techData) return null;
              const IconComponent = techData.icon;
              return (
                <div
                  key={techItem}
                  className="flex items-center justify-center w-10 h-10 rounded-lg backdrop-blur-sm transition-all duration-300 hover:scale-110"
                  style={{
                    backgroundColor: "hsl(245 25% 12% / 0.6)",
                    border: "1px solid hsl(275 20% 25% / 0.4)",
                  }}
                  title={techItem}
                >
                  <IconComponent
                    className="w-5 h-5"
                    style={{ color: techData.color }}
                  />
                </div>
              );
            })}
          </motion.div>

          <motion.div
            className="flex gap-3 mt-auto"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.4, delay: index * 0.08 + 0.4 }}
          >
            <motion.div
              className="flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                size="sm"
                className="group w-full transition-all duration-300 hover:shadow-lg font-mono text-xs"
                style={{
                  backgroundColor: "hsl(245 25% 8% / 0.6)",
                  borderColor: "hsl(150 35% 35% / 0.5)",
                  color: "hsl(var(--foreground))",
                }}
                asChild
                aria-label="View source code"
              >
                <a href={github} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="w-4 h-4 mr-2" />
                  View Source
                </a>
              </Button>
            </motion.div>
            {demo && (
              <motion.div
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="sm"
                  asChild
                  aria-label="Open live preview"
                >
                  <Link href={demo} target="_blank" rel="noopener noreferrer">
                    Live Preview
                    <FiExternalLink className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};
