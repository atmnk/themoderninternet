import { get } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

import { hasBlobStoreConfigured } from "@/lib/blob-storage";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (!hasBlobStoreConfigured()) {
    return NextResponse.json(
      {
        configured: false,
        message:
          "Vercel Blob is not configured yet. Add BLOB_READ_WRITE_TOKEN to enable downloads.",
      },
      { status: 503 },
    );
  }

  const pathname = request.nextUrl.searchParams.get("pathname");

  if (!pathname) {
    return NextResponse.json(
      {
        configured: true,
        message: "Missing pathname.",
      },
      { status: 400 },
    );
  }

  try {
    const result = await get(pathname, {
      access: "private",
    });

    if (result === null || result.statusCode !== 200) {
      return new NextResponse("Not found", { status: 404 });
    }

    return new NextResponse(result.stream, {
      headers: {
        "Cache-Control": "private, no-cache",
        "Content-Disposition": result.blob.contentDisposition,
        "Content-Type": result.blob.contentType,
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        configured: true,
        message:
          error instanceof Error ? error.message : "Failed to download file.",
      },
      { status: 500 },
    );
  }
}
