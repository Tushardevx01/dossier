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
  subtitle: varchar('subtitle', { length: 500 }).notNull(),
  description: text('description').notNull(),
  
  // Content as markdown (render on client side)
  content: text('content').notNull(),
  
  // Metadata
  category: varchar('category', { length: 50 }).notNull() as any as typeof sql<ArticleCategory>,
  difficulty: varchar('difficulty', { length: 20 }).notNull() as any as typeof sql<ArticleDifficulty>,
  
  // Reading time in minutes
  readTime: integer('read_time').notNull(),
  
  // Publication metadata
  date: varchar('date', { length: 50 }).notNull(), // e.g., "Feb 20, 2026"
  
  // Flags
  published: boolean('published').notNull().default(true),
  featured: boolean('featured').notNull().default(false),
  
  // Tagging and relationships
  tags: jsonb('tags').$type<string[]>().notNull().default(sql`'[]'::jsonb`),
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
