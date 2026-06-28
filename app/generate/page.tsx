"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import EmailCapture from "../components/EmailCapture";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

// ─── Quiz data ────────────────────────────────────────────────────────────────

const QUESTIONS = [
  // Energy axis
  { axis: "energy", question: "After eating, your pet usually…", options: [
    { label: "Finds a spot and settles in", value: "calm" },
    { label: "Immediately wants to play or explore", value: "active" },
  ]},
  { axis: "energy", question: "When you grab the leash or a toy, your pet…", options: [
    { label: "Walks over calmly", value: "calm" },
    { label: "Goes absolutely feral with excitement", value: "active" },
  ]},
  { axis: "energy", question: "On a lazy afternoon, your pet is most likely…", options: [
    { label: "Napping or watching the room", value: "calm" },
    { label: "Pacing, nudging you, looking for stimulation", value: "active" },
  ]},
  { axis: "energy", question: "Your pet's default speed around the house is…", options: [
    { label: "Slow and deliberate", value: "calm" },
    { label: "Full send, always", value: "active" },
  ]},
  // Social axis
  { axis: "social", question: "When you leave the room, your pet…", options: [
    { label: "Stays put, unbothered", value: "independent" },
    { label: "Follows you", value: "bonded" },
  ]},
  { axis: "social", question: "With strangers, your pet tends to…", options: [
    { label: "Observe from a distance, warm up slowly", value: "independent" },
    { label: "Go say hi immediately", value: "bonded" },
  ]},
  { axis: "social", question: "Your pet's favorite spot is…", options: [
    { label: "Somewhere quiet and their own", value: "independent" },
    { label: "Wherever you are", value: "bonded" },
  ]},
  { axis: "social", question: "During downtime, your pet prefers…", options: [
    { label: "Doing their own thing nearby", value: "independent" },
    { label: "Being in contact with you or another pet", value: "bonded" },
  ]},
  // Approach axis
  { axis: "approach", question: "When something new appears in the house, your pet…", options: [
    { label: "Sniffs and investigates immediately on their own terms", value: "intuitive" },
    { label: "Looks to you for a cue first", value: "trained" },
  ]},
  { axis: "approach", question: "Your pet's reaction to rules and boundaries is…", options: [
    { label: "Tests them constantly", value: "intuitive" },
    { label: "Generally respects them", value: "trained" },
  ]},
  { axis: "approach", question: "When excited, your pet…", options: [
    { label: "Acts first, thinks never", value: "intuitive" },
    { label: "Can hold it together if they have to", value: "trained" },
  ]},
  { axis: "approach", question: "How does your pet handle a challenge (stuck toy, blocked path)?", options: [
    { label: "Tries random things until something works", value: "intuitive" },
    { label: "Pauses, seems to think, then tries", value: "trained" },
  ]},
];

// ─── Class mapping ────────────────────────────────────────────────────────────

const CLASS_MAP: Record<string, { name: string; description: string; portrait: string }> = {
  "calm-independent-intuitive": {
    name: "Druid",
    description: "Calm, independent, and deeply intuitive — your dog follows their instincts and marches to the beat of their own paws. They're in tune with the world around them in ways you can't fully explain.",
    portrait: "/druidHeppi.webp",
  },
  "calm-independent-trained": {
    name: "Ranger",
    description: "Calm, self-reliant, and methodical — your dog is a quiet observer who knows exactly what they want and how to get it. Patient, precise, and always watching.",
    portrait: "/rangerHeppi.png",
  },
  "calm-bonded-intuitive": {
    name: "Rogue",
    description: "Calm on the surface, bonded at heart, and driven by pure instinct — your dog is a loyal shadow who moves quietly and acts on gut feeling. Never the loudest in the room, always the most aware.",
    portrait: "/heppiEagerBardSquare.png",
  },
  "calm-bonded-trained": {
    name: "Cleric",
    description: "Gentle, devoted, and disciplined — your dog is your faithful companion who always knows the right thing to do. Steady, grounded, and endlessly reliable.",
    portrait: "/clericHeppi.png",
  },
  "active-independent-intuitive": {
    name: "Barbarian",
    description: "Pure energy, pure instinct, pure independence — your dog charges into life with zero hesitation. Loud, bold, and completely unfiltered. No plan. No rules. Just vibes.",
    portrait: "/barbHeppi.png",
  },
  "active-independent-trained": {
    name: "Wizard",
    description: "Active and analytical — your dog is always busy figuring things out on their own terms. High energy but surprisingly deliberate. They've probably already solved a problem you didn't know you had.",
    portrait: "/wizardHeppi.png",
  },
  "active-bonded-intuitive": {
    name: "Bard",
    description: "The life of every room they enter — your dog's energy is infectious, their instincts are spot-on, and their loyalty runs deep. Everyone loves them. They know it.",
    portrait: "/heppiEagerBardSquare.png",
  },
  "active-bonded-trained": {
    name: "Paladin",
    description: "Active, devoted, and disciplined — your dog is a noble guardian through and through. They show up, they follow through, and they'd take a hit for you without thinking twice.",
    portrait: "/paladinHeppi.png",
  },
};

