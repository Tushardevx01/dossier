import { Redis } from "@upstash/redis";

import { logger } from "@/lib/logger";

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

interface MemoryEntry {
  count: number;
  resetAt: number;
}

const memoryStore = new Map<string, MemoryEntry>();
let redisClient: Redis | null = null;

function cleanupMemoryStore(now: number) {
  if (memoryStore.size < 500) return;
  for (const [key, entry] of memoryStore.entries()) {
    if (entry.resetAt <= now) memoryStore.delete(key);
  }
}

function getRedisClient(): Redis | null {
  if (redisClient) return redisClient;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  redisClient = new Redis({ url, token });
  return redisClient;
}

async function checkMemoryRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): Promise<RateLimitResult> {
  const now = Date.now();
  cleanupMemoryStore(now);

  const current = memoryStore.get(key);
  const windowSeconds = Math.ceil(windowMs / 1000);

  if (!current || current.resetAt <= now) {
    memoryStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: Math.max(maxRequests - 1, 0), retryAfterSeconds: windowSeconds };
  }

  if (current.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return {
    allowed: true,
    remaining: Math.max(maxRequests - current.count, 0),
    retryAfterSeconds: Math.max(0, Math.ceil((current.resetAt - now) / 1000)),
  };
}

async function checkRedisRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): Promise<RateLimitResult> {
  const redis = getRedisClient();
  if (!redis) {
    if (process.env.NODE_ENV === "production") {
      logger.error("Redis rate limiting unavailable in production. Failing closed to prevent bypass.", { key });
      return { allowed: false, remaining: 0, retryAfterSeconds: windowMs / 1000 };
    }
    return checkMemoryRateLimit(key, maxRequests, windowMs);
  }

  const windowSeconds = Math.ceil(windowMs / 1000);
  const redisKey = `ratelimit:${key}`;

  try {
    const pipeline = redis.pipeline();
    pipeline.incr(redisKey);
    // Setting expire on every request creates a sliding window and prevents the race condition
    // where a key never gets an expiration.
    pipeline.expire(redisKey, windowSeconds);
    pipeline.ttl(redisKey);

    const [count, , ttl] = await pipeline.exec<[number, number, number]>();

    const retryAfterSeconds = ttl > 0 ? ttl : windowSeconds;
    const remaining = Math.max(maxRequests - (count as number), 0);

    return {
      allowed: (count as number) <= maxRequests,
      remaining,
      retryAfterSeconds,
    };
  } catch (error) {
    logger.error("Redis rate limit check failed", {
      key,
      error: error instanceof Error ? error.message : String(error),
    });

    if (process.env.NODE_ENV === "production") {
      logger.error("Failing closed on Redis error in production");
      return { allowed: false, remaining: 0, retryAfterSeconds: windowSeconds };
    }
    return checkMemoryRateLimit(key, maxRequests, windowMs);
  }
}

export async function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): Promise<RateLimitResult> {
  if (process.env.NODE_ENV === "production" && getRedisClient()) {
    return checkRedisRateLimit(key, maxRequests, windowMs);
  }
  return checkMemoryRateLimit(key, maxRequests, windowMs);
}

export function createRateLimitKey(prefix: string, identifier: string): string {
  const normalized = identifier.trim().slice(0, 128).replace(/[^a-zA-Z0-9:._-]/g, "_");
  return `${prefix}:${normalized || "unknown"}`;
}