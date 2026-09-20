import type { Metadata } from "next";
import { CredentialsManager } from "@/components/admin/CredentialsManager";
import { Navbar, Footer, Background } from "@/components/common";
import { getCredentialsCount } from "@/lib/credentials";

export const metadata: Metadata = {
  title: "Credentials Admin | Tushar Kanti Dey",
  description: "Administrative console for managing verified credentials and Cloudflare R2 assets.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminCredentialsPage() {
  const count = await getCredentialsCount();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/20">
      <Background />
      <Navbar credentialCount={count} />
      <main className="pt-20 sm:pt-24 pb-16">
        <CredentialsManager />
      </main>
      <Footer />
    </div>
  );
}
