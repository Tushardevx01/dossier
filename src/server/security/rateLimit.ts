import "server-only";

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
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    redisClient = null;
    return null;
  }

  if (redisClient) return redisClient;

  redisClient = new Redis({ url, token });
  return redisClient;
}

async function checkMemoryRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number,
): Promise<RateLimitResult> {
  const now = Date.now();
  cleanupMemoryStore(now);

  const current = memoryStore.get(key);
  const windowSeconds = Math.ceil(windowMs / 1000);

  if (!current || current.resetAt <= now) {
    memoryStore.set(key, { count: 1, resetAt: now + windowMs });
    return {
      allowed: true,
      remaining: Math.max(maxRequests - 1, 0),
      retryAfterSeconds: windowSeconds,
    };
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
  windowMs: number,
): Promise<RateLimitResult> {
  const redis = getRedisClient();
  const failClosed = process.env.RATE_LIMIT_FAIL_CLOSED === "true";

  if (!redis) {
    if (failClosed) {
      logger.error(
        "Redis rate limiting unavailable and RATE_LIMIT_FAIL_CLOSED is enabled. Failing closed.",
        { key },
      );
      return {
        allowed: false,
        remaining: 0,
        retryAfterSeconds: windowMs / 1000,
      };
    }
    logger.warn(
      "Redis rate limiting unavailable; falling back to in-memory rate limiting.",
      { key },
    );
    return checkMemoryRateLimit(key, maxRequests, windowMs);
  }

  const windowSeconds = Math.ceil(windowMs / 1000);
  const redisKey = `ratelimit:${key}`;

  try {
    // Increment and establish expiry atomically; concurrent requests cannot
    // extend the window or leave an immortal counter after an interrupted call.
    const result = (await redis.eval(
      `local count = redis.call('INCR', KEYS[1])
       local ttl = redis.call('TTL', KEYS[1])
       if ttl < 0 then
         redis.call('EXPIRE', KEYS[1], ARGV[1])
         ttl = tonumber(ARGV[1])
       end
       return {count, ttl}`,
      [redisKey],
      [windowSeconds],
    )) as [number, number];

    const [count, ttl] = result;
    const effectiveTtl = ttl > 0 ? ttl : windowSeconds;
    const remaining = Math.max(maxRequests - count, 0);

    return {
      allowed: count <= maxRequests,
      remaining,
      retryAfterSeconds: effectiveTtl,
    };
  } catch (error) {
    logger.error("Redis rate limit check failed", {
      key,
      error: error instanceof Error ? error.message : String(error),
    });

    if (failClosed) {
      logger.error("Failing closed on Redis error as configured");
      return { allowed: false, remaining: 0, retryAfterSeconds: windowSeconds };
    }
    return checkMemoryRateLimit(key, maxRequests, windowMs);
  }
}

export async function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number,
): Promise<RateLimitResult> {
  const redis = getRedisClient();
  if (redis || process.env.RATE_LIMIT_FAIL_CLOSED === "true") {
    return checkRedisRateLimit(key, maxRequests, windowMs);
  }
  return checkMemoryRateLimit(key, maxRequests, windowMs);
}

export function createRateLimitKey(prefix: string, identifier: string): string {
  const normalized = identifier
    .trim()
    .slice(0, 128)
    .replace(/[^a-zA-Z0-9:._-]/g, "_");
  return `${prefix}:${normalized || "unknown"}`;
}
