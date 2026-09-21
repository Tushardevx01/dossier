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

  return (
    <>
      {/* Filter / Registry Controls Row (shown if multiple issuers exist) */}
      {issuers.length > 2 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10">
          <div className="flex flex-wrap gap-2 pb-5 border-b border-neutral-800">
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
        </section>
      )}

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
        ) : filteredCredentials.length === 0 ? (
          <div className="py-16 text-center text-sm font-mono text-neutral-500">
            No records found for &ldquo;{selectedIssuer}&rdquo;.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
            {filteredCredentials.map((cred, index) => (
              <CredentialRecordCard key={cred.id} credential={cred} index={index} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
