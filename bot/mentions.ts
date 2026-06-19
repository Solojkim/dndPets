import { TwitterApi } from "twitter-api-v2";
import { TWITTER } from "./config";

export interface MentionCandidate {
  tweetId: string;
  authorUsername: string;
  authorId: string;
  photoUrl: string;
}

// Reads the last processed mention ID from env so we don't reply twice.
// In GitHub Actions, this is passed as an env var set by a previous run.
function getLastProcessedId(): string | undefined {
  return process.env.LAST_PROCESSED_MENTION_ID || undefined;
}

export async function fetchPhotoMentions(): Promise<MentionCandidate[]> {
  const client = new TwitterApi({
    appKey: TWITTER.appKey,
    appSecret: TWITTER.appSecret,
    accessToken: TWITTER.accessToken,
    accessSecret: TWITTER.accessSecret,
  });

  // Get the bot's own user ID
  const me = await client.v2.me();
  const sinceId = getLastProcessedId();

  const mentions = await client.v2.userMentionTimeline(me.data.id, {
    ...(sinceId ? { since_id: sinceId } : { max_results: 20 }),
    expansions: ["attachments.media_keys", "author_id"],
    "media.fields": ["url", "type"],
    "tweet.fields": ["author_id"],
    "user.fields": ["username"],
  });

  const tweets = mentions.data.data ?? [];
  const media = mentions.data.includes?.media ?? [];
  const users = mentions.data.includes?.users ?? [];

  const candidates: MentionCandidate[] = [];

  for (const tweet of tweets) {
    const mediaKeys = tweet.attachments?.media_keys ?? [];
    const photos = media.filter(
      (m) => mediaKeys.includes(m.media_key!) && m.type === "photo"
    );

    if (photos.length === 0) continue;

    const photoUrl = photos[0].url;
    if (!photoUrl) continue;

    const author = users.find((u) => u.id === tweet.author_id);
    if (!author) continue;

    candidates.push({
      tweetId: tweet.id,
      authorUsername: author.username,
      authorId: author.id,
      photoUrl,
    });
  }

  return candidates;
}
