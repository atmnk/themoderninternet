"use client";

import { useState } from "react";
import { Button } from "@heroui/react";

import { subtitle, title } from "@/components/primitives";

type UploadResult = {
  configured: boolean;
  message?: string;
  file?: {
    url: string;
    downloadUrl: string;
    pathname: string;
    filename: string;
  };
};

export default function FileUploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<UploadResult["file"] | null>(null);

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Choose a file first.");
      setSuccess(null);

      return;
    }

    const formData = new FormData();

    formData.append("file", selectedFile);
    setIsUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/files/upload", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as UploadResult;

      if (!response.ok || !data.file) {
        throw new Error(data.message || `Upload failed with ${response.status}`);
      }

      setSuccess(data.file);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Unexpected upload error.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-separator bg-surface px-6 py-10 shadow-surface backdrop-blur md:px-10">
        <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-[var(--success-soft)] blur-3xl" />
        <div className="relative space-y-5">
          <span className="inline-flex rounded-full border border-separator bg-surface-secondary px-3 py-1 text-sm text-foreground">
            Storage Sample
          </span>

          <div className="max-w-3xl space-y-4">
            <h1 className={title({ size: "lg" })}>File Upload</h1>
            <p className={subtitle({ class: "max-w-3xl" })}>
              Upload any file into the shared Vercel Blob store. The download
              page uses the same backend data to list and retrieve these files.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
          <h2 className="text-2xl font-semibold text-foreground">
            Upload a file
          </h2>
          <p className="mt-2 text-sm text-muted">
            This page is intentionally simple so automation can focus on file
            chooser interactions and upload completion states.
          </p>

          <label
            className="mt-6 block rounded-[1.5rem] border border-dashed border-separator bg-background-secondary p-5"
            htmlFor="file-upload-input"
          >
            <span className="block text-sm font-medium text-foreground">
              Select a file
            </span>
            <span className="mt-1 block text-sm text-muted">
              Any file type is accepted and stored in the shared uploads bucket.
            </span>
            <input
              id="file-upload-input"
              className="mt-4 block w-full text-sm text-foreground file:mr-4 file:rounded-full file:border-0 file:bg-[var(--accent-soft)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-foreground"
              data-testid="file-upload-input"
              type="file"
              onChange={(event) => {
                setSelectedFile(event.target.files?.[0] ?? null);
                setError(null);
                setSuccess(null);
              }}
            />
          </label>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button
              className="rounded-full"
              data-testid="upload-button"
              isLoading={isUploading}
              variant="primary"
              onPress={handleUpload}
            >
              Upload file
            </Button>

            {selectedFile ? (
              <span className="text-sm text-muted" data-testid="selected-file-name">
                Selected: {selectedFile.name}
              </span>
            ) : (
              <span className="text-sm text-muted">No file selected yet.</span>
            )}
          </div>

          {error ? (
            <div className="mt-5 rounded-[1.5rem] border border-danger/20 bg-danger-soft p-4 text-danger-soft-foreground">
              {error}
            </div>
          ) : null}

          {success ? (
            <div
              className="mt-5 rounded-[1.5rem] border border-success/20 bg-success-soft p-4 text-success-soft-foreground"
              data-testid="upload-success"
            >
              Uploaded <span className="font-semibold">{success.filename}</span>.{" "}
              <a className="underline" href={success.downloadUrl} target="_blank" rel="noreferrer">
                Open download link
              </a>
            </div>
          ) : null}
        </div>

        <aside className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
          <h2 className="text-xl font-semibold text-foreground">
            Local setup
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>Create a Vercel Blob store for this project.</li>
            <li>Run `vercel link` in this repo.</li>
            <li>Run `vercel env pull .env.local` to fetch `BLOB_READ_WRITE_TOKEN`.</li>
            <li>Restart local dev after the env file is created or updated.</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
