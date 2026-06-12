"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const FRAMES = [
  { src: "/heppiEager_cleanedFlipped.png", tag: "Your Pet" },
  { src: "/heppiEagerBard.webp", tag: "→ Bard" },
  { src: "/heppiAngry.png", tag: "Your Pet" },
  { src: "/barbHeppi.png", tag: "→ Barbarian" },
  { src: "/heppiChunky_very_muted.png", tag: "Your Pet" },
  { src: "/wizardHeppi.png", tag: "→ Wizard" },
];

export default function HeroSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isTagVisible, setIsTagVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTagVisible(false);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % FRAMES.length);
        setIsTagVisible(true);
      }, 400);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 py-16 md:py-24 min-h-screen border-b border-amber-900/20 overflow-hidden">

      {/* Background image layers */}
      {FRAMES.map((frame, idx) => (
        <div
          key={frame.src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: idx === currentIdx ? 1 : 0 }}
        >
          <Image
            src={frame.src}
            alt=""
            fill
            className="object-contain"
            priority={idx === 0}
          />
        </div>
      ))}

      {/* Parchment overlay so text stays readable */}
      <div className="absolute inset-0 bg-amber-50/65" />

      {/* Content sits above both layers */}
      <div className="relative z-10 flex flex-col items-center">
        <h1
          className="text-3xl md:text-5xl font-bold tracking-tight max-w-2xl text-red-900"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Turn Your Pet Into a DnD Legend
        </h1>
        <p
          className="mt-6 text-base md:text-xl max-w-xl text-stone-700"
          style={{ fontFamily: "var(--font-lora)" }}
        >
          Turn your pal into a paladin. Upload a photo, pick a class, and get a
          hyper-realistic fantasy portrait in seconds.
        </p>

        <span
          className={`mt-10 text-sm font-semibold tracking-widest uppercase text-red-900/60 transition-opacity duration-300 ${isTagVisible ? "opacity-100" : "opacity-0"}`}
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          {FRAMES[currentIdx].tag}
        </span>

        <a
          href="#generator"
          className="mt-6 inline-block bg-red-900 hover:bg-red-950 text-white text-lg font-semibold px-8 py-4 rounded-full transition-colors shadow-lg"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Create Your Portrait
        </a>
      </div>
    </section>
  );
}
