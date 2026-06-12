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
    <section className="flex flex-col md:flex-row items-start justify-start md:justify-center gap-12 md:gap-20 px-8 pt-12 pb-16 md:pt-32 md:pb-24 min-h-screen border-b border-amber-900/20">

      {/* Left: text */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-lg">
        <h1
          className="text-3xl md:text-5xl font-bold tracking-tight text-red-900"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Turn Your Pet Into a DnD Legend
        </h1>
        <p
          className="mt-6 text-base md:text-xl text-stone-600"
          style={{ fontFamily: "var(--font-lora)" }}
        >
          Turn your pal into a paladin. Upload a photo, pick a class, and get a
          hyper-realistic fantasy portrait in seconds.
        </p>
        <a
          href="#generator"
          className="mt-10 self-center flex flex-col items-center bg-red-900 hover:bg-red-950 text-white font-semibold px-8 py-4 rounded-full transition-colors shadow-lg"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          <span className="text-lg">Cast Polymorph</span>
          <span className="text-[10px] text-white/50">(Create your portrait)</span>
        </a>

        {/* Mobile: before + after side by side */}
        <div
          className={`md:hidden mt-14 flex flex-row items-center gap-3 transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="flex flex-col items-center gap-1">
            <div className="relative w-44 h-44 rounded-xl overflow-hidden shadow-md">
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
            <div className="relative w-44 h-44 rounded-xl overflow-hidden shadow-md">
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

      {/* Desktop: single large cycling image */}
      <div className="hidden md:flex flex-col items-center gap-3">
        <div className="relative md:w-[480px] md:h-[480px]">
          {SETS.map((s, idx) => (
            <div
              key={s.label}
              className="absolute inset-0 transition-opacity duration-1000 rounded-2xl overflow-hidden shadow-xl"
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
        <span
          className={`text-sm font-semibold tracking-widest uppercase text-red-900/60 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          → {set.label}
        </span>
      </div>

    </section>
  );
}
