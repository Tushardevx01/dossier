/**
 * HTML Fetcher Module
 * 
 * Production-safe HTML fetching with proper headers, timeout handling,
 * and security validations. Designed for modern SSR/streaming sites.
 */

import type { FetchResult, AnalyzerError } from "./types";

/** Fetch timeout in milliseconds */
const FETCH_TIMEOUT_MS = 10_000;

/** User agent for WebScope bot */
const USER_AGENT = "Mozilla/5.0 (compatible; WebScopeBot/1.0; +https://tushardevx01.tech)";

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
 * Validates URL for safety and correctness
 */
export function validateUrl(urlString: string): { valid: boolean; error?: AnalyzerError; url?: URL } {
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

    // Check for private IP ranges
    for (const pattern of PRIVATE_IP_PATTERNS) {
        if (pattern.test(hostname)) {
            return {
                valid: false,
                error: {
                    code: "BLOCKED_URL",
                    message: "Private network URLs are not allowed",
                    details: "Cannot analyze internal network addresses",
                },
            };
        }
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
    const validation = validateUrl(urlString);
    if (!validation.valid) {
        return validation.error!;
    }

    const url = validation.url!;
    const { controller, clear } = createTimeoutController(FETCH_TIMEOUT_MS);

    try {
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
            redirect: "follow", // Handle redirects automatically
        });

        clear(); // Clear timeout on successful response

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

        // Read HTML content
        const html = await response.text();

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
