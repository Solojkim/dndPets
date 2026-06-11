import Image from "next/image";

const EXAMPLES = [
  {
    src: "/heppiEagerBard.webp",
    alt: "Dog transformed into a DnD Bard portrait",
    class: "Bard",
  },
  {
    src: "/barbHeppi.png",
    alt: "Dog transformed into a DnD Barbarian portrait",
    class: "Barbarian",
  },
  {
    src: "/wizardHeppi.png",
    alt: "Dog transformed into a DnD Wizard portrait",
    class: "Wizard",
  },
];

export default function ExamplesGallery() {
  return (
    <section id="examples" className="px-6 py-16 md:py-24" style={{ backgroundColor: "#ede0c4" }}>
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

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {EXAMPLES.map((example) => (
          <div key={example.class} className="flex flex-col items-center gap-3">
            <Image
              src={example.src}
              alt={example.alt}
              width={400}
              height={400}
              className="rounded-2xl shadow-lg w-full object-cover"
            />
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
