import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export async function GET() {
  try {
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
  } catch {
    // In Vercel serverless, node_modules paths may not exist on the filesystem.
    // Return 404 gracefully instead of crashing with an unhandled ENOENT.
    return new Response("// pdf.worker not available", {
      status: 404,
      headers: {
        "Content-Type": "application/javascript; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }
}
