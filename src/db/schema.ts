/**
 * Unified Application & Database Schema
 *
 * Single source of truth for:
 * 1. Neon PostgreSQL Database Tables (Drizzle ORM)
 * 2. Type-safe Database Model Inferences
 * 3. Runtime API & Form Validation Schemas (Zod)
 */

import { pgTable, serial, text, varchar, integer, boolean, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { z } from 'zod';
import type { ArticleCategory, ArticleDifficulty } from '@/types/article';

/* =========================================================================
   1. DATABASE TABLES (DRIZZLE ORM)
   ========================================================================= */

/**
 * engineering_notes table
 *
 * Stores all published engineering notes with content and metadata.
 */
export const engineeringNotes = pgTable('engineering_notes', {
  id: serial('id').primaryKey(),

  // URL slug (unique identifier)
  slug: varchar('slug', { length: 255 }).notNull().unique(),

  // Content fields
  title: varchar('title', { length: 255 }).notNull(),
  subtitle: text('subtitle').notNull(),
  excerpt: text('excerpt').notNull(),

  // Content stored as serialized HTML from trusted source data
  content: text('content').notNull(),

  // Metadata
  category: varchar('category', { length: 50 }).notNull().$type<ArticleCategory>(),
  level: varchar('difficulty', { length: 20 }).notNull().$type<ArticleDifficulty>(),

  // Reading time in minutes
  readTime: integer('read_time').notNull(),

  // Publication metadata
  date: text('date').notNull(),

  // Tags and flags
  tags: jsonb('tags').$type<string[]>().notNull().default(sql`'[]'::jsonb`),
  published: boolean('published').notNull().default(true),
  featured: boolean('featured').notNull().default(false),

  // Legacy article body fields used by the current article page
  whatILearned: jsonb('what_i_learned').$type<string[]>().notNull().default(sql`'[]'::jsonb`),
  improvements: jsonb('improvements').$type<string[]>().notNull().default(sql`'[]'::jsonb`),
  relatedNoteSlugs: jsonb('related_note_slugs').$type<string[]>(),
  relatedProjectSlug: varchar('related_project_slug', { length: 255 }),
  relatedSystemDesignSlug: varchar('related_system_design_slug', { length: 255 }),

  // Timestamps
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .default(sql`now()`),
});

export type EngineeringNote = typeof engineeringNotes.$inferSelect;
export type NewEngineeringNote = typeof engineeringNotes.$inferInsert;

/**
 * case_studies table
 *
 * Stores all published technical case studies with rich content and metadata.
 */
export const caseStudies = pgTable('case_studies', {
  id: serial('id').primaryKey(),

  // URL slug (unique identifier)
  slug: varchar('slug', { length: 255 }).notNull().unique(),

  // Content fields
  title: varchar('title', { length: 255 }).notNull(),
  subtitle: text('subtitle').notNull(),
  excerpt: text('excerpt').notNull(),

  // Content stored as rich serialized HTML
  content: text('content').notNull(),

  // Metadata
  category: varchar('category', { length: 100 }).notNull(),
  level: varchar('level', { length: 50 }).notNull().default('Advanced'),

  // Reading time in minutes
  readTime: integer('read_time').notNull().default(8),

  // Publication metadata
  date: text('date').notNull(),

  // Tags and flags
  tags: jsonb('tags').$type<string[]>().notNull().default(sql`'[]'::jsonb`),
  published: boolean('published').notNull().default(true),
  featured: boolean('featured').notNull().default(false),

  // Case study structured fields
  whatILearned: jsonb('what_i_learned').$type<string[]>().notNull().default(sql`'[]'::jsonb`),
  improvements: jsonb('improvements').$type<string[]>().notNull().default(sql`'[]'::jsonb`),
  relatedNoteSlugs: jsonb('related_note_slugs').$type<string[]>().notNull().default(sql`'[]'::jsonb`),
  relatedProjectSlug: varchar('related_project_slug', { length: 255 }),
  relatedSystemDesignSlug: varchar('related_system_design_slug', { length: 255 }),

  // Timestamps
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .default(sql`now()`),
});

export type CaseStudy = typeof caseStudies.$inferSelect;
export type NewCaseStudy = typeof caseStudies.$inferInsert;

/**
 * api_keys table
 *
 * Stores API keys for authenticating requests to protected endpoints.
 */
export const apiKeys = pgTable('api_keys', {
  id: serial('id').primaryKey(),

  // API key value (hashed for security)
  keyHash: varchar('key_hash', { length: 255 }).notNull().unique(),

  // Human-readable name
  name: varchar('name', { length: 100 }).notNull(),

  // Permissions (JSON object defining what the key can access)
  permissions: jsonb('permissions').$type<{
    analyze?: boolean;
    rateLimit?: number; // requests per minute
    admin?: boolean;
    credentials?: boolean;
  }>().notNull().default(sql`'{"analyze": true, "rateLimit": 10}'::jsonb`),

  // Status
  active: boolean('active').notNull().default(true),

  // Usage tracking
  lastUsed: timestamp('last_used', { withTimezone: true }),
  usageCount: integer('usage_count').notNull().default(0),

  // Timestamps
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .default(sql`now()`),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
});

export type ApiKey = typeof apiKeys.$inferSelect;
export type NewApiKey = typeof apiKeys.$inferInsert;

/**
 * credentials table
 *
 * Stores verified credentials, certifications, and academic records.
 * Binary certificate files and preview images are stored in Cloudflare R2.
 */
export const credentials = pgTable('credentials', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  issuer: varchar('issuer', { length: 255 }).notNull(),
  issueDate: timestamp('issue_date', { withTimezone: true }).notNull(),
  objectLink: text('object_link').notNull(),
  credentialLink: text('credential_link'),
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .default(sql`now()`),
});

