import { Navbar, Footer, Background } from "@/components/common";

export default function CredentialLoading() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/20 relative">
      <Background />
      <Navbar />

      <main className="max-w-[720px] mx-auto px-4 sm:px-6 md:px-8 pt-28 sm:pt-32 pb-24 sm:pb-32 w-full">

        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8 sm:mb-10 animate-pulse">
          <div className="h-4 w-32 bg-neutral-800 rounded" />
          <div className="h-5 w-24 bg-neutral-800 rounded" />
        </div>

        {/* Certificate Preview Skeleton */}
        <div className="w-full rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-4 sm:p-6 md:p-8 flex items-center justify-center mb-8 sm:mb-10 animate-pulse">
          <div className="w-full aspect-[16/10] max-w-[660px] rounded-lg border border-neutral-800/80 bg-neutral-950/70" />
        </div>

        {/* Title Skeleton */}
        <div className="mb-6 animate-pulse">
          <div className="h-3 w-28 bg-neutral-800 rounded mb-3" />
          <div className="h-9 sm:h-12 w-3/4 bg-neutral-800 rounded mb-2" />
          <div className="h-9 sm:h-12 w-1/2 bg-neutral-800 rounded" />
        </div>

        {/* Metadata Skeleton */}
        <div className="flex flex-wrap items-center gap-4 mb-6 sm:mb-8 animate-pulse">
          <div className="h-4 w-32 bg-neutral-800 rounded" />
          <div className="h-4 w-36 bg-neutral-800 rounded" />
          <div className="h-6 w-48 bg-neutral-800 rounded" />
        </div>

        {/* Description Skeleton */}
        <div className="space-y-2 mb-8 sm:mb-10 animate-pulse max-w-2xl">
          <div className="h-3.5 w-full bg-neutral-800 rounded" />
          <div className="h-3.5 w-5/6 bg-neutral-800 rounded" />
          <div className="h-3.5 w-4/6 bg-neutral-800 rounded" />
        </div>

        {/* Actions Skeleton */}
        <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-neutral-800/80 animate-pulse">
          <div className="h-10 w-36 bg-neutral-800 rounded-lg" />
          <div className="h-10 w-36 bg-neutral-800 rounded-lg" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
