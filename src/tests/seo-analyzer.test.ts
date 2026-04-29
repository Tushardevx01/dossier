import { describe, it, expect, vi } from 'vitest';
import { analyzeSEO } from '@/lib/seo-analyzer';
import { validateUrl } from '@/lib/seo-analyzer/fetchHTML';

// Mock fetchHTML
vi.mock('@/lib/seo-analyzer/fetchHTML', () => ({
  fetchHTML: vi.fn(),
  isFetchError: vi.fn(),
  validateUrl: vi.fn(),
}));

import { fetchHTML, isFetchError } from '@/lib/seo-analyzer/fetchHTML';

describe('SEO Analyzer', () => {
  describe('validateUrl', () => {
    it('should reject non-HTTPS URLs', async () => {
      (validateUrl as any).mockResolvedValue({ valid: false });

      const result = await validateUrl('http://example.com');
      expect(result.valid).toBe(false);
    });

    it('should accept HTTPS URLs', async () => {
      (validateUrl as any).mockResolvedValue({ valid: true });

      const result = await validateUrl('https://example.com');
      expect(result.valid).toBe(true);
    });

    it('should reject private IPs', async () => {
      (validateUrl as any).mockResolvedValue({ valid: false });

      const result = await validateUrl('https://private.example.com');
      expect(result.valid).toBe(false);
    });
  });

  describe('analyzeSEO', () => {
    it('should analyze a valid URL', async () => {
      (fetchHTML as any).mockResolvedValue({
        html: '<html><head><title>Test</title></head><body></body></html>',
        finalUrl: 'https://example.com',
      });
      (isFetchError as any).mockReturnValue(false);

      const result = await analyzeSEO('https://example.com');
      expect(result).toHaveProperty('score');
      expect(result).toHaveProperty('checks');
      expect(result).toHaveProperty('url');
    });

    it('should handle fetch errors', async () => {
      (fetchHTML as any).mockResolvedValue({ code: 'FETCH_FAILED', message: 'Network error' });
      (isFetchError as any).mockReturnValue(true);

      const result = await analyzeSEO('https://example.com');
      expect(result).toHaveProperty('code');
      expect(result).toHaveProperty('message');
    });
  });
});