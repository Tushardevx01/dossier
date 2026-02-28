/**
 * useContactForm Hook
 *
 * Encapsulates contact form state, validation, and submission logic.
 * Keeps the ContactFormCard component focused on rendering.
 */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export interface ContactFormValues {
  senderName: string;
  senderEmail: string;
  reasonToContact: string;
  senderMsg: string;
  /** Honeypot field — should always be empty */
  website: string;
}

const INITIAL_VALUES: ContactFormValues = {
  senderName: "",
  senderEmail: "",
  reasonToContact: "Collaboration",
  senderMsg: "",
  website: "",
};

const SENT_FEEDBACK_DURATION = 3000;

export function useContactForm() {
  const [formValues, setFormValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const sentTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-reset "sent" state
  useEffect(() => {
    if (!isSent) return;
    sentTimerRef.current = setTimeout(() => setIsSent(false), SENT_FEEDBACK_DURATION);
    return () => {
      if (sentTimerRef.current) clearTimeout(sentTimerRef.current);
    };
  }, [isSent]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormValues((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSending(true);

      const sendPromise = new Promise<string>(async (resolve, reject) => {
        try {
          const response = await fetch("/api/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formValues),
          });

          const data = await response.json();

          if (response.ok) {
            setIsSent(true);
            setFormValues(INITIAL_VALUES);
            resolve(data.message);
          } else {
            reject(new Error(data.error || "Failed to send message"));
          }
        } catch (error) {
          reject(error);
        } finally {
          setIsSending(false);
        }
      });

      toast.promise(sendPromise, {
        loading: "Sending your message...",
        success: "Message has been received! I'll get back to you soon.",
        error: (error: Error) => {
          if (error.message.includes("not valid")) {
            return `The email address you entered is not valid (${formValues.senderEmail}). Please use a real email.`;
          }
          return error.message || "An error occurred while sending your message. Please try again later.";
        },
      });
    },
    [formValues]
  );

  return {
    formValues,
    isSending,
    isSent,
    handleChange,
    handleSubmit,
  } as const;
}
