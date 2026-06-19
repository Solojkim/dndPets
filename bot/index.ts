import "dotenv/config";
import { postDailyPrompt } from "./post";
import { fetchPhotoMentions } from "./mentions";
import { evaluateCandidates, verifyPortrait } from "./evaluate";
import { generatePortrait, pickRandomClass } from "./generate";
import { replyWithPortrait } from "./reply";
import { PORTRAITS_PER_RUN } from "./config";

const mode = process.argv[2]; // "post" or "respond"

async function runPost() {
  console.log("📢 Posting daily prompt tweet...");
  await postDailyPrompt();
  console.log("✅ Daily prompt posted.");
}

async function runRespond() {
  console.log("🐾 Checking mentions for dog photos...");
  const mentions = await fetchPhotoMentions();
  console.log(`Found ${mentions.length} mention(s) with photos`);

  if (mentions.length === 0) {
    console.log("No photo mentions to process. Exiting.");
    return;
  }

  console.log("🎯 Evaluating photo quality...");
  const scored = await evaluateCandidates(mentions);
  console.log(`${scored.length} passed quality threshold`);

  if (scored.length === 0) {
    console.log("No suitable photos found. Exiting.");
    return;
  }

  const picks = scored.slice(0, PORTRAITS_PER_RUN);

  for (const pick of picks) {
    const dndClass = pickRandomClass();
    console.log(`\n⚔️  Generating ${dndClass} portrait for @${pick.authorUsername}...`);

    const portraitUrl = await generatePortrait(pick.photoUrl, dndClass);
    console.log(`Portrait generated: ${portraitUrl}`);

    console.log(`🔍 Verifying portrait quality...`);
    const { passed, reason } = await verifyPortrait(portraitUrl);
    if (!passed) {
      console.log(`❌ Portrait failed verification (${reason}) — skipping reply`);
      continue;
    }
    console.log(`✅ Portrait verified: ${reason}`);

    await replyWithPortrait(pick.tweetId, pick.authorUsername, portraitUrl, dndClass);
    console.log(`✅ Replied to @${pick.authorUsername}`);

    if (picks.indexOf(pick) < picks.length - 1) {
      await new Promise((r) => setTimeout(r, 30_000));
    }
  }

  console.log("\n✨ Respond run complete.");
}

async function main() {
  if (mode === "post") {
    await runPost();
  } else if (mode === "respond") {
    await runRespond();
  } else {
    console.error('Usage: ts-node bot/index.ts [post|respond]');
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Bot failed:", err);
  process.exit(1);
});
