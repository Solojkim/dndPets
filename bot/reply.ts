import { TwitterApi } from "twitter-api-v2";
import { TWITTER } from "./config";
import type { DndClass } from "./config";

const CLASS_FLAVOR: Record<DndClass, string> = {
  wizard: "Your doggo rolled Intelligence 20 🧙 A natural Wizard.",
  paladin: "Honor. Loyalty. Zoomies. Your pup is a Paladin. ⚔️",
  barbarian: "Cannot be stopped. Will not be stopped. Pure Barbarian energy. 🪓",
  ranger: "Silent. Deadly. Extremely good boy. Your dog is a Ranger. 🏹",
  rogue: "Suspicious of mailmen. Steals socks. Classic Rogue. 🗡️",
  cleric: "Healer of hearts. Bringer of joy. Your dog is a Cleric. ✨",
  druid: "One with nature. Eats grass sometimes. Your dog is a Druid. 🌿",
  bard: "Performs for treats. Commands the room. Certified Bard. 🎶",
};

export async function replyWithPortrait(
  tweetId: string,
  authorUsername: string,
  portraitUrl: string,
  dndClass: DndClass
): Promise<void> {
  const client = new TwitterApi({
    appKey: TWITTER.appKey,
    appSecret: TWITTER.appSecret,
    accessToken: TWITTER.accessToken,
    accessSecret: TWITTER.accessSecret,
  });

  // Download portrait and upload to Twitter as media
  const imageResponse = await fetch(portraitUrl);
  const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

  const mediaId = await client.v1.uploadMedia(imageBuffer, { mimeType: "image/png" });

  const replyText = `@${authorUsername} ${CLASS_FLAVOR[dndClass]}\n\nMade with Dungeons & Doggos 🐾⚔️`;

  await client.v2.reply(replyText, tweetId, {
    media: { media_ids: [mediaId] },
  });

  console.log(`Replied to @${authorUsername} (tweet ${tweetId}) as ${dndClass}`);
}
