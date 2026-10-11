import "server-only";

import { readBodyText, readFormData } from "@/server/http/body";
import { DEFAULT_MAX_CERT_SIZE } from "@/server/storage/validation";

export const MAX_CREDENTIAL_JSON_BYTES = 256 * 1024;
export const MAX_CREDENTIAL_FORM_BYTES = DEFAULT_MAX_CERT_SIZE + MAX_CREDENTIAL_JSON_BYTES;

export async function readCredentialJson(request: Request): Promise<unknown> {
  return JSON.parse(await readBodyText(request, MAX_CREDENTIAL_JSON_BYTES));
}

export async function readCredentialForm(request: Request): Promise<FormData> {
  return readFormData(request, MAX_CREDENTIAL_FORM_BYTES);
}

/** IDs must fit PostgreSQL serial and match the whole path segment. */
export function parseCredentialId(value: string): number | null {
  if (!/^[1-9]\d*$/.test(value)) return null;
  const id = Number(value);
  return Number.isSafeInteger(id) && id <= 2_147_483_647 ? id : null;
}
