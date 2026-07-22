import { NextResponse } from "next/server";

const AUTHORS = [
  "Maya Chen",
  "Leo Brooks",
  "Anika Shah",
  "Noah Park",
  "Elena Costa",
  "Samir Khan",
  "Ivy Turner",
  "Jonas Reed",
  "Priya Nair",
  "Marcus Vale",
  "Tessa Liu",
  "Ari Gomez",
];

const HANDLES = [
  "@shipitmaya",
  "@opsleo",
  "@anikalabs",
  "@parksignals",
  "@elenacodes",
  "@samirbuilds",
  "@ivytests",
  "@jonasfeed",
  "@priyaops",
  "@marcuslabs",
  "@tessametrics",
  "@arifeed",
];

const TOPICS = [
  "shipping a new onboarding test flow",
  "investigating a flaky production alert",
  "comparing ad headline performance",
  "reviewing load times on the mobile feed",
  "cleaning up a legacy selector strategy",
  "tracking image failures in a content grid",
  "measuring conversion drop after a UI tweak",
  "watching user behavior on infinite scroll",
  "testing authentication prompts across browsers",
  "monitoring pagination response times",
  "reviewing accessibility changes in the card feed",
  "debugging a stale cache issue in a recommendation stream",
  "measuring engagement after a content ordering experiment",
  "tracking retries on a slow media upload queue",
];

const OPENERS = [
  "Just finished",
  "Spotted an interesting pattern while",
  "Today we are",
  "The team is currently",
  "A quick update on",
  "Still thinking about",
  "Deep in the weeds of",
  "Unexpectedly fun morning",
  "Spent the afternoon",
  "We are now validating",
  "Fresh notes from",
  "A small experiment around",
];

const PAGE_SIZE_DEFAULT = 8;
const PAGE_SIZE_MAX = 16;
const TOTAL_PAGES = 24;

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

const CATEGORIES = [
  "Growth",
  "Reliability",
  "Design QA",
  "Experimentation",
  "Frontend",
  "Analytics",
  "Platform",
  "Automation",
];

function seededRandom(seed: number) {
  let value = seed >>> 0;

  return () => {
    value += 0x6d2b79f5;
    let t = value;

    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(items: T[], random: () => number) {
  return items[Math.floor(random() * items.length)];
}

function createPost(page: number, index: number): FeedPost {
  const globalIndex = page * 100 + index;
  const random = seededRandom(globalIndex + 17);

  const authorIndex = Math.floor(random() * AUTHORS.length);
  const topic = pick(TOPICS, random);
  const opener = pick(OPENERS, random);
  const category = pick(CATEGORIES, random);
  const accentHue = Math.floor(random() * 360);

  return {
    id: `post-${page}-${index}`,
    author: AUTHORS[authorIndex],
    handle: HANDLES[authorIndex],
    topic,
    category,
    body: `${opener} ${topic}. The current experiment is focused on whether a more responsive feed layout improves engagement without making the interface feel noisy. We are logging card visibility, click intent, and session depth to compare outcomes across the feed.`,
    minutesAgo: page * 17 + index * 4 + Math.floor(random() * 7) + 2,
    likes: Math.floor(random() * 780) + 12,
    comments: Math.floor(random() * 140) + 3,
    shares: Math.floor(random() * 62) + 1,
    accent: `oklch(0.72 0.14 ${accentHue})`,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedPage = Number(searchParams.get("page") ?? "1");
  const requestedLimit = Number(searchParams.get("limit") ?? `${PAGE_SIZE_DEFAULT}`);

  const page =
    Number.isFinite(requestedPage) && requestedPage > 0
      ? Math.floor(requestedPage)
      : 1;
  const limit =
    Number.isFinite(requestedLimit) && requestedLimit > 0
      ? Math.min(Math.floor(requestedLimit), PAGE_SIZE_MAX)
      : PAGE_SIZE_DEFAULT;

  const posts =
    page <= TOTAL_PAGES
      ? Array.from({ length: limit }, (_, index) => createPost(page, index))
      : [];

  return NextResponse.json({
    page,
    limit,
    totalPages: TOTAL_PAGES,
    totalItems: TOTAL_PAGES * limit,
    hasMore: page < TOTAL_PAGES,
    nextPage: page < TOTAL_PAGES ? page + 1 : null,
    posts,
  });
}
