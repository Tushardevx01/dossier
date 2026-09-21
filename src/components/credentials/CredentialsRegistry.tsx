"use client";


import type { Credential } from "@/db/schema";
import { CredentialRecordCard } from "./CredentialRecordCard";

interface CredentialsRegistryProps {
  credentials: Credential[];
}

export function CredentialsRegistry({ credentials }: CredentialsRegistryProps) {
  return (
    <>
      {/* Main Records Section: 2-Column Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28">
        {credentials.length === 0 ? (
          /* Compact, understated empty state */
          <div className="border-y border-neutral-800 py-16 px-4 text-center my-4">
            <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-3">
              00 / REGISTRY
            </div>
            <h2 className="text-lg sm:text-xl font-medium text-white mb-2">
              No credentials recorded yet.
            </h2>
            <p className="text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
              Verified certifications and credential documents will appear here once added to the database.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
            {credentials.map((cred, index) => (
              <CredentialRecordCard key={cred.id} credential={cred} index={index} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
