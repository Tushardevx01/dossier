"use client";

import { nasalization } from "@/app/fonts";
import { selfData } from "@/constant";
import { motion, AnimatePresence } from "motion/react";
import { FC, useState, useEffect } from "react";
import { Background } from "./Background";

interface LoaderTextProps {
  text: string;
  y_initialValue: number;
}

/** Decorative loading text - using span to preserve single h1 on page */
const LoaderText: FC<LoaderTextProps> = ({ text, y_initialValue }) => {
  return (
    <motion.span
      role="presentation"
      aria-hidden="true"
      initial={{ y: y_initialValue, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className={`text-slate-200 text-4xl ${nasalization.className}`}
    >
      {text}
    </motion.span>
  );
};

export const PreLoader = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // Hide preloader after animation completes
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 3500); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showPreloader && (
        <motion.div
          className="overflow-x-hidden w-full h-screen fixed inset-0 z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="flex items-center justify-center fixed h-full w-full">
            <Background />

            <motion.div
              className="flex justify-center items-center tracking-widest mx-auto container text-2xl text-slate-400"
              role="status"
              aria-label="Loading portfolio"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <LoaderText text="TusharDev" y_initialValue={100} />
              <motion.span
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="mx-2"
              >
                /
              </motion.span>
              <LoaderText text="X01" y_initialValue={-100} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
