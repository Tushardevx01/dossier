"use client";

import Link from "next/link";
import { LuArrowUpRight, LuFileText, LuExternalLink } from "react-icons/lu";
import type { Credential } from "@/db/schema";
import { slugifyTitle, formatEditorialDate } from "@/lib/credential-utils";
import { stripMarkdown } from "@/lib/markdown";

interface CredentialRecordCardProps {
  credential: Credential;
  index: number;
}

export function CredentialRecordCard({ credential }: CredentialRecordCardProps) {
  const formattedDate = formatEditorialDate(credential.issueDate);
  const isVerified = Boolean(
    credential.credentialLink && credential.credentialLink.trim().length > 0
  );
  const credSlug = credential.slug || slugifyTitle(credential.title);

  return (
    <article className="group cursor-pointer border border-neutral-800 rounded-lg p-5 sm:p-6 hover:border-neutral-700 hover:bg-neutral-950/40 transition-all duration-200 ease-out hover:-translate-y-0.5">
      {/* Header: Title + Arrow */}
      <div className="flex items-start justify-between gap-4">
        <Link
          href={`/credentials/${credSlug}`}
          className="flex-grow focus:outline-none"
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-neutral-200 transition-colors duration-200 leading-tight">
            {credential.title}
          </h3>
        </Link>
        <Link
          href={`/credentials/${credSlug}`}
          className="text-neutral-500 group-hover:text-white transition-colors flex-shrink-0 mt-1"
          aria-label={`Open record for ${credential.title}`}
        >
          <LuArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      {/* Issuer */}
      {credential.issuer && (
        <div className="text-xs sm:text-sm font-mono text-neutral-400 mt-1.5">
          {credential.issuer}
        </div>
      )}

      {/* Description */}
      {credential.description && (
        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-3xl mt-3 line-clamp-2">
          {stripMarkdown(credential.description)}
        </p>
      )}

      {/* Metadata Bar */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-5 pt-4 border-t border-neutral-800 text-xs font-mono">
        <time
          dateTime={new Date(credential.issueDate).toISOString()}
          className="uppercase tracking-wider text-neutral-500"
        >
          {formattedDate}
        </time>

        <span className="text-neutral-700">&bull;</span>

        {isVerified ? (
          <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            VERIFIED
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
            RECORDED
          </span>
        )}

        {/* Action links */}
        <div className="w-full sm:w-auto sm:ml-auto flex items-center gap-3 pt-2 sm:pt-0">
          {credential.objectLink && (
            <a
              href={credential.objectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-mono text-neutral-400 hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <LuFileText className="w-3 h-3 text-neutral-400" />
              <span>CERTIFICATE</span>
            </a>
          )}

          {credential.credentialLink && (
            <a
              href={credential.credentialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <span>VERIFY</span>
              <LuExternalLink className="w-3 h-3" />
            </a>
          )}

          <Link
            href={`/credentials/${credSlug}`}
            className="text-neutral-500 group-hover:text-neutral-300 hover:text-white transition-colors flex-shrink-0"
          >
            Record →
          </Link>
        </div>
      </div>
    </article>
  );
}
