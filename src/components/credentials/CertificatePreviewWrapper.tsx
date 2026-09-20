"use client";

import dynamic from "next/dynamic";
import type { Credential } from "@/db/schema";

const DynamicCertificatePreview = dynamic(
  () =>
    import("./CertificatePreview").then((mod) => mod.CertificatePreview),
  {
    ssr: false,
    loading: () => (
      <div className="w-full rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-4 sm:p-6 md:p-8 flex items-center justify-center">
        <div className="w-full aspect-[16/10] max-w-[660px] rounded-lg border border-neutral-800/80 bg-neutral-950/70 flex flex-col items-center justify-center gap-3 animate-pulse">
          <div className="w-7 h-7 rounded-full border-2 border-neutral-700 border-t-neutral-300 animate-spin" />
          <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
            Loading Certificate Preview...
          </span>
        </div>
      </div>
    ),
  }
);

export function CertificatePreviewWrapper({ credential }: { credential: Credential }) {
  return <DynamicCertificatePreview credential={credential} />;
}
