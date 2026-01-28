"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { motion } from "framer-motion";
import { HiExternalLink, HiDownload } from "react-icons/hi";

interface Props {
  children: ReactNode;
  pdfUrl: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class PDFErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("PDF Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col justify-center items-center h-full p-8 text-center relative">
          {/* Ambient background elements */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full blur-xl opacity-20"
            style={{ backgroundColor: "hsl(var(--primary))" }}
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-1/4 right-1/4 w-12 h-12 rounded-full blur-lg opacity-15"
            style={{ backgroundColor: "hsl(var(--secondary))" }}
            animate={{
              x: [0, 5, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          <motion.div
            className="space-y-6 relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              className="text-destructive text-xl font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              PDF Viewer Error
            </motion.div>

            <motion.p
              className="text-primary-foreground/70 text-lg max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              An unexpected error occurred while loading the PDF viewer.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.a
                href={this.props.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-6 py-3 rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%)",
                  boxShadow: "0 8px 32px hsl(var(--primary) / 0.3)",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 12px 40px hsl(var(--primary) / 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <div className="relative flex items-center gap-2 text-white font-medium">
                  <HiExternalLink className="w-5 h-5" />
                  Open PDF in New Tab
                </div>
              </motion.a>

              <motion.a
                href={this.props.pdfUrl}
                download="Resume.pdf"
                className="group relative px-6 py-3 rounded-xl overflow-hidden transition-all duration-300 border border-secondary/30"
                style={{
                  background: "hsl(var(--card) / 0.5)",
                  backdropFilter: "blur(8px)",
                }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "hsl(var(--secondary) / 0.1)",
                  borderColor: "hsl(var(--secondary) / 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2 text-primary-foreground font-medium">
                  <HiDownload className="w-5 h-5" />
                  Download PDF
                </div>
              </motion.a>
            </motion.div>

            <motion.button
              onClick={() => this.setState({ hasError: false })}
              className="mt-6 px-6 py-2 rounded-lg transition-all duration-300 border border-accent/30 bg-accent/10 hover:bg-accent/20 text-accent-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again
            </motion.button>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}
