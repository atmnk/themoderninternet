"use client";

import {
  startTransition,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import { Button } from "@heroui/react";

import { subtitle, title } from "@/components/primitives";

type FeedPost = {
  id: string;
  author: string;
  handle: string;
  body: string;
  topic: string;
  minutesAgo: number;
  likes: number;
  comments: number;
  shares: number;
  accent: string;
};

type FeedResponse = {
  page: number;
  limit: number;
  hasMore: boolean;
  nextPage: number | null;
  posts: FeedPost[];
};

const PAGE_SIZE = 8;

async function fetchFeedPage(page: number) {
  const response = await fetch(`/api/infinite-feed?page=${page}&limit=${PAGE_SIZE}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }

  return (await response.json()) as FeedResponse;
}

export default function InfiniteScrollPage() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [nextPage, setNextPage] = useState<number | null>(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const mountedRef = useRef(false);

  const loadPage = async (page: number, replace = false) => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchFeedPage(page);

      startTransition(() => {
        setPosts((current) =>
          replace ? data.posts : [...current, ...data.posts],
        );
        setNextPage(data.nextPage);
        setHasMore(data.hasMore);
      });
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Unknown feed loading error",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const loadPageFromEffect = useEffectEvent((page: number) => {
    void loadPage(page);
  });

  useEffect(() => {
    if (mountedRef.current) {
      return;
    }

    mountedRef.current = true;
    loadPageFromEffect(1);
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry?.isIntersecting || isLoading || nextPage === null) {
          return;
        }

        loadPageFromEffect(nextPage);
      },
      {
        rootMargin: "240px 0px",
        threshold: 0.1,
      },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [hasMore, isLoading, nextPage]);

  return (
    <section className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-separator bg-surface px-6 py-10 shadow-surface backdrop-blur md:px-10">
        <div className="pointer-events-none absolute left-0 top-0 h-40 w-40 rounded-full bg-[var(--accent-soft)] blur-3xl" />
        <div className="relative space-y-5">
          <span className="inline-flex rounded-full border border-separator bg-surface-secondary px-3 py-1 text-sm text-foreground">
            Feed Loading Sample
          </span>

          <div className="max-w-3xl space-y-4">
            <h1 className={title({ size: "lg" })}>Infinite Scroll</h1>
            <p className={subtitle({ class: "max-w-3xl" })}>
              This page simulates a social feed powered by a paginated backend
              endpoint. As you scroll, more cards load automatically, similar to
              a timeline on Twitter, Facebook, or other content-heavy apps.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.45fr_0.85fr]">
        <div className="space-y-4">
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

                  <p className="text-base leading-7 text-foreground">
                    {post.body}
                  </p>

                  <p className="rounded-xl bg-background-secondary px-3 py-2 text-sm text-muted">
                    Topic: {post.topic}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-muted">
                    <span>Likes {post.likes}</span>
                    <span>Comments {post.comments}</span>
                    <span>Shares {post.shares}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {error ? (
            <div className="rounded-[1.5rem] border border-danger/20 bg-danger-soft p-5 text-danger-soft-foreground">
              Could not load the next page of posts. {error}
            </div>
          ) : null}

          {isLoading ? (
            <div className="rounded-[1.5rem] border border-separator bg-surface p-5 text-center text-muted">
              Loading more posts...
            </div>
          ) : null}

          {!hasMore && posts.length > 0 ? (
            <div className="rounded-[1.5rem] border border-separator bg-surface p-5 text-center text-muted">
              You have reached the end of the feed.
            </div>
          ) : null}

          <div ref={sentinelRef} className="h-4" data-testid="feed-sentinel" />
        </div>

        <aside className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
          <h2 className="text-xl font-semibold text-foreground">
            Automation notes
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>The UI fetches `/api/infinite-feed` in pages of 8 items.</li>
            <li>Scrolling near the bottom should append more posts.</li>
            <li>
              Good assertions: initial count, count growth after scroll, and end
              of feed behavior.
            </li>
          </ul>

          <Button
            className="mt-6 rounded-full"
            variant="secondary"
            onPress={() => {
              setError(null);
              void loadPage(1, true);
            }}
          >
            Reset feed
          </Button>
        </aside>
      </div>
    </section>
  );
}
