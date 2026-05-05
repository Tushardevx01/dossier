"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { HiDownload, HiOutlineArrowsExpand, HiExternalLink } from "react-icons/hi";
import { Navbar, Footer, Background } from "@/components/common";
import { nasalization } from "@/app/fonts";

const PDFViewer = dynamic(() => import("./PDFViewer"), { ssr: false });

const PDF_URL = "/docs/Resume.pdf";

export function ResumePage() {
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === previewRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    const previewElement = previewRef.current;

    if (!previewElement) return;

    if (!document.fullscreenElement) {
      if (previewElement.requestFullscreen) {
        await previewElement.requestFullscreen();
      } else {
        const webkitElement = previewElement as HTMLDivElement & {
          webkitRequestFullscreen?: () => Promise<void>;
        };

        await webkitElement.webkitRequestFullscreen?.();
      }

      return;
    }

    if (document.exitFullscreen) {
      await document.exitFullscreen();
    } else {
      const webkitDocument = document as Document & {
        webkitExitFullscreen?: () => Promise<void>;
      };

      await webkitDocument.webkitExitFullscreen?.();
    }
  };

  const PDF_URL = "/docs/Resume.pdf";

  return (
    <div className={`min-h-screen selection:bg-primary/20 ${nasalization.className}`}>
      <Background />
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-secondary mb-2">
              Resume
            </h1>
            <p className="text-muted-foreground">
              A concise view of my experience, stack, and the product work I ship
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-3 sm:gap-4 w-full md:w-auto">
            <motion.button
              type="button"
              onClick={toggleFullscreen}
              className="group relative flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl overflow-hidden transition-all duration-300 border border-secondary/30 bg-card/30 hover:bg-secondary/10 text-sm sm:text-base w-full sm:w-auto"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 25px hsl(var(--secondary) / 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
              <HiOutlineArrowsExpand className="w-4 h-4 text-secondary relative z-10 pointer-events-none" />
              <span className="text-foreground font-medium relative z-10 pointer-events-none">
                {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              </span>
            </motion.button>

            <motion.a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl overflow-hidden transition-all duration-300 border border-secondary/30 bg-card/30 hover:bg-secondary/10 text-sm sm:text-base w-full sm:w-auto"
              whileHover={{
                scale: 1.05,
                borderColor: "hsl(var(--secondary) / 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <HiExternalLink className="w-4 h-4 text-secondary pointer-events-none" />
              <span className="text-foreground font-medium pointer-events-none">
                Open in New Tab
              </span>
            </motion.a>

            <motion.a
              href={PDF_URL}
              download="Resume.pdf"
              className="group relative flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl overflow-hidden transition-all duration-300 font-medium text-primary-foreground text-sm sm:text-base w-full sm:w-auto"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%)",
                boxShadow: "0 8px 25px hsl(var(--primary) / 0.3)",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 12px 35px hsl(var(--primary) / 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
              <HiDownload className="w-4 h-4 relative z-10 pointer-events-none" />
              <span className="relative z-10 pointer-events-none">Download PDF</span>
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          className="relative overflow-hidden rounded-3xl shadow-2xl z-10"
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1,
            delay: 1.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 },
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-card/30 via-card/20 to-card/30 backdrop-blur-xl pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 rounded-3xl pointer-events-none" />
          <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-3xl bg-clip-border pointer-events-none" />

          <div
            ref={previewRef}
            className="pdf-container relative w-full overflow-hidden bg-white/95 backdrop-blur-sm rounded-3xl"
            style={{ height: "clamp(520px, 75vh, 800px)" }}
          >
            <PDFViewer pdfUrl={PDF_URL} />
          </div>
        </motion.div>

        <Footer />
      </div>
    </div>
  );
}
