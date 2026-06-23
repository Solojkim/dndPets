"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const SETS = [
  {
    before: { src: "/heppiEager_cleanedFlipped.png" },
    after: { src: "/heppiEagerBardSquare.png" },
    label: "Bard",
  },
  {
    before: { src: "/heppiAngry.png" },
    after: { src: "/barbHeppiSquare.png" },
    label: "Barbarian",
  },
  {
    before: { src: "/heppiChunky_very_muted.png", position: "50% 90%" },
    after: { src: "/wizardHeppiSquare.png" },
    label: "Wizard",
  },
];

export default function HeroSection() {
  const [currentSet, setCurrentSet] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentSet((prev) => (prev + 1) % SETS.length);
        setIsVisible(true);
      }, 400);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  const set = SETS[currentSet];

  return (
    <section className="flex flex-col lg:flex-row items-start lg:items-stretch justify-start lg:justify-center gap-8 lg:gap-8 px-4 sm:px-8 pt-12 pb-20 lg:pt-0 lg:pb-0 lg:min-h-screen border-b border-amber-900/20">

      {/* Left: text + button */}
      <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left max-w-lg lg:py-16">
        <h1
          className="text-3xl lg:text-5xl font-bold tracking-tight text-red-900"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Turn Your Pet Into a DnD Legend
        </h1>
        <p
          className="mt-6 text-base lg:text-xl text-stone-600"
          style={{ fontFamily: "var(--font-lora)" }}
        >
          Turn your pal into a paladin. Upload a photo, pick a class, and get a
          hyper-realistic fantasy portrait in seconds.
        </p>

        {/* Button */}
        <a
          href="/generate"
          className="mt-9 self-center flex flex-col items-center bg-red-900 hover:bg-red-950 text-white font-semibold px-8 py-4 rounded-full transition-colors shadow-lg"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          <span className="text-lg">Cast Polymorph</span>
          <span className="text-[10px] text-white/50">(Create your portrait)</span>
        </a>

        {/* Before image — desktop only */}
        <div className={`hidden lg:flex mt-14 self-center transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <div className="relative w-[200px] h-[220px]">
            <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-md">
              {SETS.map((s, idx) => (
                <div
                  key={s.label + "-before"}
                  className="absolute inset-0 transition-opacity duration-1000"
                  style={{ opacity: idx === currentSet ? 1 : 0 }}
                >
                  <Image
                    src={s.before.src}
                    alt="Your pet"
                    fill
                    className="object-cover"
                    style={{ objectPosition: s.before.position ?? "50% 50%" }}
                    priority={idx === 0}
                  />
                </div>
              ))}
            </div>
            <span
              className="absolute top-1/2 -translate-y-1/2 -right-26 text-3xl text-red-900 font-bold"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              →
            </span>
          </div>
        </div>

        {/* Mobile + tablet: before + after side by side */}
        <div
          className={`lg:hidden mt-14 flex flex-row items-center gap-3 transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="flex flex-col items-center gap-1">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-xl overflow-hidden shadow-md">
              <Image
                src={set.before.src}
                alt="Your pet"
                fill
                className="object-cover"
                style={{ objectPosition: set.before.position ?? "50% 50%" }}
              />
            </div>
            <span className="text-xs text-stone-500" style={{ fontFamily: "var(--font-lora)" }}>Your Pet</span>
          </div>

          <span className="text-xl text-red-900 font-bold" style={{ fontFamily: "var(--font-cinzel)" }}>→</span>

          <div className="flex flex-col items-center gap-1">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-xl overflow-hidden shadow-md">
              <Image
                src={set.after.src}
                alt={`DnD ${set.label}`}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xs text-stone-500" style={{ fontFamily: "var(--font-lora)" }}>{set.label}</span>
          </div>
        </div>
      </div>

      {/* Desktop: large after image */}
      <div
        className="hidden lg:block relative rounded-2xl overflow-hidden shadow-xl flex-shrink-0"
        style={{ width: "45vw", maxWidth: "640px" }}
      >
        {SETS.map((s, idx) => (
          <div
            key={s.label + "-after"}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: idx === currentSet ? 1 : 0 }}
          >
            <Image
              src={s.after.src}
              alt={`Dog as DnD ${s.label}`}
              fill
              className="object-cover"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>

    </section>
  );
}
