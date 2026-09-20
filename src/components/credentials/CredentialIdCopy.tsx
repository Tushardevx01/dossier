"use client";

import { useState } from "react";
import { LuCopy, LuCheck } from "react-icons/lu";

interface CredentialIdCopyProps {
  credentialId: string;
  inline?: boolean;
}

export function CredentialIdCopy({ credentialId, inline = false }: CredentialIdCopyProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(credentialId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is restricted
      try {
        const textarea = document.createElement("textarea");
        textarea.value = credentialId;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Silently handle error
      }
    }
  }

  if (inline) {
    return (
      <div className="inline-flex items-center gap-2 font-mono text-xs text-neutral-400 bg-neutral-900/60 border border-neutral-800/80 px-2.5 py-1 rounded-md">
        <span className="text-neutral-500 uppercase tracking-wider text-[11px]">Credential ID</span>
        <span className="text-neutral-200 select-all font-medium">{credentialId}</span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy Credential ID"}
          title={copied ? "Copied" : "Copy to clipboard"}
          className="text-neutral-400 hover:text-white transition-colors focus:outline-none ml-0.5"
        >
          {copied ? (
            <span className="text-[10px] text-emerald-400 tracking-wider font-semibold">COPIED</span>
          ) : (
            <LuCopy className="w-3.5 h-3.5 opacity-70 hover:opacity-100" />
          )}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-1.5">
        <span>CREDENTIAL ID</span>
        {copied && (
          <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase transition-opacity">
            COPIED
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-mono text-neutral-200 font-medium select-all truncate">
          {credentialId}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy Credential ID"}
          title={copied ? "Copied" : "Copy to clipboard"}
          className="p-1 rounded text-neutral-500 hover:text-white hover:bg-neutral-900 transition-colors focus:outline-none"
        >
          {copied ? (
            <LuCheck className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <LuCopy className="w-3.5 h-3.5 opacity-70 hover:opacity-100 transition-opacity" />
          )}
        </button>
      </div>
    </div>
  );
}
