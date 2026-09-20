"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import {
  LuPlus,
  LuTrash2,
  LuFileText,
  LuExternalLink,
  LuKey,
  LuRefreshCw,
  LuCircleAlert,
  LuCircleCheck,
  LuPencil,
  LuArrowLeft,
} from "react-icons/lu";
import type { Credential } from "@/db/schema";
import { slugifyTitle } from "@/lib/credential-utils";

export function CredentialsManager() {
  const [apiKey, setApiKey] = useState("");
  const [isKeySaved, setIsKeySaved] = useState(false);
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal / Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  // Canonical Form inputs
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [credentialLink, setCredentialLink] = useState("");
  const [description, setDescription] = useState("");
  const [certFile, setCertFile] = useState<File | null>(null);

  // Load API key from sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem("admin_api_key");
    if (saved) {
      setApiKey(saved);
      setIsKeySaved(true);
    }
    fetchCredentials();
  }, []);

  async function fetchCredentials() {
    setLoading(true);
    try {
      const res = await fetch("/api/credentials");
      const data = await res.json();
      if (data.success) {
        setCredentials(data.data || []);
      }
    } catch {
      setStatusMessage({ type: "error", text: "Failed to load credentials from database." });
    } finally {
      setLoading(false);
    }
  }

  function handleSaveKey(e: React.FormEvent) {
    e.preventDefault();
    if (!apiKey.trim()) return;
    sessionStorage.setItem("admin_api_key", apiKey.trim());
    setIsKeySaved(true);
    setStatusMessage({ type: "success", text: "Admin API Key applied for session." });
  }

  function handleResetKey() {
    sessionStorage.removeItem("admin_api_key");
    setApiKey("");
    setIsKeySaved(false);
  }

  function resetForm() {
    setTitle("");
    setIssuer("");
    setIssueDate("");
    setCredentialLink("");
    setDescription("");
    setCertFile(null);
    setEditingId(null);
    setIsFormOpen(false);
  }

  function openCreateModal() {
    resetForm();
    setIsFormOpen(true);
  }

  function openEditModal(cred: Credential) {
    resetForm();
    setEditingId(cred.id);
    setTitle(cred.title);
    setIssuer(cred.issuer);
    setIssueDate(cred.issueDate ? new Date(cred.issueDate).toISOString().split("T")[0] : "");
    setCredentialLink(cred.credentialLink || "");
    setDescription(cred.description || "");
    setIsFormOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatusMessage(null);

    const activeKey = apiKey.trim() || sessionStorage.getItem("admin_api_key") || "";
    if (!activeKey) {
      setStatusMessage({ type: "error", text: "Admin API Key required to save changes." });
      return;
    }

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("issuer", issuer);
        formData.append("issueDate", issueDate);
        if (credentialLink) formData.append("credentialLink", credentialLink);
        if (description) formData.append("description", description);
        if (certFile) formData.append("certificateFile", certFile);

        const url = editingId ? `/api/credentials/${editingId}` : "/api/credentials";
        const method = editingId ? "PATCH" : "POST";

        const res = await fetch(url, {
          method,
          headers: {
            Authorization: `Bearer ${activeKey}`,
          },
          body: formData,
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error?.message || "Failed to save credential");
        }

        setStatusMessage({
          type: "success",
          text: editingId ? "Credential updated successfully." : "Credential created and uploaded to R2.",
        });
        resetForm();
        fetchCredentials();
      } catch (err) {
        setStatusMessage({
          type: "error",
          text: err instanceof Error ? err.message : "An error occurred.",
        });
      }
    });
  }

  async function handleDelete(id: number) {
    const activeKey = apiKey.trim() || sessionStorage.getItem("admin_api_key") || "";
    if (!activeKey) {
      setStatusMessage({ type: "error", text: "Admin API Key required to delete." });
      return;
    }

    if (!confirm("Are you sure you want to permanently delete this credential and remove its file from Cloudflare R2?")) {
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await fetch(`/api/credentials/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${activeKey}`,
        },
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to delete credential");
      }

      setStatusMessage({
        type: "success",
        text: "Credential and R2 files deleted successfully.",
      });
      fetchCredentials();
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to delete credential",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-neutral-800">
        <div>
          <Link
            href="/credentials"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white mb-2 transition-colors"
          >
            <LuArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Credentials Registry</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Credentials &amp; R2 Asset Manager
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Database-backed registry with off-repo Cloudflare R2 object storage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchCredentials}
            disabled={loading}
            className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white transition-colors"
            title="Refresh database records"
          >
            <LuRefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black hover:bg-neutral-200 transition-colors text-xs font-medium"
          >
            <LuPlus className="w-4 h-4" />
            <span>Add Credential</span>
          </button>
        </div>
      </div>

      {/* Admin Authorization Key Card */}
      <div className="mb-8 p-5 rounded-2xl border border-neutral-800 bg-neutral-900/40">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-neutral-800 text-neutral-300">
              <LuKey className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Administrator Authorization</h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Mutations (creating, updating, deleting) require an active Admin API Key.
              </p>
            </div>
          </div>
          {isKeySaved && (
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-md">
              <LuCircleCheck className="w-3.5 h-3.5" />
              <span>KEY ACTIVE</span>
            </span>
          )}
        </div>

        <form onSubmit={handleSaveKey} className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter ADMIN_API_KEY..."
            className="flex-grow px-3 py-2 rounded-xl border border-neutral-700 bg-black/40 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-white/40"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl border border-neutral-700 hover:border-neutral-500 bg-neutral-800 text-xs font-medium text-white transition-colors"
          >
            Apply Key
          </button>
          {isKeySaved && (
            <button
              type="button"
              onClick={handleResetKey}
              className="px-3 py-2 rounded-xl border border-neutral-800 text-xs text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              Clear
            </button>
          )}
        </form>
      </div>

      {/* Status Alert Banner */}
      {statusMessage && (
        <div
          className={`mb-6 p-4 rounded-xl border flex items-center gap-3 text-xs ${
            statusMessage.type === "success"
              ? "bg-emerald-950/40 border-emerald-800/40 text-emerald-300"
              : "bg-red-950/40 border-red-800/40 text-red-300"
          }`}
        >
          {statusMessage.type === "success" ? (
            <LuCircleCheck className="w-4 h-4 shrink-0" />
          ) : (
            <LuCircleAlert className="w-4 h-4 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Create / Edit Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-xl my-8 rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 shadow-2xl">
            <h2 className="text-lg font-semibold text-white mb-1">
              {editingId ? "Edit Credential Record" : "Add New Credential"}
            </h2>
            <p className="text-xs text-neutral-400 mb-6">
              Files are automatically uploaded to Cloudflare R2 and referenced via canonical objectLink.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. AWS Certified Solutions Architect"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-700 bg-black/40 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">
                    Issuer *
                  </label>
                  <input
                    type="text"
                    required
                    value={issuer}
                    onChange={(e) => setIssuer(e.target.value)}
                    placeholder="e.g. Oracle University"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-700 bg-black/40 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">
                    Issue Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-700 bg-black/40 text-xs text-white focus:outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">
                    Credential Link (Optional Verification URL)
                  </label>
                  <input
                    type="url"
                    value={credentialLink}
                    onChange={(e) => setCredentialLink(e.target.value)}
                    placeholder="https://verify.example.com/..."
                    className="w-full px-3 py-2 rounded-xl border border-neutral-700 bg-black/40 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono text-neutral-300">
                    Markdown Description (Long-Form Certification Article)
                  </label>
                  <span className="text-[10px] font-mono text-neutral-500">
                    Supports ## Headings, Tables, Lists, Code & Blockquotes
                  </span>
                </div>
                <textarea
                  rows={14}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={`# Overview\n\nDetailed certification write-up...\n\n## Certification Details\n\n| Field | Value |\n|---|---|\n| Credential | Title |\n| Issue Date | Date |`}
                  className="w-full p-3.5 rounded-xl border border-neutral-700 bg-black/60 font-mono text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-white/50 leading-relaxed resize-y min-h-[220px]"
                />
                <p className="text-[10px] font-mono text-neutral-500 mt-1">
                  Rendered as a structured Engineering Notes-style article on the detail page.
                </p>
              </div>

              {/* R2 Certificate File Upload */}
              <div className="pt-2 border-t border-neutral-800">
                <label className="block text-xs font-mono text-neutral-300 mb-1 flex items-center gap-1.5">
                  <LuFileText className="w-3.5 h-3.5 text-blue-400" />
                  <span>Certificate File (Uploaded to Cloudflare R2) {editingId ? "(Optional replacement)" : "*"}</span>
                </label>
                <input
                  type="file"
                  required={!editingId}
                  accept=".pdf,.png,.jpg,.jpeg,.webp"
                  onChange={(e) => setCertFile(e.target.files?.[0] || null)}
                  className="w-full text-[11px] font-mono text-neutral-400 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:bg-white/10 file:text-white hover:file:bg-white/20"
                />
                <p className="text-[10px] text-neutral-500 mt-1">PDF, PNG, JPG, or WEBP (Max 15MB)</p>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 rounded-xl border border-neutral-700 text-xs font-mono text-neutral-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-5 py-2 rounded-xl bg-white text-black hover:bg-neutral-200 text-xs font-medium transition-colors disabled:opacity-50"
                >
                  {isPending ? "Uploading to R2 & DB..." : editingId ? "Update Credential" : "Create & Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* List of Credentials */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/30 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">
            Current Database Records ({credentials.length})
          </h2>
          <span className="text-xs font-mono text-neutral-500">Live PostgreSQL Data</span>
        </div>

        {credentials.length === 0 ? (
          <div className="p-12 text-center text-xs font-mono text-neutral-500">
            No credential records found in database. Click &ldquo;Add Credential&rdquo; above to add one.
          </div>
        ) : (
          <div className="divide-y divide-neutral-800/80">
            {credentials.map((cred) => (
              <div
                key={cred.id}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-900/50 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-mono text-neutral-400">{cred.issuer}</span>
                    <span className="text-neutral-600">&bull;</span>
                    <span className="text-xs font-mono text-neutral-500">
                      {new Date(cred.issueDate).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-base font-medium text-white mb-2">
                    <Link
                      href={`/credentials/${cred.slug || slugifyTitle(cred.title)}`}
                      className="hover:underline"
                    >
                      {cred.title}
                    </Link>
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400">
                    {cred.objectLink && (
                      <a
                        href={cred.objectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:text-white"
                      >
                        <LuFileText className="w-3.5 h-3.5 text-blue-400" />
                        <span>R2 Object</span>
                      </a>
                    )}
                    {cred.credentialLink && (
                      <a
                        href={cred.credentialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:text-white"
                      >
                        <LuExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Verify Link</span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => openEditModal(cred)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-neutral-700 hover:border-neutral-600 text-neutral-300 hover:text-white text-xs font-mono transition-colors"
                  >
                    <LuPencil className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(cred.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-900/60 hover:border-red-700 bg-red-950/20 text-red-400 hover:text-red-300 text-xs font-mono transition-colors"
                  >
                    <LuTrash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
