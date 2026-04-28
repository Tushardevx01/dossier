"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * NotesBackHandler
 * When the user presses the browser Back button while on /engineering-notes,
 * immediately redirect them to the home page ("/").
 */
export default function NotesBackHandler() {
  const router = useRouter();

  useEffect(() => {
    const onPopState = () => {
      // Replace current history entry with home to avoid leaving a stale history chain
      router.replace("/");
    };

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, [router]);

  return null;
}
