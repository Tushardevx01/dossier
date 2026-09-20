CREATE TABLE IF NOT EXISTS "api_keys" (
	"id" serial PRIMARY KEY,
	"key_hash" varchar(255) NOT NULL UNIQUE,
	"name" varchar(100) NOT NULL,
	"permissions" jsonb DEFAULT '{"analyze": true, "rateLimit": 10}' NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"last_used" timestamp with time zone,
	"usage_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "case_studies" (
	"id" serial PRIMARY KEY,
	"slug" varchar(255) NOT NULL UNIQUE,
	"title" varchar(255) NOT NULL,
	"subtitle" text NOT NULL,
	"excerpt" text NOT NULL,
	"content" text NOT NULL,
	"category" varchar(100) NOT NULL,
	"level" varchar(50) DEFAULT 'Advanced' NOT NULL,
	"read_time" integer DEFAULT 8 NOT NULL,
	"date" text NOT NULL,
	"tags" jsonb DEFAULT '[]' NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"what_i_learned" jsonb DEFAULT '[]' NOT NULL,
	"improvements" jsonb DEFAULT '[]' NOT NULL,
	"related_note_slugs" jsonb DEFAULT '[]' NOT NULL,
	"related_project_slug" varchar(255),
	"related_system_design_slug" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "credentials" (
	"id" serial PRIMARY KEY,
	"title" varchar(255) NOT NULL,
	"issuer" varchar(255) NOT NULL,
	"description" text,
	"issued_at" timestamp with time zone NOT NULL,
	"credential_id" varchar(255),
	"verification_url" text,
	"certificate_url" text,
	"thumbnail_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "engineering_notes" (
	"id" serial PRIMARY KEY,
	"slug" varchar(255) NOT NULL UNIQUE,
	"title" varchar(255) NOT NULL,
	"subtitle" text NOT NULL,
	"excerpt" text NOT NULL,
	"content" text NOT NULL,
	"category" varchar(50) NOT NULL,
	"difficulty" varchar(20) NOT NULL,
	"read_time" integer NOT NULL,
	"date" text NOT NULL,
	"tags" jsonb DEFAULT '[]' NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"what_i_learned" jsonb DEFAULT '[]' NOT NULL,
	"improvements" jsonb DEFAULT '[]' NOT NULL,
	"related_note_slugs" jsonb,
	"related_project_slug" varchar(255),
	"related_system_design_slug" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
