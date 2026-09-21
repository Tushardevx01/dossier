"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { LuAward } from "react-icons/lu";
import type { Credential } from "@/db/schema";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/api/pdf-worker";
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

export function CardCertificatePreview({ credential }: { credential: Credential }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number>(520);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      if (el) {
        setWidth(Math.max(Math.floor(el.getBoundingClientRect().width), 360));
      }
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const displayImage =
    credential.objectLink && isImageUrl(credential.objectLink)
      ? credential.objectLink
      : null;

  const pdfUrl = credential.objectLink
    ? `/api/credentials/${credential.id}/download?inline=true`
    : null;

  if (displayImage) {
    return (
      <div className="relative w-full aspect-[16/10] bg-neutral-900 overflow-hidden">
        <img
          src={displayImage}
          alt={credential.title}
          className="w-full h-full object-cover object-top"
          loading="lazy"
        />
      </div>
    );
  }

  if (pdfUrl && !hasError) {
    return (
      <div
        ref={containerRef}
        className="relative w-full aspect-[16/10] bg-white overflow-hidden flex items-start justify-center"
      >
        <Document
          file={pdfUrl}
          onLoadError={() => setHasError(true)}
          loading={
            <div className="w-full h-full min-h-[220px] bg-neutral-900/60 flex flex-col items-center justify-center p-4 text-center animate-pulse">
              <div className="w-5 h-5 rounded-full border-2 border-neutral-600 border-t-neutral-300 animate-spin mb-2" />
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                Loading Certificate...
              </span>
            </div>
          }
        >
          <div className="w-full overflow-hidden [&_canvas]:!w-full [&_canvas]:!h-auto [&_canvas]:block">
            <Page
              pageNumber={1}
              width={width}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </div>
        </Document>
      </div>
    );
  }

  // Fallback if no asset or PDF load error
  return (
    <div className="relative w-full aspect-[16/10] bg-[#fbfbfb] text-neutral-900 p-6 flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
          Official Certificate
        </span>
        <LuAward className="w-4 h-4 text-neutral-600" />
      </div>
      <div className="my-auto text-center px-4">
        <div className="text-sm sm:text-base font-serif font-bold text-neutral-900 tracking-tight line-clamp-2">
          {credential.title}
        </div>
        <div className="text-xs font-sans text-neutral-600 mt-1">
          {credential.issuer}
        </div>
      </div>
      <div className="text-[9px] font-mono text-neutral-400 text-right uppercase">
        Verified Record
      </div>
    </div>
  );
}
