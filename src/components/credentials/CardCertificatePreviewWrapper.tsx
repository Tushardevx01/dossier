"use client";

import dynamic from "next/dynamic";
import type { Credential } from "@/db/schema";

const DynamicCardCertificatePreview = dynamic(
  () =>
    import("./CardCertificatePreview").then((m) => m.CardCertificatePreview),
  {
    ssr: false,
    loading: () => (
      <div className="relative w-full aspect-[16/10] bg-neutral-900/60 overflow-hidden flex flex-col items-center justify-center p-4">
        <div className="w-5 h-5 rounded-full border-2 border-neutral-700 border-t-neutral-400 animate-spin mb-2" />
        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
          Loading Preview...
        </span>
      </div>
    ),
  }
);

export function CardCertificatePreviewWrapper({
  credential,
}: {
  credential: Credential;
}) {
  return <DynamicCardCertificatePreview credential={credential} />;
}
