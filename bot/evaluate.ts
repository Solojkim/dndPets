import Anthropic from "@anthropic-ai/sdk";
import type { MentionCandidate } from "./mentions";
import { MIN_QUALITY_SCORE } from "./config";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

export interface ScoredCandidate extends MentionCandidate {
  qualityScore: number;
  qualityReason: string;
}

async function scorePhoto(photoUrl: string): Promise<{ score: number; reason: string }> {
  const response = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 200,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: { type: "url", url: photoUrl },
          },
          {
            type: "text",
            text: `Score this photo as a candidate for AI portrait generation (0-10).

A good candidate has:
- A single dog clearly visible (not multiple dogs)
- Dog's face clearly visible and forward-facing or at slight angle
- Good lighting, not too dark or overexposed
- Dog fills a reasonable portion of the frame
- Not blurry or low resolution

Respond with JSON only: {"score": <number>, "reason": "<one sentence>"}`,
          },
        ],
      },
    ],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";
  try {
    const parsed = JSON.parse(text.trim());
    return { score: parsed.score ?? 0, reason: parsed.reason ?? "" };
  } catch {
    return { score: 0, reason: "Failed to parse evaluation" };
  }
}

export async function evaluateCandidates(
  candidates: MentionCandidate[]
): Promise<ScoredCandidate[]> {
  const scored: ScoredCandidate[] = [];

  for (const candidate of candidates) {
    const { score, reason } = await scorePhoto(candidate.photoUrl);
    console.log(`@${candidate.authorUsername}: score=${score} — ${reason}`);
    scored.push({ ...candidate, qualityScore: score, qualityReason: reason });
  }

  return scored
    .filter((c) => c.qualityScore >= MIN_QUALITY_SCORE)
    .sort((a, b) => b.qualityScore - a.qualityScore);
}

export async function verifyPortrait(portraitUrl: string): Promise<{ passed: boolean; reason: string }> {
  const response = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 200,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: { type: "url", url: portraitUrl },
          },
          {
            type: "text",
            text: `Check if this AI-generated fantasy portrait contains a visible animal head (dog, wolf, or any recognizable animal face) as the subject of the portrait.

This should PASS if:
- There is a clearly visible animal face/head as the main subject
- The animal is wearing fantasy armor, robes, or equipment
- The image looks like an intentional fantasy portrait

This should FAIL if:
- No animal head is visible
- The image is mostly black, corrupted, or blank
- The subject appears fully human with no animal features
- The generation clearly failed

Respond with JSON only: {"passed": <true|false>, "reason": "<one sentence>"}`,
          },
        ],
      },
    ],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";
  try {
    const parsed = JSON.parse(text.trim());
    return { passed: parsed.passed ?? false, reason: parsed.reason ?? "" };
  } catch {
    return { passed: false, reason: "Failed to parse verification" };
  }
}
