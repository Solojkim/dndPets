import Replicate from "replicate";
import { NextResponse } from "next/server";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

const CLASS_PROMPTS: Record<string, string> = {
  wizard:
    "Transform this dog and his likeness into a hyper realistic tall DnD style wizard portrait facing forward. The likeness should be preserved as much as possible but the color and shading should fit the rest of the image. The wizard should be wearing deep navy and silver robes adorned with intricate arcane sigils that faintly glow violet, and dark leather gloves with the same arcane sigils embroidered on the back of each hand. In his right hand he holds a tall gnarled wooden staff topped with a large glowing violet gemstone crackling with arcane energy. In his left hand he holds an open spellbook with glowing arcane script on its pages. The arcane sigils on his robes and the script inside the spellbook share the same magical symbols.",
  paladin:
    "Transform this dog and his likeness into a hyper realistic tall DnD style paladin portrait facing forward. The likeness should be preserved as much as possible but the color and shading should fit the rest of the image. The paladin should be wearing blackened gold armor with an intricate insignia, and black armored gauntlets with the same insignia engraved on the back of each gauntlet. On his right hand, he should be equipped with a hammer similar in size to Thor’s Hammer that is glowing and radiating yellow/gold. On his left hand, he has equipped a kite shield that has a replica of the insignia on the armor. The insignias on the armor, the shield, and the gauntlets are identical.",
  barbarian:
    "Transform this dog into a hyper realistic tall DnD style barbarian portrait facing forward. This is an anthropomorphic dog character — the subject has a dog's face, dog's fur covering the entire body, and dog paws instead of human hands. There is absolutely no human skin anywhere. The fur color and texture must exactly match the input dog. The barbarian is wearing rugged, battle-worn fur and leather armor with tribal markings burned or carved into the leather. In his right dog paw he wields a massive two-handed greataxe with a chipped and worn blade. His left dog paw is clenched into a fist. No human skin, no human hands — only dog fur and dog paws. The tribal markings on his armor are identical to the markings etched along the flat of the greataxe blade.",
  ranger:
    "transform this dog and his likeness into a hyper realistic full body DnD style ranger portrait. The likeness, particularly the face, should be maximally preserved, but the color and shading should fit the rest of the image. He should hold a thick and finely detailed and engraved recurse bow on his left arm, holding it across his body. The bow is correctly shaped and has a string connecting the two ends of the bow. There are ZERO arrows in the hands or bow. The ranger is wearing a quiver on his back. He is wearing polished green leather armor with forest insignias. There are no arrows on the bow nor either hand. The bow is correctly shaped and fully visible in front of the body",



  rogue:
    "Transform this dog and his likeness into a hyper realistic DnD style rogue portrait facing forward. The likeness should be preserved as much as possible but the color and shading should fit the rest of the image. The rogue should be wearing sleek dark charcoal and black form-fitting leather armor and gloves. The rogue should be equipped with a finely ornate dark dagger in his right hand and a hand crossbow in the left hand perched up against his shoulder. The rogue is also wearing a black hood to conceal himself.",
  cleric:
    "Transform this dog and his likeness into a hyper realistic tall DnD style cleric portrait facing forward. The likeness should be preserved as much as possible but the color and shading should fit the rest of the image. The cleric should be wearing white and gold holy vestments with a sacred sun-wheel symbol emblazoned on the chest and black gloves. In his right hand he holds a gleaming golden mace radiating a warm holy light. In his left hand he hold a holy tome flipped open to glowing pages. The sun-wheel on his vestments and the sun-wheel on the medallion are identical.",
  druid:
    "Transform this dog and his likeness into a hyper realistic tall DnD style druid portrait facing forward. The likeness should be preserved as much as possible but the color and shading should fit the rest of the image. The druid should be wearing earthy brown and mossy green robes woven with living vines and leaves, with a carved wooden nature sigil — a stylized tree — hanging as a pendant at the chest, and leather gloves wrapped in thin vines with the same stylized tree sigil burned into the leather on the back of each hand. In his right hand he holds a twisted oak staff with small leaves and flowers blooming from its tip. In his left hand he wears a claw gauntlet.",
  bard:
    "Transform this dog and his likeness into a hyper realistic tall DnD style bard portrait facing forward. The likeness should be preserved as much as possible but the color and shading should fit the rest of the image. The bard should be wearing flamboyant crimson and gold doublet clothing with an ornate theatrical mask motif embroidered across the chest, and crimson leather gloves with the same theatrical mask motif embroidered on the back of each glove. In his right hand he holds a lute with gold tuning pegs, the strings shimmering with iridescent magical resonance as if mid-performance. In his left hand he holds a wide-brimmed feathered hat with the same theatrical mask motif as a brooch pinned to the front. The mask motif on his doublet, his gloves, and the hat brooch are identical.",
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
    const buffer = Buffer.from(bytes);

    // Pass buffer directly — SDK uploads to Replicate Files API and substitutes a URL,
    // which is the format flux-kontext-pro actually expects.
    // safety_tolerance max is 2 when an input_image is provided (per model schema).
    const output = await replicate.run("black-forest-labs/flux-kontext-pro", {
      input: {
        prompt,
        input_image: buffer,
        aspect_ratio: "2:3",
        safety_tolerance: 6,
      },
    });

    const raw = Array.isArray(output) ? output[0] : output;
    const imageUrl = String(raw);

    return NextResponse.json({ imageUrl });
  } catch (err) {
    console.error("Replicate error:", err);
    return NextResponse.json(
      { error: "Image generation failed. Please try again." },
      { status: 500 }
    );
  }
}
