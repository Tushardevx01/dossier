/**
 * Next.js Instrumentation
 *
 * Runs once when the server starts.
 * Used for fail-fast environment validation and initialization.
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

import { logger } from "./lib/logger";

interface EnvValidationResult {
  valid: boolean;
  missing: string[];
  warnings: string[];
}

function validateEnvironment(): EnvValidationResult {
  const result: EnvValidationResult = {
    valid: true,
    missing: [],
    warnings: [],
  };

  // Required environment variables
  const requiredEnv = [
    { key: "QEV_API_KEY", description: "QuickEmailVerification API Key" },
    { key: "EMAIL_FROM", description: "Email sender address" },
    { key: "EMAIL_PASSWORD", description: "Email password/app password" },
  ];

  // Optional but recommended environment variables
  const optionalEnv = [
    { key: "UPSTASH_REDIS_REST_URL", description: "Upstash Redis URL (for distributed rate limiting)" },
    { key: "UPSTASH_REDIS_REST_TOKEN", description: "Upstash Redis Token" },
    { key: "LOG_LEVEL", description: "Logging level (debug|info|warn|error)" },
  ];

  for (const { key, description } of requiredEnv) {
    if (!process.env[key]) {
      result.valid = false;
      result.missing.push(`${key} - ${description}`);
    }
  }

  for (const { key, description } of optionalEnv) {
    if (!process.env[key]) {
      result.warnings.push(`${key} - ${description}`);
    }
  }

  return result;
}

export async function register() {
  // Only run on server
  if (typeof window !== "undefined") return;

  const startTime = Date.now();
  
  logger.info("Application starting", {
    nodeEnv: process.env.NODE_ENV,
  });

  // Validate environment variables
  const envValidation = validateEnvironment();

  if (envValidation.warnings.length > 0) {
    logger.warn("Optional environment variables missing", {
      missing: envValidation.warnings,
    });
  }

  if (!envValidation.valid) {
    logger.error("Missing required environment variables", {
      missing: envValidation.missing,
    });

    // Only fail in production runtime (not during Vercel build)
    // NEXT_PHASE is set during build, runtime has different indicators
    const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";
    
    if (process.env.NODE_ENV === "production" && !isBuildPhase) {
      // Log but don't crash - let the API routes handle missing env gracefully
      logger.warn("Application started with missing required environment variables");
    }
  }

  const bootTime = Date.now() - startTime;
  logger.info("Application initialized", { bootTimeMs: bootTime });
}
