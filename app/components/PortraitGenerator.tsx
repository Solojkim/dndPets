"use client";

import { useState } from "react";
import Image from "next/image";
import EmailCapture from "./EmailCapture";

export default function PortraitGenerator() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [dndClass, setDndClass] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("photo", photo!);
    formData.append("class", dndClass);

    const response = await fetch("/api/generate", {
      method: "POST",
      body: formData,
    });

    let data;
    try {
      data = await response.json();
    } catch {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
      return;
    }

    if (!response.ok) {
      setError(data?.error ?? "Something went wrong. Please try again.");
      setIsLoading(false);
      return;
    }

    setResult(data.imageUrl);
    setIsLoading(false);
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setPhoto(file);
  }

  return (
    <section
      id="generator"
      className="flex flex-col items-center px-6 py-16 md:py-24"
      style={{ backgroundColor: "#ede0c4" }}
    >
      <h2
        className="text-2xl md:text-3xl font-bold text-red-900"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        Create Your Portrait
      </h2>

      <div className="mt-8 w-full max-w-md">
        <label
          className="block text-sm font-semibold mb-2 text-stone-700"
          style={{ fontFamily: "var(--font-lora)" }}
        >
          Upload a photo of your pet
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="block w-full text-sm text-stone-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-red-900 file:text-white hover:file:bg-red-950"
        />
        {photo && (
          <p className="mt-2 text-sm text-green-800">{photo.name} selected</p>
        )}
      </div>

      <div className="mt-6 w-full max-w-md">
        <label
          className="block text-sm font-semibold mb-2 text-stone-700"
          style={{ fontFamily: "var(--font-lora)" }}
        >
          Choose a DnD class
        </label>
        <select
          value={dndClass}
          onChange={(e) => setDndClass(e.target.value)}
          className="block w-full rounded-lg border border-amber-900/30 px-4 py-3 text-stone-800 focus:border-red-900 focus:outline-none"
          style={{ backgroundColor: "#f5ecd7", fontFamily: "var(--font-lora)" }}
        >
          <option value="">Select a class...</option>
          <option value="wizard">Wizard</option>
          <option value="paladin">Paladin</option>
          <option value="barbarian">Barbarian</option>
          <option value="ranger">Ranger</option>
          <option value="rogue">Rogue</option>
          <option value="cleric">Cleric</option>
          <option value="druid">Druid</option>
          <option value="bard">Bard</option>
        </select>
      </div>

      <button
        onClick={handleGenerate}
        disabled={!photo || !dndClass || isLoading}
        className="mt-8 bg-red-900 hover:bg-red-950 text-white text-lg font-semibold px-10 py-4 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Generating...
          </span>
        ) : (
          "Generate Portrait"
        )}
      </button>

      {error && (
        <p className="mt-4 text-sm text-red-800">{error}</p>
      )}

      {result && !emailSubmitted && (
        <EmailCapture
          onSubmit={(email) => {
            console.log("Email captured:", email);
            setEmailSubmitted(true);
          }}
          onClose={() => setResult(null)}
        />
      )}

      {result && emailSubmitted && (
        <div className="mt-12 flex flex-col items-center gap-4">
          <Image
            src={result}
            alt={`${dndClass} pet portrait`}
            width={512}
            height={512}
            className="rounded-2xl shadow-lg"
          />
          <a
            href={result}
            download="pet-portrait.png"
            className="bg-red-900 hover:bg-red-950 text-white font-semibold px-8 py-3 rounded-full transition-colors"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Download Portrait
          </a>
        </div>
      )}
    </section>
  );
}
