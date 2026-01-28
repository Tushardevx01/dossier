import Link from "next/link";
import { FC, useRef } from "react";
import { motion, useInView } from "framer-motion";

import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";

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

  return (
    <motion.div
      ref={ref}
      key={title}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 40, scale: 0.95 }
      }
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: {
          duration: 0.3,
          type: "spring" as const,
          stiffness: 400,
          damping: 25,
        },
      }}
      className="group h-full"
    >
      <Card
        className="relative overflow-hidden backdrop-blur-xl border transition-all duration-500 h-full flex flex-col shadow-xl hover:shadow-2xl group-hover:shadow-luxury-hover-glow/30 rounded-2xl"
        style={{
          background: "hsl(var(--glass-bg))",
          borderColor: "hsl(var(--glass-border))",
          borderRadius: "1rem",
        }}
      >
        {/* Glass shimmer effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700"
          style={{ background: "var(--shimmer)" }}
          initial={{ x: "-100%" }}
          whileHover={{ x: "200%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />

        {/* Glowing border effect */}
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(45deg, hsl(var(--primary) / 0.2), hsl(var(--secondary) / 0.2), hsl(var(--accent) / 0.2))",
            filter: "blur(1px)",
          }}
        />

        <div className="relative z-10 p-4 flex flex-col flex-grow">
          {/* Card Header Accent */}
          <motion.h3
            className="text-xl font-bold mb-3 mt-2 font-nasalization"
            style={{ color: "hsl(var(--primary))" }}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
          >
            {title}
          </motion.h3>

          <motion.p
            className="text-sm mb-6 flex-grow font-inter leading-relaxed"
            style={{ color: "hsl(var(--foreground) / 0.8)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          >
            {desc}
          </motion.p>

          {/* Tech Stack */}
          <motion.div
            className="flex flex-wrap gap-2 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
          >
            {tech.map((techItem, techIndex) => (
              <motion.div
                key={techItem}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{
                  duration: 0.3,
                  delay: index * 0.1 + 0.5 + techIndex * 0.05,
                  type: "spring" as const,
                  stiffness: 300,
                }}
                whileHover={{ scale: 1.05 }}
              >
                <Badge
                  variant="outline"
                  className="text-xs transition-all duration-300 hover:shadow-md font-mono px-3 py-1"
                  style={{
                    borderColor: "hsl(var(--primary) / 0.3)",
                    color: "hsl(var(--foreground) / 0.9)",
                    backgroundColor: "hsl(var(--primary) / 0.1)",
                    borderRadius: "0.5rem",
                  }}
                >
                  {techItem}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex space-x-3 mt-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
          >
            <motion.div
              className="flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                size="sm"
                className="w-full transition-all duration-300 hover:shadow-lg font-mono text-xs"
                style={{
                  backgroundColor: "hsl(var(--glass-bg-light))",
                  borderColor: "hsl(var(--glass-border))",
                  color: "hsl(var(--foreground))",
                  backdropFilter: "blur(8px)",
                }}
                asChild
              >
                <a href={github} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="w-4 h-4 mr-2" />
                  Code
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
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 hover:shadow-lg font-mono text-xs"
                  asChild
                >
                  <Link href={demo} target="_blank" rel="noopener noreferrer">
                    <FiExternalLink className="w-4 h-4 mr-2" />
                    Demo
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
