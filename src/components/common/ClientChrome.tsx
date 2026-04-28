"use client";

import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";

export function ClientChrome() {
  return (
    <>
      <Toaster position="bottom-right" richColors closeButton />
      <Analytics />
    </>
  );
}