import { FC, useRef } from "react";
import { motion, useInView } from "framer-motion";

import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

interface ExperienceCardProps {
  role: string;
  year: string;
  description: Array<string>;
  company: string;
  technologies: Array<string>;
  index?: number;
}

export const ExperienceCard: FC<ExperienceCardProps> = ({
  role,
  year,
  description,
  company,
  technologies,
  index = 0,
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
      key={index}
      initial={{ opacity: 0, x: -50, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, x: 0, scale: 1 }
          : { opacity: 0, x: -50, scale: 0.95 }
      }
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        scale: 1.02,
        y: -8,
        transition: {
          duration: 0.3,
          type: "spring" as const,
          stiffness: 400,
          damping: 25,
        },
      }}
      className="relative flex items-start space-x-8 group"
    >
      {/* Timeline dot */}
      <motion.div
        className="mt-6 flex-shrink-0"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
      >
        <div className="w-4 h-4 bg-gradient-to-r from-primary to-secondary rounded-full border-2 border-background shadow-lg" />
        <div className="w-px h-20 bg-gradient-to-b from-primary/50 to-transparent mx-auto mt-2" />
      </motion.div>

      {/* Content */}
      <motion.div className="flex-1">
        <Card
          className="relative overflow-hidden backdrop-blur-xl border transition-all duration-500 shadow-xl hover:shadow-2xl group-hover:shadow-luxury-hover-glow/20"
          style={{
            background: "hsl(var(--glass-bg))",
            borderColor: "hsl(var(--glass-border))",
          }}
        >
          {/* Glass shimmer effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
            style={{ background: "var(--shimmer)" }}
            initial={{ x: "-100%" }}
            whileHover={{ x: "200%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          <div className="relative z-10 p-6">
            <motion.div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            >
              <div>
                <h3
                  className="text-xl font-semibold font-nasalization mb-1"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  {role}
                </h3>
                <p
                  className="font-medium"
                  style={{ color: "hsl(var(--secondary))" }}
                >
                  {company}
                </p>
              </div>
              <span
                className="text-sm mt-2 sm:mt-0"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                {year}
              </span>
            </motion.div>

            <motion.ul
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
            >
              {description.map((point, pointIndex) => (
                <motion.li
                  key={pointIndex}
                  className="text-xs font-inter flex items-start"
                  style={{ color: "hsl(var(--foreground) / 0.8)" }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                  }
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1 + 0.5 + pointIndex * 0.1,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2 mr-3 flex-shrink-0"
                    style={{ backgroundColor: "hsl(var(--accent))" }}
                  />
                  {point}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="flex flex-wrap gap-2 mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
            >
              {technologies.map((tech, techIndex) => (
                <motion.div
                  key={techIndex}
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
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};
