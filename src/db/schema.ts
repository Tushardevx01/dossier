/**
 * Database Schema
 *
 * Defines the structure for engineering notes in Neon PostgreSQL.
 * Using Drizzle ORM for type-safe queries.
 */

import { pgTable, serial, text, varchar, integer, boolean, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import type { ArticleCategory, ArticleDifficulty } from '@/types/article';

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

/**
 * Type exports for type-safe queries
 */
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
    analyze: boolean;
    rateLimit: number; // requests per minute
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

/**
 * Type exports for API keys
 */
export type ApiKey = typeof apiKeys.$inferSelect;
export type NewApiKey = typeof apiKeys.$inferInsert;
