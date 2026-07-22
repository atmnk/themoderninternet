import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

import {
  FILES_PREFIX,
  formatBlobName,
  hasBlobStoreConfigured,
} from "@/lib/blob-storage";

export const runtime = "nodejs";

export async function GET() {
  if (!hasBlobStoreConfigured()) {
    return NextResponse.json(
      {
        configured: false,
        files: [],
        message:
          "Vercel Blob is not configured yet. Add BLOB_READ_WRITE_TOKEN to enable uploads and downloads.",
      },
      { status: 503 },
    );
  }

  try {
    const { blobs } = await list({ prefix: FILES_PREFIX });
    const files = blobs
      .sort((left, right) => right.uploadedAt.getTime() - left.uploadedAt.getTime())
      .map((blob) => ({
        url: blob.url,
        downloadUrl: blob.downloadUrl,
        pathname: blob.pathname,
        filename: formatBlobName(blob.pathname),
        size: blob.size,
        uploadedAt: blob.uploadedAt.toISOString(),
      }));

    return NextResponse.json({
      configured: true,
      files,
    });
  } catch (error) {
    return NextResponse.json(
      {
        configured: true,
        files: [],
        message:
          error instanceof Error ? error.message : "Failed to list uploaded files.",
      },
      { status: 500 },
    );
  }
}
