"use client";

import { useMemo, useState } from "react";
import type { Credential } from "@/db/schema";
import { CredentialRecordCard } from "./CredentialRecordCard";

interface CredentialsRegistryProps {
  credentials: Credential[];
}

export function CredentialsRegistry({ credentials }: CredentialsRegistryProps) {
  const [selectedIssuer, setSelectedIssuer] = useState<string>("ALL");

  // Derive unique issuers from real database records (never fake)
  const issuers = useMemo(() => {
    const set = new Set<string>();
    for (const cred of credentials) {
      if (cred.issuer?.trim()) {
        set.add(cred.issuer.trim());
      }
    }
    return ["ALL", ...Array.from(set)];
  }, [credentials]);

  const filteredCredentials = useMemo(() => {
    if (selectedIssuer === "ALL") {
      return credentials;
    }
    return credentials.filter((cred) => cred.issuer?.trim() === selectedIssuer);
  }, [credentials, selectedIssuer]);

  const formattedCount = `${String(credentials.length).padStart(2, "0")} RECORDS`;

  return (
    <>
      {/* Filter / Registry Controls Row */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-neutral-800">
          <div className="flex flex-wrap gap-2">
            {issuers.map((item) => {
              const isSelected = selectedIssuer === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSelectedIssuer(item)}
                  className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-md text-xs font-mono transition-opacity duration-200 uppercase tracking-wider ${
                    isSelected
                      ? "bg-zinc-800 text-zinc-100 border border-zinc-700"
                      : "border border-zinc-800 bg-zinc-950/40 text-zinc-400 hover:opacity-85"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 shrink-0 self-start sm:self-auto">
            {formattedCount}
          </div>
        </div>
      </section>

      {/* Main Records Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28">
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
        ) : filteredCredentials.length === 0 ? (
          <div className="py-16 text-center text-sm font-mono text-neutral-500">
            No records found for &ldquo;{selectedIssuer}&rdquo;.
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-5">
            {filteredCredentials.map((cred, index) => (
              <CredentialRecordCard key={cred.id} credential={cred} index={index} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
