import { SITE_URL } from "@/lib/site";

const TRUSTED_ORIGIN = new URL(SITE_URL).origin;

type RequestLike = {
  headers: Headers;
  ip?: string | null;
};

export function isTrustedOrigin(headers: Headers): boolean {
  const originHeader = headers.get("origin") ?? headers.get("referer");
  if (!originHeader) {
    return false;
  }

  try {
    return new URL(originHeader).origin === TRUSTED_ORIGIN;
  } catch {
    return false;
  }
}

export function extractClientIdentifier(request: RequestLike): string {
  const directIp = request.ip?.trim();
  if (directIp) {
    return directIp;
  }

  const forwardedFor = request.headers.get("x-vercel-forwarded-for");
  if (forwardedFor) {
    const firstHop = forwardedFor.split(",")[0]?.trim();
    if (firstHop) {
      return firstHop;
    }
  }

  return "unknown";
}