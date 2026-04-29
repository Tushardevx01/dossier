/**
 * HTML Fetcher Module
 * 
 * Production-safe HTML fetching with proper headers, timeout handling,
 * and security validations. Designed for modern SSR/streaming sites.
 */

import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import type { FetchResult, AnalyzerError } from "./types";

/** Fetch timeout in milliseconds */
const FETCH_TIMEOUT_MS = 10_000;

/** User agent for WebScope bot */
const USER_AGENT = "Mozilla/5.0 (compatible; WebScopeBot/1.0; +https://tushardevx01.tech)";
const MAX_REDIRECTS = 5;
const MAX_RESPONSE_BYTES = 2_000_000; // 2MB

/** Blocked hostnames to prevent internal network abuse */
const BLOCKED_HOSTS = new Set([
    "localhost",
    "127.0.0.1",
    "0.0.0.0",
    "::1",
    "[::1]",
    "internal",
    "local",
]);

/** Blocked IP ranges (private networks) */
const PRIVATE_IP_PATTERNS = [
    /^10\./,
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
    /^192\.168\./,
    /^169\.254\./,
    /^fc00:/i,
    /^fd00:/i,
    /^fe80:/i,
];

/**
 * Validates an IP address is not private
 */
function isPrivateIP(ip: string): boolean {
    return PRIVATE_IP_PATTERNS.some((pattern) => pattern.test(ip));
}

/**
 * Validates URL for safety and correctness
 */
export async function validateUrl(urlString: string): Promise<{ valid: boolean; error?: AnalyzerError; url?: URL }> {
    // Must be non-empty string
    if (!urlString || typeof urlString !== "string") {
        return {
            valid: false,
            error: {
                code: "INVALID_URL",
                message: "URL is required",
            },
        };
    }

    // Parse URL
    let url: URL;
    try {
        url = new URL(urlString);
    } catch {
        return {
            valid: false,
            error: {
                code: "INVALID_URL",
                message: "Invalid URL format",
                details: `Could not parse: ${urlString}`,
            },
        };
    }

    // Must be HTTPS only (security requirement)
    if (url.protocol !== "https:") {
        return {
            valid: false,
            error: {
                code: "INVALID_URL",
                message: "Only HTTPS URLs are supported",
                details: `Received protocol: ${url.protocol}`,
            },
        };
    }

    if (url.username || url.password) {
        return {
            valid: false,
            error: {
                code: "INVALID_URL",
                message: "URLs with credentials are not allowed",
                details: "Embedded username or password is blocked",
            },
        };
    }

    // Check for blocked hosts
    const hostname = url.hostname.toLowerCase();
    if (BLOCKED_HOSTS.has(hostname)) {
        return {
            valid: false,
            error: {
                code: "BLOCKED_URL",
                message: "This URL is not allowed for analysis",
                details: "Internal or localhost URLs are blocked",
            },
        };
    }

    // Reject explicit non-standard ports for HTTPS to reduce SSRF surface
    if (url.port && url.port !== "443") {
        return {
            valid: false,
            error: {
                code: "BLOCKED_URL",
                message: "Non-standard ports are not allowed",
                details: `Port ${url.port} is not permitted for analysis`,
            },
        };
    }

    // DNS Rebinding & IP literal protection: resolve all addresses and check each
    try {
        // If hostname is an IP literal (v4 or v6), validate it directly
        if (isIP(hostname)) {
            if (isPrivateIP(hostname)) {
                return {
                    valid: false,
                    error: {
                        code: "BLOCKED_URL",
                        message: "Private network URLs are not allowed",
                        details: "Cannot analyze internal network addresses",
                    },
                };
            }
        } else {
            // Resolve all A/AAAA records and ensure none are private
            const addresses = await lookup(hostname, { all: true });
            if (!addresses || addresses.length === 0) {
                return {
                    valid: false,
                    error: {
                        code: "INVALID_URL",
                        message: "Could not resolve hostname",
                        details: `No DNS records found for ${hostname}`,
                    },
                };
            }

            for (const addrObj of addresses) {
                const addr = addrObj.address;
                if (isPrivateIP(addr)) {
                    return {
                        valid: false,
                        error: {
                            code: "BLOCKED_URL",
                            message: "Private network URLs are not allowed",
                            details: `Resolved address ${addr} is in a private range`,
                        },
                    };
                }
            }
        }
    } catch (err) {
        // If DNS fails, we block it to be safe
        return {
            valid: false,
            error: {
                code: "INVALID_URL",
                message: "Could not resolve hostname",
                details: err instanceof Error ? err.message : String(err),
            },
        };
    }

    return { valid: true, url };
}

