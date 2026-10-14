// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { lookup } from "node:dns/promises";
import { fetch } from "undici";
import { fetchHTML, isPublicAddress, validateUrl } from "./fetchHTML";

const { agents } = vi.hoisted(() => ({
  agents: [] as Array<{ connect: { lookup: (...args: unknown[]) => void } }>,
}));
vi.mock("node:dns/promises", () => ({ lookup: vi.fn() }));
vi.mock("undici", () => ({
  fetch: vi.fn(),
  Agent: class {
    constructor(options: (typeof agents)[number]) {
      agents.push(options);
    }
    destroy = vi.fn(async () => {});
  },
}));

describe("analyzer network boundary", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    agents.length = 0;
    vi.mocked(lookup).mockResolvedValue([
      { address: "93.184.216.34", family: 4 },
    ] as never);
  });
  afterEach(() => vi.useRealTimers());

  it.each([
    "127.0.0.2",
    "0.0.0.0",
    "10.0.0.1",
    "100.64.0.1",
    "169.254.169.254",
    "192.168.1.1",
    "224.0.0.1",
    "::1",
    "::ffff:127.0.0.1",
    "fd12::1",
    "fe90::1",
    "2002:7f00:1::",
    "2001:db8::1",
  ])("blocks reserved address %s", (address) => {
    expect(isPublicAddress(address)).toBe(false);
  });

  it.each(["93.184.216.34", "2606:4700:4700::1111"])(
    "accepts global address %s",
    (address) => {
      expect(isPublicAddress(address)).toBe(true);
    },
  );

  it.each([
    "https://127.1",
    "https://[::ffff:127.0.0.1]",
    "https://2130706433",
    "http://example.com",
    "https://user:password@example.com",
    "https://example.com:8443",
  ])("rejects unsafe URL %s", async (url) => {
    expect((await validateUrl(url)).valid).toBe(false);
  });

  it("rejects a hostname with any private DNS answer", async () => {
    vi.mocked(lookup).mockResolvedValue([
      { address: "93.184.216.34", family: 4 },
      { address: "127.0.0.2", family: 4 },
    ] as never);
    expect((await validateUrl("https://example.com")).valid).toBe(false);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("pins the connection lookup to the validated address", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response("<html>ok</html>", {
        headers: { "content-type": "text/html" },
      }) as never,
    );
    const result = await fetchHTML("https://example.com");
    expect(result).toMatchObject({ html: "<html>ok</html>" });
    const callback = vi.fn();
    agents[0].connect.lookup("example.com", { all: false }, callback);
    expect(callback).toHaveBeenCalledWith(null, "93.184.216.34", 4);
    expect(lookup).toHaveBeenCalledTimes(1);
  });

  it("blocks redirects into the internal network", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(null, {
        status: 302,
        headers: { location: "https://127.0.0.2" },
      }) as never,
    );
    expect(await fetchHTML("https://example.com")).toMatchObject({
      code: "BLOCKED_URL",
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("limits streamed bytes when Content-Length is missing", async () => {
    const cancel = vi.fn();
    const body = new ReadableStream({
      start(c) {
        c.enqueue(new Uint8Array(2_000_001));
      },
      cancel,
    });
    vi.mocked(fetch).mockResolvedValue(
      new Response(body, { headers: { "content-type": "text/html" } }) as never,
    );
    expect(await fetchHTML("https://example.com")).toMatchObject({
      message: "Response is too large",
    });
    expect(cancel).toHaveBeenCalledOnce();
  });

  it("keeps the timeout active after response headers arrive", async () => {
    vi.useFakeTimers();
    vi.mocked(fetch).mockImplementation(async (_url, options) => {
      const body = new ReadableStream({
        start(c) {
          options!.signal!.addEventListener("abort", () =>
            c.error(new Error("aborted")),
          );
        },
      });
      return new Response(body, {
        headers: { "content-type": "text/html" },
      }) as never;
    });
    const result = fetchHTML("https://example.com");
    await vi.advanceTimersByTimeAsync(10_001);
    expect(await result).toMatchObject({ code: "TIMEOUT" });
  });
});
