"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const FRAMES = [
  { src: "/heppiEager_cleanedFlipped.png", tag: "Your Pet" },
  { src: "/heppiEagerBardSquare.png", tag: "→ Bard" },
  { src: "/heppiAngry.png", tag: "Your Pet" },
  { src: "/barbHeppiSquare.png", tag: "→ Barbarian" },
  { src: "/heppiChunky_very_muted.png", tag: "Your Pet", position: "50% 90%" },
  { src: "/wizardHeppiSquare.png", tag: "→ Wizard" },
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
    <section className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 px-8 py-16 md:py-24 min-h-screen border-b border-amber-900/20">

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
          className="mt-10 inline-block bg-red-900 hover:bg-red-950 text-white text-lg font-semibold px-8 py-4 rounded-full transition-colors shadow-lg"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Create Your Portrait
        </a>
      </div>

      {/* Right: cycling image */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-72 h-72 md:w-[480px] md:h-[480px]">
          {FRAMES.map((frame, idx) => (
            <div
              key={frame.src}
              className="absolute inset-0 transition-opacity duration-1000 rounded-2xl overflow-hidden shadow-xl"
              style={{ opacity: idx === currentIdx ? 1 : 0 }}
            >
              <Image
                src={frame.src}
                alt={frame.tag}
                fill
                className="object-cover"
                style={{ objectPosition: frame.position ?? "50% 50%" }}
                priority={idx === 0}
              />
            </div>
          ))}
        </div>
        <span
          className={`text-sm font-semibold tracking-widest uppercase text-red-900/60 transition-opacity duration-300 ${isTagVisible ? "opacity-100" : "opacity-0"}`}
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          {FRAMES[currentIdx].tag}
        </span>
      </div>

    </section>
  );
}
