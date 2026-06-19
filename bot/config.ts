export const TWITTER = {
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_SECRET!,
  bearerToken: process.env.TWITTER_BEARER_TOKEN!,
};

export const DND_CLASSES = [
  "wizard",
  "paladin",
  "barbarian",
  "ranger",
  "rogue",
  "cleric",
  "druid",
  "bard",
] as const;

export type DndClass = (typeof DND_CLASSES)[number];

// Minimum photo quality score (0-10) to be considered for generation
export const MIN_QUALITY_SCORE = 6;

// How many top tweets to fetch and evaluate
export const CANDIDATE_POOL = 10;

// How many portraits to generate and reply to per run
export const PORTRAITS_PER_RUN = 2;
