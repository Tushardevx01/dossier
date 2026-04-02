"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";

import { TbHeart, TbHeartFilled } from "react-icons/tb";

import { selfData } from "@/constant/";

const floatingParticles = [
  { x: 200, y: 80, color: "hsl(var(--primary))", duration: 7, delay: 0 },
  { x: 400, y: 120, color: "hsl(var(--secondary))", duration: 8, delay: 1 },
  { x: 600, y: 100, color: "hsl(var(--primary))", duration: 9, delay: 2 },
  { x: 800, y: 70, color: "hsl(var(--secondary))", duration: 10, delay: 3 },
];

export const Footer = () => {
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const toggleHeart = () => setIsHeartFilled((prev) => !prev);


  return (
    <footer className="relative border-t border-border/50 overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-6 py-8 overflow-x-hidden">
        {/* Navigation Links */}
        <div className="mb-6 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
          <Link href="/engineering-notes" className="hover:text-white transition-colors">
            Engineering Notes
          </Link>
          <Link href="/system-design" className="hover:text-white transition-colors">
            System Design
          </Link>
          <Link href="/build-log" className="hover:text-white transition-colors">
            Build Log
          </Link>
          <Link href="/engineering-philosophy" className="hover:text-white transition-colors">
            Engineering Philosophy
          </Link>
          <Link href="/now" className="hover:text-white transition-colors">
            Now
          </Link>
        </div>

        {/* Divider */}

        {/* Footer Text */}
        <div className="text-xs text-center text-muted-foreground space-y-2">
          <p className="flex items-center justify-center gap-2">
            Designed & built by
            <button onClick={toggleHeart} className="text-primary" aria-label="Toggle heart">
              {isHeartFilled ? <TbHeartFilled /> : <TbHeart />}
            </button>
            <a
              href={`https://github.com/${selfData.socials_username.github}`}
              target="_blank"
              rel="noreferrer"
              className="text-primary/80 hover:text-primary"
            >
              Tushar
            </a>
          </p>
          <p className="text-muted-foreground/60">© 2026 All rights reserved</p>
        </div>
      </div>

      {floatingParticles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full opacity-30 pointer-events-none"
          style={{
            background: particle.color,
            left: particle.x,
            top: particle.y,
          }}
          animate={{ y: [0, -20, 0], opacity: [0, 0.3, 0] }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </footer>
  );
};
