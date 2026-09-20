-- Migration: update_credentials_schema
-- Updates credentials table to store canonical metadata:
-- title, slug, issuer, issue_date, object_link, credential_link, description

ALTER TABLE "credentials" ADD COLUMN IF NOT EXISTS "issue_date" timestamp with time zone;
ALTER TABLE "credentials" ADD COLUMN IF NOT EXISTS "object_link" text;
ALTER TABLE "credentials" ADD COLUMN IF NOT EXISTS "credential_link" text;

-- Safely copy data from legacy columns
UPDATE "credentials" SET "issue_date" = "issued_at" WHERE "issue_date" IS NULL AND "issued_at" IS NOT NULL;
UPDATE "credentials" SET "object_link" = "certificate_url" WHERE "object_link" IS NULL AND "certificate_url" IS NOT NULL;
UPDATE "credentials" SET "credential_link" = "verification_url" WHERE "credential_link" IS NULL AND "verification_url" IS NOT NULL;

-- Ensure required fields on existing real records
UPDATE "credentials" SET "issuer" = 'Oracle University' WHERE "id" = 1 AND ("issuer" IS NULL OR "issuer" = '');
UPDATE "credentials" SET "slug" = 'agentic-ai-certified-foundations-associate' WHERE "id" = 1 AND ("slug" IS NULL OR "slug" = '');

-- Enforce constraints
ALTER TABLE "credentials" ALTER COLUMN "slug" SET NOT NULL;
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'credentials_slug_unique'
  ) THEN
    ALTER TABLE "credentials" ADD CONSTRAINT "credentials_slug_unique" UNIQUE ("slug");
  END IF;
END $$;

ALTER TABLE "credentials" ALTER COLUMN "issuer" SET NOT NULL;
ALTER TABLE "credentials" ALTER COLUMN "issue_date" SET NOT NULL;
ALTER TABLE "credentials" ALTER COLUMN "object_link" SET NOT NULL;

-- Drop deprecated legacy columns
ALTER TABLE "credentials" DROP COLUMN IF EXISTS "issued_at";
ALTER TABLE "credentials" DROP COLUMN IF EXISTS "certificate_url";
ALTER TABLE "credentials" DROP COLUMN IF EXISTS "verification_url";
ALTER TABLE "credentials" DROP COLUMN IF EXISTS "thumbnail_url";
ALTER TABLE "credentials" DROP COLUMN IF EXISTS "valid_until";
ALTER TABLE "credentials" DROP COLUMN IF EXISTS "credential_id";
