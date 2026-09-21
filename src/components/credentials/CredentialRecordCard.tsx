"use client";

import Link from "next/link";
import { LuAward, LuCalendar, LuArrowUpRight } from "react-icons/lu";
import type { Credential } from "@/db/schema";
import { slugifyTitle, formatCardDate } from "@/lib/credential-utils";
import { stripMarkdown } from "@/lib/markdown";
import { CardCertificatePreviewWrapper } from "./CardCertificatePreviewWrapper";

interface CredentialRecordCardProps {
  credential: Credential;
  index?: number;
}

export function CredentialRecordCard({ credential }: CredentialRecordCardProps) {
  const credSlug = credential.slug || slugifyTitle(credential.title);
  const formattedDate = formatCardDate(credential.issueDate);

  // Clean description for card display: remove Markdown formatting and leading headers
  const rawDescription = credential.description ? stripMarkdown(credential.description) : "";
  const cleanDescription = rawDescription
    .replace(/^(Overview|About|Summary)\s+/i, "")
    .trim();

  return (
    <Link
      href={`/credentials/${credSlug}`}
      className="group relative flex flex-col rounded-2xl border border-dashed border-neutral-800 bg-[#0c0c0c] hover:border-neutral-700 transition-colors duration-200 overflow-hidden focus:outline-none focus:ring-1 focus:ring-neutral-600"
    >
      {/* Top Half: Certificate Asset Preview */}
      <div className="w-full">
        <CardCertificatePreviewWrapper credential={credential} />
      </div>

      {/* Bottom Half: Content & Metadata */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Title in Serif */}
          <h3 className="text-xl sm:text-2xl font-serif text-white group-hover:text-neutral-200 transition-colors leading-snug">
            {credential.title}
          </h3>

          {/* Issuer with Award/Medal Ribbon Icon */}
          {credential.issuer && (
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-neutral-400 mt-2">
              <LuAward className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>{credential.issuer}</span>
            </div>
          )}

          {/* 2-line Clamped Description */}
          {cleanDescription && (
            <p className="text-sm text-neutral-400 leading-relaxed mt-4 line-clamp-2">
              {cleanDescription}
            </p>
          )}
        </div>

        {/* Footer Row: Date & "Show Credential ↗" */}
        <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-1.5">
            <LuCalendar className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span>{formattedDate}</span>
          </div>

          <div className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-white group-hover:text-neutral-200 transition-colors">
            <span>Show Credential</span>
            <LuArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
