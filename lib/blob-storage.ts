const FILES_PREFIX = "uploads/";
const MAX_UPLOAD_SIZE_BYTES = 5 * 1024 * 1024;
const BLOCKED_FILE_EXTENSIONS = new Set([
  "ade",
  "adp",
  "app",
  "apk",
  "bat",
  "bin",
  "cmd",
  "com",
  "cpl",
  "dll",
  "dmg",
  "exe",
  "gadget",
  "hta",
  "inf1",
  "ins",
  "inx",
  "iso",
  "jar",
  "job",
  "js",
  "jse",
  "ksh",
  "lnk",
  "msc",
  "msi",
  "msp",
  "mst",
  "pif",
  "ps1",
  "reg",
  "scr",
  "sh",
  "sys",
  "vb",
  "vbe",
  "vbs",
  "vxd",
  "ws",
  "wsc",
  "wsf",
  "wsh",
]);
const BLOCKED_MIME_TYPES = new Set([
  "application/java-archive",
  "application/javascript",
  "application/x-bat",
  "application/x-dosexec",
  "application/x-msdos-program",
  "application/x-msdownload",
  "application/x-sh",
  "application/x-shellscript",
  "text/javascript",
  "text/x-shellscript",
]);

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

export function validateUploadFile(file: File) {
  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    return {
      isValid: false,
      message: "Files larger than 5 MB are not allowed.",
    };
  }

  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";

  if (BLOCKED_FILE_EXTENSIONS.has(extension)) {
    return {
      isValid: false,
      message: "Executable or script-like file types are not allowed.",
    };
  }

  if (file.type && BLOCKED_MIME_TYPES.has(file.type.toLowerCase())) {
    return {
      isValid: false,
      message: "This file type is blocked for security reasons.",
    };
  }

  return {
    isValid: true,
    message: null,
  };
}

export { FILES_PREFIX, MAX_UPLOAD_SIZE_BYTES };