export type Credential = typeof credentials.$inferSelect;
export type NewCredential = typeof credentials.$inferInsert;


/* =========================================================================
   2. RUNTIME VALIDATION SCHEMAS (ZOD)
   ========================================================================= */

/**
 * Credential Creation JSON Schema
 */
export const CredentialJsonSchema = z.object({
  title: z.string().min(2, "Title is required").max(255),
  slug: z.string().min(2).max(255).optional().nullable(),
  issuer: z.string().min(2, "Issuer is required").max(255),
  issueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Valid issue date is required",
  }),
  objectLink: z.string().min(1, "Object link is required"),
  credentialLink: z
    .string()
    .url("Invalid credential URL")
    .optional()
    .nullable()
    .or(z.literal("")),
  description: z.string().optional().nullable(),
});

export type CredentialJsonInput = z.infer<typeof CredentialJsonSchema>;

/**
 * Credential Update JSON Schema
 */
export const UpdateCredentialJsonSchema = z.object({
  title: z.string().min(2).max(255).optional(),
  slug: z.string().min(2).max(255).optional().nullable(),
  issuer: z.string().min(2).max(255).optional(),
  issueDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" })
    .optional(),
  objectLink: z.string().min(1).optional(),
  credentialLink: z.string().url().optional().nullable().or(z.literal("")),
  description: z.string().optional().nullable(),
});

export const UpdateJsonSchema = UpdateCredentialJsonSchema;
export type UpdateCredentialJsonInput = z.infer<typeof UpdateCredentialJsonSchema>;

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
    .min(1, "Name is required")
    .max(80, "Name must be 80 characters or less")
    .transform((val) => val.replace(/[\r\n\t]+/g, " ").trim()),

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

  // Honeypot field - should be empty, silently captured in service layer if filled
  website: z
    .string()
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

/**
 * Analyze Endpoint Request Validation Schema
 */
export const AnalyzeRequestSchema = z.object({
  url: z.string().min(1, "URL is required").max(2048, "URL too long"),
});

export type AnalyzeRequestInput = z.infer<typeof AnalyzeRequestSchema>;
