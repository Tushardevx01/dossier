import { beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from './route';

// Mock Next.js
vi.mock('next/server', () => ({
  NextRequest: class MockNextRequest {
    headers: Headers;

    url: string;

    method: string;

    body: RequestInit['body'];

    constructor(input: RequestInfo | URL, init?: RequestInit) {
      const request = new Request(input, init);
      this.headers = request.headers;
      this.url = request.url;
      this.method = request.method;
      this.body = init?.body;
    }

    text = vi.fn(async () => (typeof this.body === 'string' ? this.body : ''));

    json = vi.fn();
  },
  NextResponse: {
    json: vi.fn((data, options) => ({
      status: options?.status || 200,
      json: () => Promise.resolve(data),
      headers: options?.headers || {},
    })),
  },
}));

// Mock dependencies
vi.mock('@/lib/seo-analyzer', () => ({
  analyzeSEO: vi.fn(),
  isAnalysisError: vi.fn(),
  validateUrl: vi.fn(),
}));

vi.mock('@/lib/logger', () => ({
  logger: { error: vi.fn() },
}));

vi.mock('@/lib/security/rateLimit', () => ({
  checkRateLimit: vi.fn(),
  createRateLimitKey: vi.fn(),
}));

vi.mock('@/lib/security/auth', () => ({
  validateApiKey: vi.fn(),
  extractApiKey: vi.fn(),
}));

vi.mock('@/lib/security/request', () => ({
  extractClientIdentifier: vi.fn(),
}));

import { analyzeSEO, isAnalysisError, validateUrl } from '@/lib/seo-analyzer';
import { checkRateLimit, createRateLimitKey } from '@/lib/security/rateLimit';
import { extractClientIdentifier } from '@/lib/security/request';
import { validateApiKey, extractApiKey } from '@/lib/security/auth';

type AnalyzePostRequest = Parameters<typeof POST>[0];

const mockedExtractApiKey = vi.mocked(extractApiKey);
const mockedValidateApiKey = vi.mocked(validateApiKey);
const mockedExtractClientIdentifier = vi.mocked(extractClientIdentifier);
const mockedCreateRateLimitKey = vi.mocked(createRateLimitKey);
const mockedCheckRateLimit = vi.mocked(checkRateLimit);
const mockedValidateUrl = vi.mocked(validateUrl);
const mockedAnalyzeSEO = vi.mocked(analyzeSEO);
const mockedIsAnalysisError = vi.mocked(isAnalysisError);

function createRequest(body: string): AnalyzePostRequest {
  return {
    headers: new Headers({ 'content-type': 'application/json' }),
    text: () => Promise.resolve(body),
  } as AnalyzePostRequest;
}

describe('/api/analyze POST', () => {
  beforeEach(() => {
    mockedExtractApiKey.mockReturnValue('test-api-key');
    mockedValidateApiKey.mockResolvedValue({
      valid: true,
      keyId: 1,
      permissions: { analyze: true, rateLimit: 10 },
    });
    mockedExtractClientIdentifier.mockReturnValue('127.0.0.1');
    mockedCreateRateLimitKey.mockReturnValue('analyze:127.0.0.1');
    mockedCheckRateLimit.mockResolvedValue({ allowed: true, remaining: 9, retryAfterSeconds: 60 });
  });

  it('should return 401 for missing API key', async () => {
    mockedExtractApiKey.mockReturnValue(null);

    const response = await POST(createRequest(JSON.stringify({ url: 'https://example.com' })));
    expect(response.status).toBe(401);
  });

  it('should return 401 for invalid API key', async () => {
    mockedValidateApiKey.mockResolvedValue({ valid: false, error: 'Invalid key' });

    const response = await POST(createRequest(JSON.stringify({ url: 'https://example.com' })));
    expect(response.status).toBe(401);
  });

  it('should return 403 for insufficient permissions', async () => {
    mockedValidateApiKey.mockResolvedValue({
      valid: true,
      permissions: { analyze: false, rateLimit: 10 },
    });

    const response = await POST(createRequest(JSON.stringify({ url: 'https://example.com' })));
    expect(response.status).toBe(403);
  });

  it('should return 400 for invalid JSON', async () => {
    const response = await POST(createRequest('invalid json'));
    expect(response.status).toBe(400);
  });

  it('should return 400 for missing URL', async () => {
    const response = await POST(createRequest('{}'));
    expect(response.status).toBe(400);
  });

  it('should return 429 when rate limited', async () => {
    mockedExtractClientIdentifier.mockReturnValue('127.0.0.1');
    mockedCreateRateLimitKey.mockReturnValue('analyze:127.0.0.1');
    mockedCheckRateLimit.mockResolvedValue({ allowed: false, remaining: 0, retryAfterSeconds: 60 });

    const response = await POST(createRequest(JSON.stringify({ url: 'https://example.com' })));
    expect(response.status).toBe(429);
  });

  it('should return 200 for successful analysis', async () => {
    mockedExtractClientIdentifier.mockReturnValue('127.0.0.1');
    mockedCreateRateLimitKey.mockReturnValue('analyze:127.0.0.1');
    mockedCheckRateLimit.mockResolvedValue({ allowed: true, remaining: 9, retryAfterSeconds: 60 });
    mockedValidateUrl.mockResolvedValue({ valid: true, url: new URL('https://example.com') });
    mockedAnalyzeSEO.mockResolvedValue({
      score: 85,
      checks: [],
      metrics: {
        wordCount: 100,
        h1Count: 1,
        h2Count: 2,
        titleLength: 50,
        metaLength: 150,
        imageCount: 3,
        imagesMissingAlt: 0,
      },
      meta: {
        title: 'Test',
        description: 'Test description',
        ogTitle: 'Test OG title',
        ogDescription: 'Test OG description',
        ogImage: 'https://example.com/og.png',
        canonical: 'https://example.com',
        robots: 'index,follow',
      },
      url: 'https://example.com',
      analyzedAt: new Date().toISOString(),
      duration: 1000,
    });
    mockedIsAnalysisError.mockReturnValue(false);

    const response = await POST(createRequest(JSON.stringify({ url: 'https://example.com' })));
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.score).toBe(85);
  });
});
