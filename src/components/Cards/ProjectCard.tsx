import Link from "next/link";
import { FC, useRef } from "react";
import { motion, useInView } from "framer-motion";
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
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.01 }}
      className="group h-full"
    >
      {/* Ultra-clean minimal container */}
      <div className="relative h-full flex flex-col rounded-2xl bg-black border border-white/10 p-10 transition-all duration-300">
        {/* Top accent line - very subtle */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {/* Content wrapper with generous spacing */}
        <div className="flex flex-col flex-grow">
          {/* Title - Large, strong visual anchor */}
          <motion.h3
            className="text-4xl font-semibold tracking-tight text-white mb-4"
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4, delay: index * 0.08 + 0.1 }}
          >
            {title}
          </motion.h3>

          {/* Description - Calm, muted */}
          <motion.p
            className="text-base text-white/60 leading-relaxed mb-8 line-clamp-3"
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4, delay: index * 0.08 + 0.2 }}
          >
            {desc}
          </motion.p>

          {/* Tech Stack - Minimal pill tags */}
          <motion.div
            className="flex flex-wrap gap-2 mb-10"
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4, delay: index * 0.08 + 0.3 }}
          >
            {tech.map((techItem) => (
              <span
                key={techItem}
                className="px-3 py-1 rounded-full text-xs uppercase tracking-wide text-white/70 border border-white/10 bg-transparent transition-colors duration-200 hover:text-white/100 hover:border-white/20"
              >
                {techItem}
              </span>
            ))}
          </motion.div>

          {/* Buttons - Minimal, confident action */}
          <motion.div
            className="flex gap-4 mt-auto"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.4, delay: index * 0.08 + 0.4 }}
          >
            {/* View Source - Text + Subtle Border */}
            <motion.a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-6 py-3 rounded-xl border border-white/20 text-white text-sm font-medium transition-all duration-200 hover:bg-white/5 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black flex items-center justify-center gap-2"
            >
              <FaGithub className="w-4 h-4" />
              Source
            </motion.a>

            {/* Live Preview - Solid & Confident */}
            {demo && (
              <motion.a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-6 py-3 rounded-xl bg-white text-black text-sm font-medium transition-all duration-200 hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-black flex items-center justify-center gap-2"
              >
                Preview
                <FiExternalLink className="w-4 h-4" />
              </motion.a>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
