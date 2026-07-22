import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

import {
  buildBlobPathname,
  formatBlobName,
  hasBlobStoreConfigured,
} from "@/lib/blob-storage";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!hasBlobStoreConfigured()) {
    return NextResponse.json(
      {
        configured: false,
        message:
          "Vercel Blob is not configured yet. Add BLOB_READ_WRITE_TOKEN to enable uploads.",
      },
      { status: 503 },
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          configured: true,
          message: "Please choose a file before uploading.",
        },
        { status: 400 },
      );
    }

    const blob = await put(buildBlobPathname(file.name), file, {
      access: "public",
      addRandomSuffix: false,
      contentType: file.type || undefined,
    });

    return NextResponse.json({
      configured: true,
      file: {
        url: blob.url,
        downloadUrl: blob.downloadUrl,
        pathname: blob.pathname,
        filename: formatBlobName(blob.pathname),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        configured: true,
        message:
          error instanceof Error ? error.message : "File upload failed.",
      },
      { status: 500 },
    );
  }
}
