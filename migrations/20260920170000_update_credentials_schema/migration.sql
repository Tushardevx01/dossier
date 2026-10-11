-- Migration: update_credentials_schema
-- Updates credentials table to store canonical metadata:
-- title, slug, issuer, issue_date, object_link, credential_link, description

ALTER TABLE "credentials" ADD COLUMN IF NOT EXISTS "issue_date" timestamp with time zone;
ALTER TABLE "credentials" ADD COLUMN IF NOT EXISTS "object_link" text;
ALTER TABLE "credentials" ADD COLUMN IF NOT EXISTS "credential_link" text;
ALTER TABLE "credentials" ADD COLUMN IF NOT EXISTS "slug" varchar(255);

-- Safely copy data from legacy columns
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'credentials' AND column_name = 'issued_at') THEN
    EXECUTE 'UPDATE credentials SET issue_date = issued_at WHERE issue_date IS NULL';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'credentials' AND column_name = 'certificate_url') THEN
    EXECUTE 'UPDATE credentials SET object_link = certificate_url WHERE object_link IS NULL';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'credentials' AND column_name = 'verification_url') THEN
    EXECUTE 'UPDATE credentials SET credential_link = verification_url WHERE credential_link IS NULL';
  END IF;
END $$;

-- Ensure required fields on existing real records
UPDATE "credentials" SET "slug" = 'credential-' || "id"::text WHERE "slug" IS NULL OR btrim("slug") = '';

-- Enforce constraints
ALTER TABLE "credentials" ALTER COLUMN "slug" SET NOT NULL;
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'credentials_slug_unique' AND conrelid = 'public.credentials'::regclass
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
