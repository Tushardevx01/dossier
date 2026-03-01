/**
 * Distributed Rate Limiter
 *
 * Uses Upstash Redis in production for cross-instance rate limiting.
 * Falls back to in-memory store in development.
 */

import { Redis } from "@upstash/redis";
import { logger } from "@/lib/logger";

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

interface RateLimiter {
  check(key: string, maxRequests: number, windowMs: number): Promise<RateLimitResult>;
}

// ─── In-Memory Rate Limiter (Development) ────────────────────────────────────

interface MemoryEntry {
  count: number;
  resetAt: number;
}

const memoryStore = new Map<string, MemoryEntry>();

function cleanupMemoryStore(now: number) {
  if (memoryStore.size < 500) return;
  for (const [key, entry] of memoryStore.entries()) {
    if (entry.resetAt <= now) memoryStore.delete(key);
  }
}

const memoryRateLimiter: RateLimiter = {
  async check(key, maxRequests, windowMs) {
    const now = Date.now();
    cleanupMemoryStore(now);

    const current = memoryStore.get(key);
    const windowSeconds = Math.ceil(windowMs / 1000);

    if (!current || current.resetAt <= now) {
      memoryStore.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true, remaining: maxRequests - 1, retryAfterSeconds: windowSeconds };
    }

    if (current.count >= maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000),
      };
    }

    current.count += 1;
    return {
      allowed: true,
      remaining: Math.max(maxRequests - current.count, 0),
      retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000),
    };
  },
};

// ─── Upstash Redis Rate Limiter (Production) ─────────────────────────────────

let redisClient: Redis | null = null;

function getRedisClient(): Redis | null {
  if (redisClient) return redisClient;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  redisClient = new Redis({ url, token });
  return redisClient;
}

const redisRateLimiter: RateLimiter = {
  async check(key, maxRequests, windowMs) {
    const redis = getRedisClient();
    if (!redis) {
      // Fallback to memory if Redis not configured
      return memoryRateLimiter.check(key, maxRequests, windowMs);
    }

    const windowSeconds = Math.ceil(windowMs / 1000);
    const redisKey = `ratelimit:${key}`;

    try {
      const pipeline = redis.pipeline();
      pipeline.incr(redisKey);
      pipeline.ttl(redisKey);
      
      const results = await pipeline.exec<[number, number]>();
      const [count, ttl] = results;

      // Set expiry on first request
      if (count === 1 || ttl === -1) {
        await redis.expire(redisKey, windowSeconds);
      }

      const remaining = Math.max(maxRequests - count, 0);
      const retryAfter = ttl > 0 ? ttl : windowSeconds;

      if (count > maxRequests) {
        return { allowed: false, remaining: 0, retryAfterSeconds: retryAfter };
      }

      return { allowed: true, remaining, retryAfterSeconds: retryAfter };
    } catch (error) {
      logger.error("Redis rate limit error, falling back to memory", {
        error: error instanceof Error ? error.message : "Unknown error",
        key,
      });
      // Fallback to memory on Redis failure
      return memoryRateLimiter.check(key, maxRequests, windowMs);
    }
  },
};

// ─── Export ──────────────────────────────────────────────────────────────────

/**
 * Get the appropriate rate limiter based on environment
 */
function getRateLimiter(): RateLimiter {
  if (process.env.NODE_ENV === "production" && getRedisClient()) {
    return redisRateLimiter;
  }
  return memoryRateLimiter;
}

/**
 * Check rate limit for a given key
 */
export async function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): Promise<RateLimitResult> {
  const limiter = getRateLimiter();
  return limiter.check(key, maxRequests, windowMs);
}

/**
 * Create a rate limit key from request metadata
 */
export function createRateLimitKey(prefix: string, identifier: string): string {
  return `${prefix}:${identifier}`;
}
