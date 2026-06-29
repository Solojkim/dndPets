"use client";

import { useState } from "react";

interface EmailCaptureProps {
  onSubmit: (email: string) => void;
  onClose: () => void;
}

export default function EmailCapture({ onSubmit, onClose }: EmailCaptureProps) {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email) onSubmit(email);
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        className="rounded-2xl p-8 w-full max-w-md mx-4 text-center border border-amber-900/20 shadow-xl"
        style={{ backgroundColor: "#f5ecd7" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          className="text-xl font-bold text-red-900"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Your Portrait is Ready!
        </h3>
        <p
          className="mt-2 text-sm text-stone-600"
          style={{ fontFamily: "var(--font-lora)" }}
        >
          Enter your email to unlock your portrait.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full rounded-lg border border-amber-900/30 px-4 py-3 text-stone-800 focus:border-red-900 focus:outline-none"
            style={{ backgroundColor: "#f5ecd7", fontFamily: "var(--font-lora)" }}
          />
          <button
            type="submit"
            className="bg-red-900 hover:bg-red-950 text-white font-semibold px-8 py-3 rounded-full transition-colors"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Unlock My Portrait
          </button>
        </form>
      </div>
    </div>
  );
}
