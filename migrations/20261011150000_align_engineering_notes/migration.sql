-- Repair databases initialized by the former request-time bootstrap, which used
-- "level" while Drizzle and the initial migration correctly use "difficulty".
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'engineering_notes' AND column_name = 'level')
     AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'engineering_notes' AND column_name = 'difficulty') THEN
    ALTER TABLE "engineering_notes" RENAME COLUMN "level" TO "difficulty";
  END IF;
END $$;
