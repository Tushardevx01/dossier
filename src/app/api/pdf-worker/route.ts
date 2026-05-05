import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export async function GET() {
  const workerPath = path.join(
    process.cwd(),
    "node_modules/pdfjs-dist/build/pdf.worker.min.mjs"
  );
  const workerSource = await readFile(workerPath, "utf8");

  return new Response(workerSource, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
