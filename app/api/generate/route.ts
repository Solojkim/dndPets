import Replicate from "replicate";
import { NextResponse } from "next/server";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

const CLASS_PROMPTS: Record<string, string> = {
  wizard:
    "Transform this pet into a hyper-realistic fantasy portrait as a wise DnD wizard. Wearing ornate robes, pointed hat, holding a glowing magical staff. Arcane symbols and mystical energy surrounding them. Dramatic studio lighting, fantasy art style.",
  paladin:
    "The character is now wearing full royal plate armor in polished gold with deep crimson accents — ornate pauldrons, a sculpted breastplate, and articulated gauntlets. Engraved on the center of the breastplate is an intricate circular sun insignia with radiating blades and inner filigree detail. In their left arm they carry a large spiked kite shield in matching gold and red, bearing the identical sun insignia embossed and raised on its face. A crimson cape flows from the shoulders. The character is an anthropomorphic dog standing upright in a heroic pose. The dog's face, fur color, fur texture, and facial features remain completely unchanged and identical to the reference image. Only the clothing and equipment are being added.",
  barbarian:
    "Transform this pet into a hyper-realistic fantasy portrait as a fierce DnD barbarian. Wearing rugged fur and leather armor, wielding a massive axe. Battle-worn, intense expression, stormy dramatic background, epic fantasy art style.",
  ranger:
    "Transform this pet into a hyper-realistic fantasy portrait as a skilled DnD ranger. Wearing practical leather armor, holding a longbow, forest and mountains in the background. Alert and focused expression, natural lighting, fantasy art style.",
  rogue:
    "Transform this pet into a hyper-realistic fantasy portrait as a cunning DnD rogue. Wearing a dark hooded cloak, daggers at their side. Shadowy atmospheric background, mysterious expression, moody dramatic lighting, fantasy art style.",
  cleric:
    "Transform this pet into a hyper-realistic fantasy portrait as a devoted DnD cleric. Wearing ceremonial robes with holy symbols, holding a sacred staff, divine light radiating around them. Serene expression, heavenly background, fantasy art style.",
  druid:
    "Transform this pet into a hyper-realistic fantasy portrait as a mystical DnD druid. Wearing nature-woven robes adorned with leaves and vines, holding a wooden staff. Enchanted forest background, soft natural lighting, fantasy art style.",
  bard:
    "Transform this pet into a hyper-realistic fantasy portrait as a charismatic DnD bard. Wearing colorful performer's outfit, holding a lute. Warm tavern or stage background, joyful confident expression, vibrant fantasy art style.",
};

export async function POST(request: Request) {
  const formData = await request.formData();
  const photo = formData.get("photo") as File;
  const dndClass = formData.get("class") as string;

  if (!photo || !dndClass) {
    return NextResponse.json(
      { error: "Missing photo or class" },
      { status: 400 }
    );
  }

  const prompt = CLASS_PROMPTS[dndClass];
  if (!prompt) {
    return NextResponse.json({ error: "Invalid class" }, { status: 400 });
  }

  try {
    const bytes = await photo.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const dataUri = `data:${photo.type};base64,${base64}`;

    const output = await replicate.run("black-forest-labs/flux-kontext-dev", {
      input: {
        prompt,
        input_image: dataUri,
      },
    });

    const raw = Array.isArray(output) ? output[0] : output;
    const imageUrl = String(raw);

    console.log("Image URL:", imageUrl);

    return NextResponse.json({ imageUrl });
  } catch (err) {
    console.error("Replicate error:", err);
    return NextResponse.json(
      { error: "Image generation failed. Please try again." },
      { status: 500 }
    );
  }
}
