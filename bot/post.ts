import { TwitterApi } from "twitter-api-v2";
import { TWITTER } from "./config";

const DAILY_PROMPTS = [
  "Drop your dog's photo below 👇 We'll turn them into a DnD character for free 🐾⚔️\n\ndungeonsdoggos.com\n\n#DungeonsDoggos #DnD #dogsoftwitter",
  "What DnD class is your dog? Drop a photo and we'll find out 🧙🐕\n\ndungeonsdoggos.com\n\n#DungeonsDoggos #AIart #dogsoftwitter",
  "Your dog deserves a fantasy portrait. Drop their photo below and we'll make it happen ⚔️🐾\n\ndungeonsdoggos.com\n\n#DungeonsDoggos #DnD #dogs",
  "Calling all good boys and girls 🐶 Drop your dog's photo — we'll transform them into a DnD legend\n\ndungeonsdoggos.com\n\n#DungeonsDoggos #AIart #dogsoftwitter",
  "Every dog has a DnD class. Drop yours below and we'll reveal theirs 🎲🐾\n\ndungeonsdoggos.com\n\n#DungeonsDoggos #DnD #dogs",
];

export async function postDailyPrompt(): Promise<string> {
  const client = new TwitterApi({
    appKey: TWITTER.appKey,
    appSecret: TWITTER.appSecret,
    accessToken: TWITTER.accessToken,
    accessSecret: TWITTER.accessSecret,
  });

  const text = DAILY_PROMPTS[Math.floor(Math.random() * DAILY_PROMPTS.length)];
  const tweet = await client.v2.tweet(text);

  console.log(`Posted daily prompt tweet: ${tweet.data.id}`);
  return tweet.data.id;
}
