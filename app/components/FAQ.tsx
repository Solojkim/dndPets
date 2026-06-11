const FAQS = [
  {
    question: "How accurate is the likeness to my dog?",
    answer: "Our AI uses your dog's photo as a direct reference, preserving their fur color, markings, face shape, and eye color as closely as possible. Results are best with a clear, front-facing photo in good lighting. The likeness is never perfect — it's artistic interpretation — but most owners immediately recognize their dog in the portrait.",
  },
  {
    question: "What makes a good photo to upload?",
    answer: "The best photos are front-facing with your dog's face clearly visible, taken in good natural lighting with a relatively simple background. Avoid photos where your dog is mid-motion, partially obscured, or shot from a sharp angle. The cleaner the reference, the stronger the likeness.",
  },
  {
    question: "What resolution is the download?",
    answer: "Portraits are generated at 1024x1024 pixels — high enough for digital sharing, social media, and standard print sizes up to 8x8 inches at 128 DPI.",
  },
  {
    question: "How long does it take to generate?",
    answer: "Most portraits generate in 15–30 seconds. Occasionally it may take up to a minute depending on server load. The progress indicator will keep you updated while your portrait is being created.",
  },
  {
    question: "What DnD classes are available?",
    answer: "We currently offer 8 classes: Wizard, Paladin, Barbarian, Ranger, Rogue, Cleric, Druid, and Bard. Each class has a unique hand-crafted portrait style with custom armor, weapons, and insignia. More classes coming soon.",
  },
  {
    question: "Can I use this for cats or other pets?",
    answer: "Dungeons & Doggies is currently optimized for dogs. The AI and prompts are tuned specifically for canine features and likeness preservation. Cat and other pet support is on our roadmap — sign up to be notified when it launches.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="px-6 py-16 md:py-24" style={{ backgroundColor: "#f5ecd7" }}>
      <h2
        className="text-2xl md:text-3xl font-bold text-red-900 text-center mb-12"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        Frequently Asked Questions
      </h2>

      <div className="max-w-2xl mx-auto flex flex-col gap-4">
        {FAQS.map((faq) => (
          <details
            key={faq.question}
            className="border border-amber-900/20 rounded-xl overflow-hidden"
          >
            <summary
              className="px-6 py-4 cursor-pointer font-semibold text-red-900 hover:bg-amber-900/5 transition-colors list-none flex justify-between items-center"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              {faq.question}
              <span className="text-red-900 text-lg">+</span>
            </summary>
            <p
              className="px-6 py-4 text-sm text-stone-600 leading-relaxed border-t border-amber-900/20"
              style={{ fontFamily: "var(--font-lora)", backgroundColor: "#ede0c4" }}
            >
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
