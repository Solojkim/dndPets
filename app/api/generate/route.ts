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
    "Transform this dog and his likeness into a hyper realistic tall DnD style barbarian portrait facing forward. The likeness should be preserved as much as possible but the color and shading should fit the rest of the image. The barbarian should be wearing rugged, battle-worn fur and leather armor with tribal markings burned or carved into the leather. In his right hand he wields a massive two-handed greataxe with a chipped and bloodstained blade. His left hand is bare and clenched into a fist, veins prominent from battle rage. The tribal markings on his armor are identical to the markings etched along the flat of the greataxe blade.",
  ranger:
    "Transform this dog and his likeness into a hyper realistic tall DnD style ranger portrait facing forward. The likeness should be preserved as much as possible but the color and shading should fit the rest of the image. The ranger should be wearing dark forest green and brown leather armor with a woodland crest emblem stitched onto the chest, and fitted dark leather gloves with the same woodland crest emblem pressed into the leather on the back of each hand. In his right hand he holds a longbow drawn taut with a glowing green-tipped arrow nocked and ready. On his left forearm he wears a bracer with the same woodland crest emblem embossed into the leather. The crest on his chest armor, his bracer, and his gloves are identical.",
  rogue:
    "Transform this dog and his likeness into a hyper realistic tall DnD style rogue portrait facing forward. The likeness should be preserved as much as possible but the color and shading should fit the rest of the image. The rogue should be wearing sleek dark charcoal and black form-fitting leather armor with a small thieves' guild insignia stamped on the chest. In his right hand he holds a finely balanced dagger with a blade that catches the light with a subtle poison sheen. On both hands he wears matching dark fingerless gloves with the same thieves' guild insignia pressed into the leather at the back of each hand. The insignia on his chest and the insignia on both gloves are identical.",
  cleric:
    "Transform this dog and his likeness into a hyper realistic tall DnD style cleric portrait facing forward. The likeness should be preserved as much as possible but the color and shading should fit the rest of the image. The cleric should be wearing white and gold holy vestments with a sacred sun-wheel symbol emblazoned on the chest and black gloves. In his right hand he holds a gleaming golden mace radiating a warm holy light. In his left hand he holds a holy symbol — a golden medallion bearing the same sun-wheel symbol — raised as if in benediction. The sun-wheel on his vestments and the sun-wheel on the medallion are identical.",
  druid:
    "Transform this dog and his likeness into a hyper realistic tall DnD style druid portrait facing forward. The likeness should be preserved as much as possible but the color and shading should fit the rest of the image. The druid should be wearing earthy brown and mossy green robes woven with living vines and leaves, with a carved wooden nature sigil — a stylized tree — hanging as a pendant at the chest, and fingerless leather gloves wrapped in thin vines with the same stylized tree sigil burned into the leather on the back of each hand. In his right hand he holds a twisted oak staff with small leaves and flowers blooming from its tip. In his left hand he cradles a smooth river stone with the same stylized tree sigil carved into its surface and glowing with soft green bioluminescence. The sigil on his pendant, his gloves, and the stone are identical.",
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
    const base64 = Buffer.from(bytes).toString("base64");
    const dataUri = `data:${photo.type};base64,${base64}`;

    const output = await replicate.run("black-forest-labs/flux-kontext-pro", {
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
