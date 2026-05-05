/**
 * Data Normalization Utilities
 * 
 * Provides safe parsing for data that may have been double-serialized.
 * 
 * Problem: Database returns proper types, but serialization layers sometimes
 * double-encode data (JSON.stringify a stringified value), causing:
 * - improvements: "[\"item1\",\"item2\"]" instead of ["item1", "item2"]
 * - ThisType of thing causes .map() failures at runtime
 * 
 * Solution: Normalize at DATA LAYER (not components) for single source of truth.
 */

/**
 * Safely parse and normalize string arrays
 * 
 * Handles:
 * - Proper arrays: ['item1', 'item2'] ✓
 * - JSON stringified: '["item1", "item2"]' ✓
 * - Double-stringified: '"[\\"item1\\", \\"item2\\"]"' ✓
 * - Null/undefined: returns []
 * - Invalid JSON: returns []
 * 
 * @param value - Raw value from database or API
 * @returns Normalized string array (never null/undefined)
 * @example
 * normalizeArray(['a', 'b']) → ['a', 'b']
 * normalizeArray('["a", "b"]') → ['a', 'b']
 * normalizeArray(null) → []
 */
export function normalizeArray(value: unknown): string[] {
  // Handle null/undefined
  if (value === null || value === undefined) {
    return [];
  }

  // Already an array - filter and return
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string');
  }

  // String - attempt JSON parse
  if (typeof value === 'string') {
    // Empty string or doesn't look like JSON array
    if (!value.trim() || !value.trim().startsWith('[')) {
      return [];
    }

    try {
      const parsed = JSON.parse(value);
      
      // Check if parse result is an array
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is string => typeof item === 'string');
      }
    } catch {
      // Silent fail - return empty array
    }
  }

  // Everything else returns empty array
  return [];
}

/**
 * Safely parse and normalize objects/records
 * 
 * @param value - Raw value that should be an object
 * @returns Parsed object or empty object
 * @example
 * normalizeObject('{"key":"value"}') → { key: 'value' }
 * normalizeObject({key: 'value'}) → { key: 'value' }
 */
export function normalizeObject<T extends Record<string, unknown>>(
  value: unknown
): T {
  if (!value) return {} as T;

  if (typeof value === 'object' && value !== null) {
    return value as T;
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (typeof parsed === 'object' && parsed !== null) {
        return parsed as T;
      }
    } catch {
      // Silent fail
    }
  }

  return {} as T;
}

/**
 * Type guard: Check if value is a non-empty array
 * 
 * @example
 * if (isArrayLike(data)) { data.map(...) }
 */
export function isArrayLike(value: unknown): value is string[] {
  return Array.isArray(value) && value.length > 0;
}

/**
 * Type guard: Check if array contains only strings
 */
export function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every((item) => typeof item === 'string')
  );
}
