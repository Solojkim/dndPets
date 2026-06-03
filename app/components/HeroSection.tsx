export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-16 md:py-24 min-h-screen">
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 max-w-2xl">
        Turn Your Pet Into a DnD Legend
      </h1>
      <p className="mt-6 text-base md:text-xl text-gray-600 max-w-xl">
        Turn your pal into a paladin. Upload a photo, pick a class, and
        get a hyper-realistic fantasy portrait in seconds.
      </p>
      <a
        href="#generator"
        className="mt-10 inline-block bg-purple-700 text-white text-lg font-semibold px-8 py-4 rounded-full hover:bg-purple-800 transition-colors"
      >
        Create Your Portrait
      </a>
    </section>
  );
}
