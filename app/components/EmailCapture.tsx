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
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-gray-900">Your portrait is almost ready</h3>
        <p className="mt-2 text-gray-600 text-sm">
          We're putting the finishing touches on the generator. Drop your email
          and we'll notify you the moment it's ready.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-purple-500 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-purple-700 text-white font-semibold px-8 py-3 rounded-full hover:bg-purple-800 transition-colors"
          >
            Notify Me
          </button>
        </form>
      </div>
    </div>
  );
}