const DND_CLASSES = ["wizard","paladin","barbarian","ranger","rogue","cleric","druid","bard"];

// ─── Scoring ──────────────────────────────────────────────────────────────────

function getResult(answers: Record<number, string>): string {
  const energy = [0,1,2,3].filter(i => answers[i] === "calm").length >= 2 ? "calm" : "active";
  const social = [4,5,6,7].filter(i => answers[i] === "independent").length >= 2 ? "independent" : "bonded";
  const approach = [8,9,10,11].filter(i => answers[i] === "intuitive").length >= 2 ? "intuitive" : "trained";
  return `${energy}-${social}-${approach}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

type Step = "quiz" | "result" | "generate" | "done";

export default function GeneratePage() {
  const [step, setStep] = useState<Step>("quiz");
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [quizError, setQuizError] = useState<string | null>(null);
  const [resultKey, setResultKey] = useState<string>("");

  // Refs hold always-current values so setTimeout callbacks never read stale closures
  const answersRef = useRef<Record<number, string>>({});
  const questionIdxRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Generator state
  const [photo, setPhoto] = useState<File | null>(null);
  const [dndClass, setDndClass] = useState<string>("");
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!photo) { setPhotoPreviewUrl(null); return; }
    const url = URL.createObjectURL(photo);
    setPhotoPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [photo]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  // ── Quiz helpers ───────────────────────────────────────────────────────────

  function syncQuestion(idx: number) {
    questionIdxRef.current = idx;
    setQuestionIdx(idx);
  }

  function syncAnswers(updated: Record<number, string>) {
    answersRef.current = updated;
    setAnswers(updated);
  }

  function resetQuiz() {
    if (timerRef.current) clearTimeout(timerRef.current);
    answersRef.current = {};
    questionIdxRef.current = 0;
    setAnswers({});
    setQuestionIdx(0);
    setResultKey("");
    setQuizError(null);
  }

  // ── Quiz handlers ──────────────────────────────────────────────────────────

  const selectedAnswer = answers[questionIdx] ?? null;

  function advanceQuestion() {
    const idx = questionIdxRef.current;
    const ans = answersRef.current;
    setQuizError(null);
    if (idx >= QUESTIONS.length - 1) {
      const firstMissing = Array.from({ length: QUESTIONS.length }, (_, i) => i)
        .find(i => !ans[i]);
      if (firstMissing !== undefined) {
        setQuizError("Please answer all questions before finishing.");
        syncQuestion(firstMissing);
        return;
      }
      const key = getResult(ans);
      setResultKey(key);
      setDndClass(CLASS_MAP[key].name.toLowerCase());
      setStep("result");
    } else {
      syncQuestion(idx + 1);
    }
  }

  function handleSelect(value: string) {
    const updated = { ...answersRef.current, [questionIdxRef.current]: value };
    syncAnswers(updated);
    setQuizError(null);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(advanceQuestion, 150);
  }

  function handleNext() {
    if (timerRef.current) clearTimeout(timerRef.current);
    advanceQuestion();
  }

  function handleBack() {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (questionIdxRef.current === 0) return;
    setQuizError(null);
    syncQuestion(questionIdxRef.current - 1);
  }

  function handleSkip() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setStep("generate");
  }

  // ── Download handler ──────────────────────────────────────────────────────

  async function handleDownload() {
    if (!generatedUrl) return;
    try {
      const res = await fetch(generatedUrl);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "pet-portrait.png";
      a.click();
      URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(generatedUrl, "_blank");
    }
  }

  // ── Generate handler ───────────────────────────────────────────────────────

  async function handleGenerate() {
    if (!photo || !dndClass) return;
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("class", dndClass);

    const response = await fetch("/api/generate", { method: "POST", body: formData });

    let data;
    try { data = await response.json(); }
    catch { setError("Something went wrong. Please try again."); setIsLoading(false); return; }

    if (!response.ok) {
      setError(data?.error ?? "Something went wrong. Please try again.");
      setIsLoading(false);
      return;
    }

    setGeneratedUrl(data.imageUrl);
    setIsLoading(false);
    setStep("done");
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#f5ecd7" }}>
    <NavBar />
    <main className="flex-1 flex flex-col items-center justify-start px-6 pt-8 pb-16 sm:pt-10 lg:pt-14">

      {/* ── Quiz step ── */}
      {step === "quiz" && (
        <div className="w-full max-w-lg flex flex-col items-center text-center">

          {/* Progress */}
          <p className="text-xs text-stone-400 tracking-widest uppercase mb-6" style={{ fontFamily: "var(--font-cinzel)" }}>
            Question {questionIdx + 1} of {QUESTIONS.length}
          </p>
          <div className="w-full h-1 bg-amber-900/10 rounded-full mb-10">
            <div
              className="h-1 bg-red-900 rounded-full transition-all duration-300"
              style={{ width: `${((questionIdx + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-red-900 mb-10" style={{ fontFamily: "var(--font-cinzel)" }}>
            {QUESTIONS[questionIdx].question}
          </h1>

          <div className="w-full flex flex-col gap-4">
            {QUESTIONS[questionIdx].options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`w-full px-6 py-5 rounded-2xl border-2 text-left text-stone-700 transition-all text-base font-medium ${
                  selectedAnswer === opt.value
                    ? "border-red-900 bg-red-900/10"
                    : "border-amber-900/20 hover:border-red-900 hover:bg-red-900/5"
                }`}
                style={{ fontFamily: "var(--font-lora)", backgroundColor: selectedAnswer === opt.value ? undefined : "#ede0c4" }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={handleBack}
              disabled={questionIdx === 0}
              className="px-6 py-3 rounded-full border-2 border-amber-900/30 text-stone-500 font-semibold transition-all hover:border-red-900 hover:text-red-900 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              ← Back
            </button>
            <button
              onClick={handleNext}
              className="px-10 py-3 rounded-full bg-red-900 hover:bg-red-950 text-white font-semibold transition-colors"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Next →
            </button>
          </div>

          {quizError && (
            <p className="mt-4 text-sm text-red-800" style={{ fontFamily: "var(--font-lora)" }}>
              {quizError}
            </p>
          )}

          <button
            onClick={handleSkip}
            className="mt-8 text-xs text-stone-400 hover:text-stone-600 transition-colors underline underline-offset-2"
            style={{ fontFamily: "var(--font-lora)" }}
          >
            Skip quiz — I'll pick my class manually
          </button>

        </div>
      )}

      {/* ── Result step ── */}
      {step === "result" && resultKey && (() => {
        const result = CLASS_MAP[resultKey];
        return (
          <div className="w-full max-w-lg flex flex-col items-center text-center">
            <p className="text-xs text-stone-400 tracking-widest uppercase mb-4" style={{ fontFamily: "var(--font-cinzel)" }}>
              Your dog is a…
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-red-900 mb-6" style={{ fontFamily: "var(--font-cinzel)" }}>
              {result.name}
            </h1>
            <div className="relative w-56 h-56 rounded-2xl overflow-hidden shadow-xl mb-8">
              <Image src={result.portrait} alt={result.name} fill className="object-cover" />
            </div>
            <p className="text-base text-stone-600 leading-relaxed mb-10 max-w-sm" style={{ fontFamily: "var(--font-lora)" }}>
              {result.description}
            </p>
            <button
              onClick={() => setStep("generate")}
              className="bg-red-900 hover:bg-red-950 text-white font-semibold px-10 py-4 rounded-full transition-colors shadow-lg"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Cast Polymorph → {result.name}
            </button>
            <button
              onClick={() => { resetQuiz(); setStep("quiz"); }}
              className="mt-4 text-xs text-stone-400 hover:text-stone-600 transition-colors underline underline-offset-2"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              Retake the quiz
            </button>
          </div>
        );
      })()}

      {/* ── Generate step ── */}
      {step === "generate" && (
        <div className="w-full max-w-md flex flex-col items-center">
          <h1 className="text-3xl font-bold text-red-900 mb-2 text-center" style={{ fontFamily: "var(--font-cinzel)" }}>
            Create Your Portrait
          </h1>
          <p className="text-sm text-stone-500 mb-6 text-center" style={{ fontFamily: "var(--font-lora)" }}>
            Upload a photo of your dog and we'll transform them.
          </p>

          <div className="w-full flex flex-col gap-6">
            <div className="flex flex-col items-center">
              <label className="text-sm font-semibold mb-3 text-stone-700" style={{ fontFamily: "var(--font-lora)" }}>
                Photo of your dog
              </label>
              <label className="cursor-pointer">
                <span className="inline-block py-2 px-6 rounded-full text-sm font-semibold bg-red-900 text-white hover:bg-red-950 transition-colors" style={{ fontFamily: "var(--font-cinzel)" }}>
                  Choose File
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
                  className="sr-only"
                />
              </label>
              {photo && (
                <p className="mt-2 text-xs text-stone-400" style={{ fontFamily: "var(--font-lora)" }}>{photo.name}</p>
              )}
              {photoPreviewUrl && (
                <div className="mt-4 flex flex-col items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photoPreviewUrl}
                    alt="Your dog"
                    className="w-48 h-48 object-cover rounded-2xl shadow-md border-2 border-amber-900/20"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-stone-700" style={{ fontFamily: "var(--font-lora)" }}>
                DnD Class
              </label>
              <select
                value={dndClass}
                onChange={(e) => setDndClass(e.target.value)}
                className="block w-full rounded-lg border border-amber-900/30 px-4 py-3 text-stone-800 focus:border-red-900 focus:outline-none"
                style={{ backgroundColor: "#f5ecd7", fontFamily: "var(--font-lora)" }}
              >
                <option value="">Select a class…</option>
                {DND_CLASSES.map(c => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!photo || !dndClass || isLoading}
              className="bg-red-900 hover:bg-red-950 text-white text-lg font-semibold px-10 py-4 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Generating…
                </span>
              ) : "Generate Portrait"}
            </button>

            {error && <p className="text-sm text-red-800 text-center">{error}</p>}
          </div>
        </div>
      )}

      {/* ── Done step ── */}
      {step === "done" && generatedUrl && (
        <div className="flex flex-col items-center gap-6">
          {emailSubmitted ? (
            <>
              <h1 className="text-3xl font-bold text-red-900" style={{ fontFamily: "var(--font-cinzel)" }}>
                Your Portrait
              </h1>
              <Image
                src={generatedUrl}
                alt="Generated DnD pet portrait"
                width={512}
                height={512}
                className="rounded-2xl shadow-xl"
              />
              <button
                onClick={handleDownload}
                className="bg-red-900 hover:bg-red-950 text-white font-semibold px-8 py-3 rounded-full transition-colors"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                Download Portrait
              </button>
              <button
                onClick={() => { setGeneratedUrl(null); setEmailSubmitted(false); setStep("generate"); }}
                className="text-sm text-stone-500 hover:text-red-900 underline underline-offset-2 transition-colors"
                style={{ fontFamily: "var(--font-lora)" }}
              >
                Try again
              </button>
              <button
                onClick={() => { resetQuiz(); setPhoto(null); setDndClass(""); setGeneratedUrl(null); setEmailSubmitted(false); setStep("quiz"); }}
                className="text-xs text-stone-400 hover:text-stone-600 underline underline-offset-2 transition-colors"
                style={{ fontFamily: "var(--font-lora)" }}
              >
                Start over
              </button>
            </>
          ) : (
            <EmailCapture
              onSubmit={(email) => { console.log("Email:", email); setEmailSubmitted(true); }}
              onClose={() => setEmailSubmitted(true)}
            />
          )}
        </div>
      )}

    </main>
    {step === "done" && <Footer />}
    </div>
  );
}
