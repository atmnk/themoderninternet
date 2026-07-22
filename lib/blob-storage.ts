const FILES_PREFIX = "uploads/";

export function hasBlobStoreConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export function buildBlobPathname(filename: string) {
  const trimmed = filename.trim();
  const fallbackName = trimmed.length > 0 ? trimmed : "upload.bin";
  const sanitized = fallbackName.replace(/[^a-zA-Z0-9._-]/g, "-");

  return `${FILES_PREFIX}${Date.now()}-${sanitized}`;
}

export function formatBlobName(pathname: string) {
  return pathname.replace(FILES_PREFIX, "").replace(/^\d+-/, "");
}

export { FILES_PREFIX };
