import Image from "next/image";

type Example =
  | { class: string; src: string; alt: string; comingSoon?: false }
  | { class: string; comingSoon: true };

const EXAMPLES: Example[] = [
  { src: "/heppiEagerBard.webp", alt: "Dog transformed into a DnD Bard portrait", class: "Bard" },
  { src: "/barbHeppi.png", alt: "Dog transformed into a DnD Barbarian portrait", class: "Barbarian" },
  { src: "/wizardHeppi.png", alt: "Dog transformed into a DnD Wizard portrait", class: "Wizard" },
  { class: "Paladin", comingSoon: true },
  { class: "Ranger", comingSoon: true },
  { class: "Rogue", comingSoon: true },
  { class: "Cleric", comingSoon: true },
  { class: "Druid", comingSoon: true },
];

function ComingSoonCard() {
  return (
    <div className="w-full aspect-[2/3] relative rounded-2xl shadow-lg overflow-hidden" style={{ backgroundColor: "#ede0c4" }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-red-900/30 font-bold tracking-widest uppercase select-none"
          style={{
            fontFamily: "var(--font-cinzel)",
            transform: "rotate(-35deg)",
            whiteSpace: "nowrap",
            fontSize: "clamp(0.75rem, 3vw, 1.25rem)",
          }}
        >
          Coming Soon
        </span>
      </div>
      <div className="absolute inset-0 border-2 border-dashed border-amber-900/20 rounded-2xl" />
    </div>
  );
}

export default function ExamplesGallery() {
  return (
    <section id="gallery" className="scroll-mt-16 md:scroll-mt-20 px-6 py-16 md:py-24" style={{ backgroundColor: "#f5ecd7" }}>
      <h2
        className="text-2xl md:text-3xl font-bold text-red-900 text-center mb-4"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        Real Results
      </h2>
      <p
        className="text-center text-stone-600 text-sm md:text-base mb-12 max-w-xl mx-auto"
        style={{ fontFamily: "var(--font-lora)" }}
      >
        Every portrait is generated from a real dog photo. No templates, no filters — just your dog, reimagined.
      </p>

      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {EXAMPLES.map((example) => (
          <div key={example.class} className="flex flex-col items-center gap-2">
            {example.comingSoon ? (
              <ComingSoonCard />
            ) : (
              <div className="w-full aspect-[2/3] relative rounded-2xl shadow-lg overflow-hidden">
                <Image
                  src={example.src}
                  alt={example.alt}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <span
              className="text-sm font-bold text-red-900"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              {example.class}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
