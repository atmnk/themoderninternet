"use client";

import { useEffect, useEffectEvent, useState } from "react";
import { Button } from "@heroui/react";

import { subtitle, title } from "@/components/primitives";

type FeedPost = {
  id: string;
  author: string;
  handle: string;
  body: string;
  topic: string;
  category: string;
  minutesAgo: number;
  likes: number;
  comments: number;
  shares: number;
  accent: string;
};

type FeedResponse = {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  hasMore: boolean;
  nextPage: number | null;
  posts: FeedPost[];
};

const PAGE_SIZE = 10;

async function fetchPaginationPage(page: number) {
  const response = await fetch(`/api/infinite-feed?page=${page}&limit=${PAGE_SIZE}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }

  return (await response.json()) as FeedResponse;
}

export default function PaginationPage() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPage = async (targetPage: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchPaginationPage(targetPage);

      setPosts(data.posts);
      setPage(data.page);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Unknown pagination loading error",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const loadPageFromEffect = useEffectEvent((targetPage: number) => {
    void loadPage(targetPage);
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadPageFromEffect(1);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-separator bg-surface px-6 py-10 shadow-surface backdrop-blur md:px-10">
        <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-[var(--warning-soft)] blur-3xl" />
        <div className="relative space-y-5">
          <span className="inline-flex rounded-full border border-separator bg-surface-secondary px-3 py-1 text-sm text-foreground">
            Page Navigation Sample
          </span>

          <div className="max-w-3xl space-y-4">
            <h1 className={title({ size: "lg" })}>Pagination</h1>
            <p className={subtitle({ class: "max-w-3xl" })}>
              This page reuses the same backend feed endpoint as infinite
              scroll, but presents the data with explicit page navigation
              controls. It is useful for testing page numbers, previous and next
              buttons, and state replacement instead of state append.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.45fr_0.85fr]">
        <div className="space-y-4">
          <div className="rounded-[1.5rem] border border-separator bg-surface p-4 shadow-surface">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm text-muted">
                Showing page <span className="font-semibold text-foreground">{page}</span> of{" "}
                <span className="font-semibold text-foreground">{totalPages}</span>
              </div>
              <div className="text-sm text-muted">
                Approx. dataset size{" "}
                <span className="font-semibold text-foreground">{totalItems}</span> items
              </div>
            </div>
          </div>

          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-[1.5rem] border border-separator bg-surface p-5 shadow-surface"
              data-testid={post.id}
            >
              <div className="flex items-start gap-4">
                <div
                  aria-hidden
                  className="mt-1 h-11 w-11 rounded-full"
                  style={{ backgroundColor: post.accent }}
                />

                <div className="min-w-0 flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-foreground">{post.author}</p>
                    <p className="text-sm text-muted">{post.handle}</p>
                    <span className="text-sm text-muted">·</span>
                    <p className="text-sm text-muted">{post.minutesAgo}m</p>
                  </div>

                  <p className="text-base leading-7 text-foreground">{post.body}</p>

                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="rounded-full bg-background-secondary px-3 py-1 text-foreground">
                      {post.category}
                    </span>
                    <span className="rounded-full bg-background-secondary px-3 py-1 text-muted">
                      Topic: {post.topic}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {error ? (
            <div className="rounded-[1.5rem] border border-danger/20 bg-danger-soft p-5 text-danger-soft-foreground">
              Could not load page {page}. {error}
            </div>
          ) : null}

          <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-separator bg-surface p-4 shadow-surface">
            <Button
              className="rounded-full"
              isDisabled={page <= 1 || isLoading}
              variant="secondary"
              onPress={() => loadPage(page - 1)}
            >
              Previous page
            </Button>

            <p className="text-sm text-muted">
              Page <span className="font-semibold text-foreground">{page}</span> /{" "}
              <span className="font-semibold text-foreground">{totalPages}</span>
            </p>

            <Button
              className="rounded-full"
              isDisabled={page >= totalPages || isLoading}
              variant="primary"
              onPress={() => loadPage(page + 1)}
            >
              Next page
            </Button>
          </div>
        </div>

        <aside className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
          <h2 className="text-xl font-semibold text-foreground">
            Automation notes
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>This page uses the same `/api/infinite-feed` endpoint as infinite scroll.</li>
            <li>Unlike the feed page, each navigation replaces the visible card set.</li>
            <li>Good checks: page label changes, content changes, and previous/next disabled states.</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
