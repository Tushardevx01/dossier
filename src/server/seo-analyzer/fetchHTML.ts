import "server-only";

import { lookup } from "node:dns/promises";
import { BlockList, isIP } from "node:net";
import { Agent, fetch } from "undici";
import type { FetchResult, AnalyzerError } from "./types";

const FETCH_TIMEOUT_MS = 10_000;
const MAX_REDIRECTS = 5;
const MAX_RESPONSE_BYTES = 2_000_000;

const blockedV4 = new BlockList();
for (const [address, prefix] of [
  ["0.0.0.0", 8],
  ["10.0.0.0", 8],
  ["100.64.0.0", 10],
  ["127.0.0.0", 8],
  ["169.254.0.0", 16],
  ["172.16.0.0", 12],
  ["192.0.0.0", 24],
  ["192.0.2.0", 24],
  ["192.88.99.0", 24],
  ["192.168.0.0", 16],
  ["198.18.0.0", 15],
  ["198.51.100.0", 24],
  ["203.0.113.0", 24],
  ["224.0.0.0", 3],
] as const)
  blockedV4.addSubnet(address, prefix, "ipv4");

const globalV6 = new BlockList();
globalV6.addSubnet("2000::", 3, "ipv6");
const blockedV6 = new BlockList();
blockedV6.addSubnet("2001::", 23, "ipv6");
blockedV6.addSubnet("2001:db8::", 32, "ipv6");
blockedV6.addSubnet("2002::", 16, "ipv6"); // 6to4 can tunnel to private IPv4
blockedV6.addSubnet("3fff::", 20, "ipv6");

export function isPublicAddress(address: string): boolean {
  if (isIP(address) === 4) return !blockedV4.check(address, "ipv4");
  if (isIP(address) === 6) {
    return globalV6.check(address, "ipv6") && !blockedV6.check(address, "ipv6");
  }
  return false;
}

type ValidatedUrl = {
  valid: boolean;
  error?: AnalyzerError;
  url?: URL;
  address?: { address: string; family: number };
};

async function withAbort<T>(
  operation: Promise<T>,
  signal: AbortSignal,
): Promise<T> {
  signal.throwIfAborted();
  return new Promise((resolve, reject) => {
    const abort = () => reject(signal.reason);
    signal.addEventListener("abort", abort, { once: true });
    operation
      .then(resolve, reject)
      .finally(() => signal.removeEventListener("abort", abort));
  });
}

export async function validateUrl(
  urlString: string,
  signal?: AbortSignal,
): Promise<ValidatedUrl> {
  let url: URL;
  try {
    url = new URL(urlString);
  } catch {
    return {
      valid: false,
      error: { code: "INVALID_URL", message: "Invalid URL format" },
    };
  }
  if (url.protocol !== "https:" || url.username || url.password) {
    return {
      valid: false,
      error: {
        code: "INVALID_URL",
        message: "Only HTTPS URLs without credentials are supported",
      },
    };
  }
  const hostname = url.hostname.replace(/^\[|\]$/g, "").toLowerCase();
  if (url.port || /(^|\.)(localhost|local|internal)\.?$/.test(hostname)) {
    return {
      valid: false,
      error: {
        code: "BLOCKED_URL",
        message: "This URL is not allowed for analysis",
      },
    };
  }
  try {
    const resolution = isIP(hostname)
      ? Promise.resolve([{ address: hostname, family: isIP(hostname) }])
      : lookup(hostname, { all: true });
    const addresses = await withAbort(
      resolution,
      signal ?? AbortSignal.timeout(FETCH_TIMEOUT_MS),
    );
    if (
      !addresses.length ||
      addresses.some(({ address }) => !isPublicAddress(address))
    ) {
      return {
        valid: false,
        error: {
          code: "BLOCKED_URL",
          message: "Private or reserved network addresses are not allowed",
        },
      };
    }
    return { valid: true, url, address: addresses[0] };
  } catch {
    if (signal?.aborted) throw signal.reason;
    return {
      valid: false,
      error: { code: "INVALID_URL", message: "Could not resolve hostname" },
    };
  }
}

/** Resolve once per hop and pin the socket lookup to the checked address. */
export async function fetchHTML(
  urlString: string,
): Promise<FetchResult | AnalyzerError> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  const visited = new Set<string>();
  let target = urlString;
  try {
    for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
      const checked = await validateUrl(target, controller.signal);
      if (!checked.valid || !checked.url || !checked.address)
        return checked.error!;
      const { url, address } = checked;
      url.hash = "";
      if (visited.has(url.href))
        return { code: "FETCH_FAILED", message: "Redirect loop detected" };
      visited.add(url.href);
      const dispatcher = new Agent({
        connect: {
          // Keep the original URL for Host, SNI and certificate verification.
          lookup: (_hostname, options, callback) => {
            if (options.all) callback(null, [address]);
            else callback(null, address.address, address.family);
          },
        },
      });
      try {
        const response = await fetch(url, {
          dispatcher,
          signal: controller.signal,
          redirect: "manual",
          headers: {
            "User-Agent": "WebScopeBot/1.0 (+https://tushardevx01.tech)",
            Accept: "text/html,application/xhtml+xml",
          },
        });
        if ([301, 302, 303, 307, 308].includes(response.status)) {
          await response.body?.cancel();
          const location = response.headers.get("location");
          if (!location)
            return {
              code: "FETCH_FAILED",
              message: "Redirect response missing location header",
            };
          target = new URL(location, url).href;
          continue;
        }
        const contentType = (
          response.headers.get("content-type") ?? ""
        ).toLowerCase();
        if (
          !response.ok ||
          !/^(text\/html|application\/xhtml\+xml)(;|$)/.test(contentType)
        ) {
          await response.body?.cancel();
          return {
            code: "FETCH_FAILED",
            message: response.ok
              ? "Response is not HTML"
              : `Server returned ${response.status}`,
          };
        }
        if (
          Number(response.headers.get("content-length")) > MAX_RESPONSE_BYTES
        ) {
          await response.body?.cancel();
          return { code: "FETCH_FAILED", message: "Response is too large" };
        }
        const chunks: Uint8Array[] = [];
        let bytes = 0;
        // Count decompressed bytes as they arrive; keep the timeout active through EOF.
        if (response.body) {
          for await (const chunk of response.body) {
            bytes += chunk.byteLength;
            if (bytes > MAX_RESPONSE_BYTES)
              return { code: "FETCH_FAILED", message: "Response is too large" };
            chunks.push(chunk);
          }
        }
        return {
          html: Buffer.concat(chunks, bytes).toString("utf8"),
          finalUrl: url.href,
          statusCode: response.status,
          headers: Object.fromEntries(response.headers),
        };
      } finally {
        await dispatcher.destroy();
      }
    }
    return { code: "FETCH_FAILED", message: "Too many redirects" };
  } catch {
    return controller.signal.aborted
      ? { code: "TIMEOUT", message: "Request timed out after 10 seconds" }
      : { code: "FETCH_FAILED", message: "Unable to fetch the requested page" };
  } finally {
    clearTimeout(timer);
  }
}

export function isFetchError(
  result: FetchResult | AnalyzerError,
): result is AnalyzerError {
  return "code" in result && "message" in result && !("html" in result);
}
