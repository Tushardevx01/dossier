"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { LuFileText, LuExternalLink } from "react-icons/lu";
import type { Credential } from "@/db/schema";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF.js worker from local route
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/api/pdf-worker";
}

interface CertificatePreviewProps {
  credential: Credential;
}

function isImageUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  const clean = url.split("?")[0].toLowerCase();
  return (
    clean.endsWith(".png") ||
    clean.endsWith(".jpg") ||
    clean.endsWith(".jpeg") ||
    clean.endsWith(".webp") ||
    clean.endsWith(".gif") ||
    clean.endsWith(".svg")
  );
}

export function CertificatePreview({ credential }: CertificatePreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(640);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const displayImage =
    credential.objectLink && isImageUrl(credential.objectLink)
      ? credential.objectLink
      : null;

  // Use same-origin inline download URL for PDF to guarantee zero CORS issues
  const pdfUrl = credential.objectLink
    ? `/api/credentials/${credential.id}/download?inline=true`
    : null;

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const updateWidth = () => {
      if (node) {
        // Generous inner padding deduction
        const available = node.getBoundingClientRect().width;
        setContainerWidth(Math.floor(available));
      }
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  // Calculate target page width for standard certificate landscape aspect ratio
  const pageWidth = Math.max(Math.min(containerWidth - 32, 660), 240);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-4 sm:p-6 md:p-8 flex items-center justify-center transition-colors duration-200 hover:border-neutral-700/80"
    >
      {displayImage ? (
        <div className="flex items-center justify-center w-full">
          <img
            src={displayImage}
            alt={credential.title}
            className="w-auto max-w-full max-h-[520px] object-contain rounded-lg border border-neutral-800 shadow-2xl mx-auto"
            loading="eager"
          />
        </div>
      ) : pdfUrl && !pdfError ? (
        <div className="flex flex-col items-center justify-center w-full overflow-hidden">
          <Document
            file={pdfUrl}
            onLoadError={(err) => {
              setPdfError(err.message || "Failed to load PDF preview");
            }}
            loading={
              <div
                style={{ height: Math.round(pageWidth * 0.707) }}
                className="w-full max-w-[660px] rounded-lg border border-neutral-800/80 bg-neutral-950/70 flex flex-col items-center justify-center gap-3 animate-pulse"
              >
                <div className="w-7 h-7 rounded-full border-2 border-neutral-700 border-t-neutral-300 animate-spin" />
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                  Rendering Certificate...
                </span>
              </div>
            }
          >
            <div className="rounded-lg border border-neutral-800/80 shadow-2xl overflow-hidden bg-neutral-950">
              <Page
                pageNumber={1}
                width={pageWidth}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="block mx-auto max-w-full"
              />
            </div>
          </Document>
        </div>
      ) : (
        /* Fallback if PDF fails or no asset */
        <div className="w-full aspect-[16/10] max-w-[660px] rounded-lg border border-neutral-800 bg-neutral-950/80 p-8 flex flex-col items-center justify-center text-center">
          <LuFileText className="w-10 h-10 text-neutral-600 mb-3" />
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
            OFFICIAL CERTIFICATE RECORD
          </div>
          <p className="text-xs font-mono text-neutral-500 max-w-sm mb-4">
            {credential.objectLink
              ? "Interactive preview unavailable in this browser view."
              : "Certificate file is not currently archived in object storage."}
          </p>
          {credential.objectLink && (
            <a
              href={credential.objectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono text-neutral-300 hover:text-white px-4 py-2 rounded-md border border-neutral-800 hover:border-neutral-700 bg-neutral-900 transition-colors"
            >
              <span>Open Original Document</span>
              <LuExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
