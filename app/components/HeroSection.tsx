export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-16 md:py-24 min-h-screen border-b border-amber-900/20">
      <h1
        className="text-3xl md:text-5xl font-bold tracking-tight max-w-2xl text-red-900"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        Turn Your Pet Into a DnD Legend
      </h1>
      <p
        className="mt-6 text-base md:text-xl max-w-xl text-stone-600"
        style={{ fontFamily: "var(--font-lora)" }}
      >
        Turn your pal into a paladin. Upload a photo, pick a class, and get a
        hyper-realistic fantasy portrait in seconds.
      </p>
      <a
        href="#generator"
        className="mt-10 inline-block bg-red-900 hover:bg-red-950 text-white text-lg font-semibold px-8 py-4 rounded-full transition-colors"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        Create Your Portrait
      </a>
    </section>
  );
}
