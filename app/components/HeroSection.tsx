"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const SETS = [
  {
    before: "/heppiEager_cleanedFlipped.png",
    after: "/heppiEagerBard.webp",
    label: "Bard",
  },
  {
    before: "/heppiAngry.png",
    after: "/barbHeppi.png",
    label: "Barbarian",
  },
  {
    before: "/heppiChunky_very_muted.png",
    after: "/wizardHeppi.png",
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
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const set = SETS[currentSet];

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

      <div className={`mt-12 flex flex-col md:flex-row items-center gap-4 md:gap-8 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <div className="flex flex-col items-center gap-2">
          <Image
            src={set.before}
            alt="Real pet photo before transformation"
            width={300}
            height={300}
            className="rounded-2xl shadow-md object-cover"
          />
          <span
            className="text-sm text-stone-500"
            style={{ fontFamily: "var(--font-lora)" }}
          >
            Your Pet
          </span>
        </div>

        <span
          className="text-3xl text-red-900 font-bold"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          →
        </span>

        <div className="flex flex-col items-center gap-2">
          <Image
            src={set.after}
            alt={`Pet transformed into a DnD ${set.label}`}
            width={300}
            height={300}
            className="rounded-2xl shadow-md object-cover"
          />
          <span
            className="text-sm text-stone-500"
            style={{ fontFamily: "var(--font-lora)" }}
          >
            DnD {set.label}
          </span>
        </div>
      </div>

      <a
        href="#generator"
        className="mt-12 inline-block bg-red-900 hover:bg-red-950 text-white text-lg font-semibold px-8 py-4 rounded-full transition-colors"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        Create Your Portrait
      </a>
    </section>
  );
}
