"use client";

import { useEffect, useEffectEvent, useState } from "react";
import { Button } from "@heroui/react";

import { subtitle, title } from "@/components/primitives";

type StoredFile = {
  url: string;
  downloadUrl: string;
  appDownloadUrl: string;
  pathname: string;
  filename: string;
  size: number;
  uploadedAt: string;
};

type FilesResponse = {
  configured: boolean;
  files: StoredFile[];
  message?: string;
};

function formatBytes(size: number) {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileDownloadPage() {
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFiles = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/files/list", {
        cache: "no-store",
      });
      const data = (await response.json()) as FilesResponse;

      if (!response.ok) {
        throw new Error(data.message || `Request failed with ${response.status}`);
      }

      setFiles(data.files);
    } catch (loadError) {
      setError(
        loadError instanceof Error ? loadError.message : "Failed to load files.",
      );
      setFiles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadFilesFromEffect = useEffectEvent(() => {
    void loadFiles();
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadFilesFromEffect();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-separator bg-surface px-6 py-10 shadow-surface backdrop-blur md:px-10">
        <div className="pointer-events-none absolute left-0 top-0 h-40 w-40 rounded-full bg-[var(--warning-soft)] blur-3xl" />
        <div className="relative space-y-5">
          <span className="inline-flex rounded-full border border-separator bg-surface-secondary px-3 py-1 text-sm text-foreground">
            Storage Sample
          </span>

          <div className="max-w-3xl space-y-4">
            <h1 className={title({ size: "lg" })}>File Download</h1>
            <p className={subtitle({ class: "max-w-3xl" })}>
              This page lists files stored through the upload example and gives
              each one a download link served through the app, which works with
              a private Vercel Blob store.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-separator bg-surface p-4 shadow-surface">
            <p className="text-sm text-muted">
              Stored files:{" "}
              <span className="font-semibold text-foreground">{files.length}</span>
            </p>
            <Button className="rounded-full" variant="secondary" onPress={loadFiles}>
              Refresh list
            </Button>
          </div>

          {isLoading ? (
            <div className="rounded-[1.5rem] border border-separator bg-surface p-5 text-center text-muted">
              Loading uploaded files...
            </div>
          ) : null}

          {error ? (
            <div className="rounded-[1.5rem] border border-danger/20 bg-danger-soft p-5 text-danger-soft-foreground">
              {error}
            </div>
          ) : null}

          {!isLoading && !error && files.length === 0 ? (
            <div className="rounded-[1.5rem] border border-dashed border-separator bg-surface p-5 text-muted">
              No uploaded files yet. Use the File Upload page to add one.
            </div>
          ) : null}

          {!isLoading && !error
            ? files.map((file) => (
                <article
                  key={file.pathname}
                  className="rounded-[1.5rem] border border-separator bg-surface p-5 shadow-surface"
                  data-testid={file.pathname}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-2">
                      <p className="text-lg font-semibold text-foreground">
                        {file.filename}
                      </p>
                      <p className="text-sm text-muted">{file.pathname}</p>
                      <div className="flex flex-wrap gap-3 text-sm text-muted">
                        <span>{formatBytes(file.size)}</span>
                        <span>
                          {new Date(file.uploadedAt).toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </span>
                      </div>
                    </div>

                    <a
                      className="inline-flex rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-foreground"
                      href={file.appDownloadUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Download
                    </a>
                  </div>
                </article>
              ))
            : null}
        </div>

        <aside className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
          <h2 className="text-xl font-semibold text-foreground">
            Automation notes
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>This page uses the same Blob store as the upload example.</li>
            <li>Downloads are proxied through `/api/files/download` for private storage.</li>
            <li>Refreshing should re-query the backend and show newly uploaded files.</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
