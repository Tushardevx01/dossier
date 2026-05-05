"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { HiExternalLink } from "react-icons/hi";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF.js worker
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
}

interface PDFViewerProps {
  pdfUrl: string;
}

export default function PDFViewer({ pdfUrl }: PDFViewerProps) {
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [scaledWidth, setScaledWidth] = useState<number>(0);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  useEffect(() => {
    const node = viewerRef.current;
    if (!node) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      setContainerWidth(Math.floor(width));
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const maxWidth = Math.max(containerWidth - 32, 200);
    setScaledWidth(maxWidth);
  }, [containerWidth]);

  const PDFLoading = () => (
    <div className="flex h-full w-full items-center justify-center rounded-lg bg-background/80 p-8">
      <div className="flex flex-col items-center gap-4">
        <div className="inline-flex h-8 w-8 animate-spin items-center justify-center rounded-full border-2 border-muted-foreground/20 border-t-primary" />
        <p className="text-sm text-muted-foreground">Loading PDF...</p>
      </div>
    </div>
  );

  return (
    <div className="pdf-viewer h-full">
      <div className="flex justify-center items-start h-full p-2 sm:p-4 overflow-y-auto">
        {loadingError ? (
          <div className="flex h-full w-full items-center justify-center rounded-lg border border-border/50 bg-background/80 p-8 text-center text-sm text-muted-foreground">
            <div className="max-w-sm space-y-4">
              <p>Failed to load PDF: {loadingError}</p>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-secondary/30 bg-card/60 px-4 py-2 font-medium text-foreground transition-colors hover:bg-secondary/10"
              >
                <HiExternalLink className="h-4 w-4 text-secondary" />
                Open the resume PDF
              </a>
            </div>
          </div>
        ) : (
          <div ref={viewerRef} className="flex flex-col items-center w-full">
            <Document
              file={pdfUrl}
              onLoadSuccess={({ numPages }) => {
                setNumPages(numPages);
                setLoadingError(null);
              }}
              onLoadError={(error) => setLoadingError(error.message)}
              loading={<PDFLoading />}
            >
              {Array.from(new Array(numPages), (_, index) => (
                <div key={`page_${index + 1}`} className="mb-4 flex justify-center">
                  <Page
                    pageNumber={index + 1}
                    width={Math.min(scaledWidth || containerWidth - 32, 800)}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                  />
                </div>
              ))}
            </Document>
          </div>
        )}
      </div>
    </div>
  );
}
