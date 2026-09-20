import { describe, expect, it } from "vitest";
import { normalizeArray, normalizeObject, isArrayLike, isStringArray } from "@/lib/data-normalization";

describe("data-normalization", () => {
  describe("normalizeArray", () => {
    it("handles null and undefined", () => {
      expect(normalizeArray(null)).toEqual([]);
      expect(normalizeArray(undefined)).toEqual([]);
    });

    it("passes through standard string arrays", () => {
      expect(normalizeArray(["a", "b", "c"])).toEqual(["a", "b", "c"]);
      expect(normalizeArray(["a", 123, "b"])).toEqual(["a", "b"]);
    });

    it("parses single JSON-stringified arrays", () => {
      expect(normalizeArray('["item1", "item2"]')).toEqual(["item1", "item2"]);
      expect(normalizeArray('["a", 42, "b"]')).toEqual(["a", "b"]);
    });

    it("parses double JSON-stringified arrays", () => {
      expect(normalizeArray(JSON.stringify('["item1", "item2"]'))).toEqual(["item1", "item2"]);
      expect(normalizeArray(JSON.stringify(JSON.stringify(["alpha", "beta"])))).toEqual(["alpha", "beta"]);
      expect(normalizeArray('\'["item1", "item2"]\'')).toEqual(["item1", "item2"]);
    });

    it("safely handles invalid strings and non-arrays", () => {
      expect(normalizeArray("")).toEqual([]);
      expect(normalizeArray("not json")).toEqual([]);
      expect(normalizeArray('{"key": "value"}')).toEqual([]);
      expect(normalizeArray(123)).toEqual([]);
    });
  });

  describe("normalizeObject", () => {
    it("handles plain objects and JSON strings", () => {
      expect(normalizeObject({ a: 1 })).toEqual({ a: 1 });
      expect(normalizeObject('{"a": 1}')).toEqual({ a: 1 });
      expect(normalizeObject(null)).toEqual({});
      expect(normalizeObject("invalid")).toEqual({});
    });
  });

  describe("type guards", () => {
    it("identifies array-like and string arrays", () => {
      expect(isArrayLike(["a"])).toBe(true);
      expect(isArrayLike([])).toBe(false);
      expect(isStringArray(["a", "b"])).toBe(true);
      expect(isStringArray(["a", 1])).toBe(false);
    });
  });
});
