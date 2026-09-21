"use client";

import { useState, useMemo } from "react";
import type { Credential } from "@/db/schema";
import { CredentialRecordCard } from "./CredentialRecordCard";
import { LuSearch } from "react-icons/lu";

interface CredentialsRegistryProps {
  credentials: Credential[];
}

export function CredentialsRegistry({ credentials }: CredentialsRegistryProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCredentials = useMemo(() => {
    if (!searchQuery.trim()) return credentials;
    
    const query = searchQuery.toLowerCase();
    return credentials.filter((cred) => {
      return (
        cred.title.toLowerCase().includes(query) ||
        cred.issuer.toLowerCase().includes(query) ||
        (cred.description && cred.description.toLowerCase().includes(query))
      );
    });
  }, [credentials, searchQuery]);

  return (
    <>
      {/* Search Bar */}
      {credentials.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <LuSearch className="h-4 w-4 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search certifications by name, issuer, or skills..."
              className="w-full bg-zinc-950/40 border border-zinc-800 rounded-lg pl-11 pr-4 py-3 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
            />
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
            No records found for &ldquo;{searchQuery}&rdquo;.
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
