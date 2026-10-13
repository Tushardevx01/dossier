// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { evalMock } = vi.hoisted(() => ({ evalMock: vi.fn() }));
vi.mock("@upstash/redis", () => ({
  Redis: class {
    eval = evalMock;
  },
}));

describe("rate limits", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });
  afterEach(() => vi.unstubAllEnvs());

  it("falls back to memory rate limiting in production when Redis is absent by default", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");
    const { checkRateLimit } = await import("./rateLimit");
    expect((await checkRateLimit("test", 5, 60000)).allowed).toBe(true);
  });

  it("fails closed in production when Redis is absent if RATE_LIMIT_FAIL_CLOSED is set", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");
    vi.stubEnv("RATE_LIMIT_FAIL_CLOSED", "true");
    const { checkRateLimit } = await import("./rateLimit");
    expect((await checkRateLimit("test", 5, 60000)).allowed).toBe(false);
  });

  it("falls back to memory rate limiting on a Redis outage by default", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.example.com");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "test");
    evalMock.mockRejectedValue(new Error("Unavailable"));
    const { checkRateLimit } = await import("./rateLimit");
    expect((await checkRateLimit("test", 5, 60000)).allowed).toBe(true);
  });

  it("fails closed on a Redis outage if RATE_LIMIT_FAIL_CLOSED is set", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.example.com");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "test");
    vi.stubEnv("RATE_LIMIT_FAIL_CLOSED", "true");
    evalMock.mockRejectedValue(new Error("Unavailable"));
    const { checkRateLimit } = await import("./rateLimit");
    expect((await checkRateLimit("test", 5, 60000)).allowed).toBe(false);
  });

  it("honors the shared counter and its remaining lifetime", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.example.com");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "test");
    evalMock.mockResolvedValue([6, 17]);
    const { checkRateLimit } = await import("./rateLimit");
    expect(await checkRateLimit("test", 5, 60000)).toEqual({
      allowed: false,
      remaining: 0,
      retryAfterSeconds: 17,
    });
  });

  it("enforces and expires the local development window", async () => {
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");
    vi.useFakeTimers();
    try {
      const { checkRateLimit } = await import("./rateLimit");
      expect((await checkRateLimit("test", 1, 1000)).allowed).toBe(true);
      expect((await checkRateLimit("test", 1, 1000)).allowed).toBe(false);
      vi.advanceTimersByTime(1001);
      expect((await checkRateLimit("test", 1, 1000)).allowed).toBe(true);
    } finally {
      vi.useRealTimers();
    }
  });
});
