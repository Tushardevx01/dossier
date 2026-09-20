import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import { Navbar, Footer, Background } from "@/components/common";
import { getCredentialsCount } from "@/lib/credentials";

export default async function CredentialNotFound() {
  const count = await getCredentialsCount();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/20 flex flex-col justify-between">
      <Background />
      <Navbar credentialCount={count} />

      <main className="max-w-[720px] mx-auto px-4 sm:px-6 md:px-8 pt-32 pb-24 text-center w-full">
        <div className="border border-neutral-800/80 rounded-xl p-10 sm:p-14 bg-neutral-900/30 max-w-lg mx-auto">
          <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-3">
            404 / NOT FOUND
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white mb-3">
            Credential not found
          </h1>
          <p className="text-xs font-mono text-neutral-400 mb-8 leading-relaxed">
            The requested certification record does not exist.
          </p>
          <Link
            href="/credentials"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-300 hover:text-white px-5 py-2.5 rounded-lg border border-neutral-800 hover:border-neutral-700 bg-neutral-900/80 transition-colors"
          >
            <LuArrowLeft className="w-3.5 h-3.5" />
            <span>← All Certifications</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
