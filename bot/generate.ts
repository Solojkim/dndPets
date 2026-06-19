import Replicate from "replicate";
import { DND_CLASSES, type DndClass } from "./config";

const replicate = new Replicate({ auth: process.env.REPLICATE_API_KEY! });

const CLASS_PROMPTS: Record<DndClass, string> = {
  wizard:
    "Transform this dog and his likeness into a hyper realistic tall DnD style wizard portrait facing forward. The likeness should be preserved as much as possible but the color and shading should fit the rest of the image. The wizard should be wearing deep navy and silver robes adorned with intricate arcane sigils that faintly glow violet, and dark leather gloves with the same arcane sigils embroidered on the back of each hand. In his right hand he holds a tall gnarled wooden staff topped with a large glowing violet gemstone crackling with arcane energy. In his left hand he holds an open spellbook with glowing arcane script on its pages. The arcane sigils on his robes and the script inside the spellbook share the same magical symbols.",
  paladin:
    "Transform this dog and his likeness into a hyper realistic tall DnD style paladin portrait facing forward. The likeness should be preserved as much as possible but the color and shading should fit the rest of the image. The paladin should be wearing blackened gold armor with an intricate insignia, and black armored gauntlets with the same insignia engraved on the back of each gauntlet. On his right hand, he should be equipped with a hammer similar in size to Thor's Hammer that is glowing and radiating yellow/gold. On his left hand, he has equipped a kite shield that has a replica of the insignia on the armor. The insignias on the armor, the shield, and the gauntlets are identical.",
  barbarian:
    "Transform this dog and his likeness into a hyper realistic tall DnD style barbarian portrait facing forward. The likeness should be preserved as much as possible but the color and shading should fit the rest of the image. The barbarian should be wearing rugged, battle-worn fur and leather armor with tribal markings burned or carved into the leather. In his right hand he wields a massive two-handed greataxe with a chipped and worn blade. His left hand is bare and clenched into a fist. The tribal markings on his armor are identical to the markings etched along the flat of the greataxe blade.",
  ranger:
    "Transform this dog and his likeness into a hyper realistic full body DnD style ranger portrait. The likeness, particularly the face, should be maximally preserved, but the color and shading should fit the rest of the image. He should hold a thick and finely detailed and engraved recurve bow on his left arm, holding it across his body. The bow is correctly shaped and has a string connecting the two ends of the bow. There are ZERO arrows in the hands or bow. The ranger is wearing a quiver on his back. He is wearing polished green leather armor with forest insignias.",
  rogue:
    "Transform this dog and his likeness into a hyper realistic DnD style rogue portrait facing forward. The likeness should be preserved as much as possible but the color and shading should fit the rest of the image. The rogue should be wearing sleek dark charcoal and black form-fitting leather armor and gloves. The rogue should be equipped with a finely ornate dark dagger in his right hand and a hand crossbow in the left hand perched up against his shoulder. The rogue is also wearing a black hood to conceal himself.",
  cleric:
    "Transform this dog and his likeness into a hyper realistic tall DnD style cleric portrait facing forward. The likeness should be preserved as much as possible but the color and shading should fit the rest of the image. The cleric should be wearing white and gold holy vestments with a sacred sun-wheel symbol emblazoned on the chest and black gloves. In his right hand he holds a gleaming golden mace radiating a warm holy light. In his left hand he holds a holy tome flipped open to glowing pages. The sun-wheel on his vestments and the sun-wheel on the medallion are identical.",
  druid:
    "Transform this dog and his likeness into a hyper realistic tall DnD style druid portrait facing forward. The likeness should be preserved as much as possible but the color and shading should fit the rest of the image. The druid should be wearing earthy brown and mossy green robes woven with living vines and leaves, with a carved wooden nature sigil — a stylized tree — hanging as a pendant at the chest, and leather gloves wrapped in thin vines with the same stylized tree sigil burned into the leather on the back of each hand. In his right hand he holds a twisted oak staff with small leaves and flowers blooming from its tip. In his left hand he wears a claw gauntlet.",
  bard:
    "Transform this dog and his likeness into a hyper realistic tall DnD style bard portrait facing forward. The likeness should be preserved as much as possible but the color and shading should fit the rest of the image. The bard should be wearing flamboyant crimson and gold doublet clothing with an ornate theatrical mask motif embroidered across the chest, and crimson leather gloves with the same theatrical mask motif embroidered on the back of each glove. In his right hand he holds a lute with gold tuning pegs, the strings shimmering with iridescent magical resonance as if mid-performance. In his left hand he holds a wide-brimmed feathered hat with the same theatrical mask motif as a brooch pinned to the front.",
};

export function pickRandomClass(): DndClass {
  return DND_CLASSES[Math.floor(Math.random() * DND_CLASSES.length)];
}

export async function generatePortrait(
  photoUrl: string,
  dndClass: DndClass
): Promise<string> {
  const response = await fetch(photoUrl);
  const buffer = Buffer.from(await response.arrayBuffer());

  const output = await replicate.run("black-forest-labs/flux-kontext-max", {
    input: {
      prompt: CLASS_PROMPTS[dndClass],
      input_image: buffer,
      aspect_ratio: "2:3",
      safety_tolerance: 6,
    },
  });

  const raw = Array.isArray(output) ? output[0] : output;
  return String(raw);
}
