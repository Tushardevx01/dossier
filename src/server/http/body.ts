import "server-only";

export class PayloadTooLargeError extends Error {
  constructor() {
    super("Request body is too large");
    this.name = "PayloadTooLargeError";
  }
}

/** Enforce a byte limit while streaming, including requests without Content-Length. */
export async function readBodyBytes(request: Request, maxBytes: number): Promise<Uint8Array> {
  const length = Number(request.headers.get("content-length"));
  if (Number.isFinite(length) && length > maxBytes) throw new PayloadTooLargeError();
  if (!request.body) return new Uint8Array();
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        void reader.cancel().catch(() => {});
        throw new PayloadTooLargeError();
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return Buffer.concat(chunks, size);
}

export async function readBodyText(request: Request, maxBytes: number): Promise<string> {
  return new TextDecoder().decode(await readBodyBytes(request, maxBytes));
}

export async function readFormData(request: Request, maxBytes: number): Promise<FormData> {
  const bytes = await readBodyBytes(request, maxBytes);
  return new Response(bytes as BodyInit, {
    headers: { "content-type": request.headers.get("content-type") ?? "" },
  }).formData();
}
