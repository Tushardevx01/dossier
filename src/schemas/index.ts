import { z } from "zod";

const webUrl = z
  .string()
  .trim()
  .max(2048)
  .url()
  .refine((value) => {
    try {
      const url = new URL(value);
      return (
        ["https:", "http:"].includes(url.protocol) &&
        !url.username &&
        !url.password
      );
    } catch {
      return false;
    }
  }, "Expected an HTTP(S) URL without credentials");
const storageKey = z
  .string()
  .regex(
    /^credentials\/[A-Za-z0-9_-]+\/[A-Za-z0-9_.-]+$/,
    "Invalid storage key",
  );
const slug = z
  .string()
  .trim()
  .min(2)
  .max(255)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug");

/* =========================================================================
   2. RUNTIME VALIDATION SCHEMAS (ZOD)
   ========================================================================= */

/**
 * Credential Creation JSON Schema
 */
export const CredentialJsonSchema = z.object({
  title: z.string().trim().min(2, "Title is required").max(255),
  slug: slug.optional().nullable(),
  issuer: z.string().trim().min(2, "Issuer is required").max(255),
  issueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Valid issue date is required",
  }),
  objectLink: z.union([webUrl, storageKey]),
  credentialLink: webUrl.optional().nullable().or(z.literal("")),
  description: z.string().optional().nullable(),
});

export type CredentialJsonInput = z.infer<typeof CredentialJsonSchema>;

/**
 * Credential Update JSON Schema
 */
export const UpdateCredentialJsonSchema = CredentialJsonSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "At least one field is required",
);

export const UpdateJsonSchema = UpdateCredentialJsonSchema;
export type UpdateCredentialJsonInput = z.infer<
  typeof UpdateCredentialJsonSchema
>;

/**
 * Contact Form Validation Schema
 */
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
    .transform((val) => val.replace(/[\r\n\t]+/g, " ").trim())
    .pipe(
      z
        .string()
        .min(1, "Name is required")
        .max(80, "Name must be 80 characters or less"),
    ),

  senderEmail: z
    .string()
    .trim()
    .min(1, "Email is required")
    .max(254, "Email must be 254 characters or less")
    .email("Invalid email format")
    .transform((val) => val.trim().toLowerCase()),

  reasonToContact: z.enum(ALLOWED_CONTACT_REASONS, {
    message: "Invalid contact reason",
  }),

  senderMsg: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(3000, "Message must be 3000 characters or less")
    .transform((val) => val.trim()),

  // Honeypot field - should be empty, silently captured in service layer if filled
  website: z.string().optional().default(""),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

/**
 * Validate contact form input
 * Returns either validated data or structured error
 */
export function validateContactForm(input: unknown):
  | { success: true; data: ContactFormInput }
  | {
      success: false;
      error: { code: string; message: string; field?: string };
    } {
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

/**
 * Analyze Endpoint Request Validation Schema
 */
export const AnalyzeRequestSchema = z.object({
  url: z.string().min(1, "URL is required").max(2048, "URL too long"),
});

export type AnalyzeRequestInput = z.infer<typeof AnalyzeRequestSchema>;