/**
 * Creates an AbortController with timeout
 */
function createTimeoutController(timeoutMs: number): { controller: AbortController; clear: () => void } {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    return {
        controller,
        clear: () => clearTimeout(timeoutId),
    };
}

/**
 * Fetches HTML from a URL with proper headers and timeout handling
 */
export async function fetchHTML(urlString: string): Promise<FetchResult | AnalyzerError> {
    // Validate URL first
    const validation = await validateUrl(urlString);
    if (!validation.valid) {
        return validation.error!;
    }

    let url = validation.url!;
    const { controller, clear } = createTimeoutController(FETCH_TIMEOUT_MS);

    try {
        for (let redirectCount = 0; redirectCount < MAX_REDIRECTS; redirectCount += 1) {
            const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
                "User-Agent": USER_AGENT,
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.9",
                "Accept-Encoding": "gzip, deflate, br",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            },
            signal: controller.signal,
            redirect: "manual",
        });

            if (response.status >= 300 && response.status < 400) {
                const location = response.headers.get("location");
                if (!location) {
                    clear();
                    return {
                        code: "FETCH_FAILED",
                        message: "Redirect response missing location header",
                        details: `Failed to fetch ${url.toString()}`,
                    };
                }

                const nextUrl = new URL(location, url.toString());
                const nextValidation = await validateUrl(nextUrl.toString());
                if (!nextValidation.valid || !nextValidation.url) {
                    clear();
                    return nextValidation.error ?? {
                        code: "BLOCKED_URL",
                        message: "Redirect target is not allowed",
                        details: `Failed to fetch ${url.toString()}`,
                    };
                }

                url = nextValidation.url;
                continue;
            }

            clear(); // Clear timeout on successful response path

        // Check for non-success status codes
            if (!response.ok) {
                return {
                    code: "FETCH_FAILED",
                    message: `Server returned ${response.status} ${response.statusText}`,
                    details: `Failed to fetch ${url.toString()}`,
                };
            }

            // Verify content type is HTML
            const contentType = response.headers.get("content-type") || "";
            if (!contentType.includes("text/html") && !contentType.includes("application/xhtml+xml")) {
                return {
                    code: "FETCH_FAILED",
                    message: "Response is not HTML",
                    details: `Content-Type: ${contentType}`,
                };
            }

            const contentLength = Number(response.headers.get("content-length") || "0");
            if (Number.isFinite(contentLength) && contentLength > MAX_RESPONSE_BYTES) {
                return {
                    code: "FETCH_FAILED",
                    message: "Response is too large",
                    details: `Content-Length exceeds ${MAX_RESPONSE_BYTES} bytes`,
                };
            }

            // Read HTML content
            const html = await response.text();
            if (Buffer.byteLength(html, "utf8") > MAX_RESPONSE_BYTES) {
                return {
                    code: "FETCH_FAILED",
                    message: "Response is too large",
                    details: `Response exceeds ${MAX_RESPONSE_BYTES} bytes`,
                };
            }

            // Extract headers we care about
            const headers: Record<string, string> = {};
            response.headers.forEach((value, key) => {
                headers[key.toLowerCase()] = value;
            });

            return {
                html,
                finalUrl: response.url, // May differ after redirects
                statusCode: response.status,
                headers,
            };
        }

        clear();
        return {
            code: "FETCH_FAILED",
            message: "Too many redirects",
            details: `Failed to fetch ${url.toString()}`,
        };
    } catch (error) {
        clear();

        // Handle specific error types
        if (error instanceof Error) {
            if (error.name === "AbortError") {
                return {
                    code: "TIMEOUT",
                    message: `Request timed out after ${FETCH_TIMEOUT_MS / 1000} seconds`,
                    details: `URL: ${url.toString()}`,
                };
            }

            return {
                code: "FETCH_FAILED",
                message: error.message,
                details: `Failed to fetch ${url.toString()}`,
            };
        }

        return {
            code: "FETCH_FAILED",
            message: "Unknown error occurred while fetching",
            details: String(error),
        };
    }
}

/**
 * Type guard to check if result is an error
 */
export function isFetchError(result: FetchResult | AnalyzerError): result is AnalyzerError {
    return "code" in result && "message" in result && !("html" in result);
}
