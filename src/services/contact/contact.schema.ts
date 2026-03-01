/**
 * Contact Form Validation Schema
 *
 * Runtime validation for contact form submissions.
 * Single source of truth for input constraints.
 */

import { z } from "zod";

export const ALLOWED_CONTACT_REASONS = [
  "Collaboration",
  "Project Discussion",
  "Hiring Opportunity",
  "Technical Conversation",
] as const;

export type ContactReason = (typeof ALLOWED_CONTACT_REASONS)[number];

export const ContactFormSchema = z.object({
  senderName: z
    .string()
    .min(1, "Name is required")
    .max(80, "Name must be 80 characters or less")
    .transform((val) => val.trim()),

  senderEmail: z
    .string()
    .min(1, "Email is required")
    .max(254, "Email must be 254 characters or less")
    .email("Invalid email format")
    .transform((val) => val.trim().toLowerCase()),

  reasonToContact: z.enum(ALLOWED_CONTACT_REASONS, {
    message: "Invalid contact reason",
  }),

  senderMsg: z
    .string()
    .min(1, "Message is required")
    .max(3000, "Message must be 3000 characters or less")
    .transform((val) => val.trim()),

  // Honeypot field - must be empty
  website: z
    .string()
    .max(0, "Invalid submission")
    .optional()
    .default(""),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

/**
 * Validate contact form input
 * Returns either validated data or structured error
 */
export function validateContactForm(input: unknown): 
  | { success: true; data: ContactFormInput }
  | { success: false; error: { code: string; message: string; field?: string } } {
  
  const result = ContactFormSchema.safeParse(input);
  
  if (result.success) {
    return { success: true, data: result.data };
  }

  const firstIssue = result.error.issues[0];
  return {
    success: false,
    error: {
      code: "VALIDATION_ERROR",
      message: firstIssue.message,
      field: firstIssue.path.join("."),
    },
  };
}
