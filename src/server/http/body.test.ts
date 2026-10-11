// @vitest-environment node
import { describe, expect, it, vi } from "vitest";
import { readBodyText, PayloadTooLargeError } from "./body";

describe("bounded request bodies", () => {
  it("counts UTF-8 bytes rather than JavaScript characters", async () => {
    const request = new Request("https://example.com", { method: "POST", body: "ééé" });
    await expect(readBodyText(request, 5)).rejects.toBeInstanceOf(PayloadTooLargeError);
  });

  it("cancels an oversized stream without trusting Content-Length", async () => {
    const cancel = vi.fn();
    const request = {
      headers: new Headers(),
      body: new ReadableStream({
        start(controller) {
          controller.enqueue(new Uint8Array(11));
        },
        cancel,
      }),
    } as Request;
    await expect(readBodyText(request, 10)).rejects.toBeInstanceOf(PayloadTooLargeError);
    expect(cancel).toHaveBeenCalledOnce();
  });

  it("reads a valid body intact", async () => {
    const request = new Request("https://example.com", { method: "POST", body: "hello" });
    await expect(readBodyText(request, 5)).resolves.toBe("hello");
  });
});
