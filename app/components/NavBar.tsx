"use client";

import Image from "next/image";
import { useState } from "react";

const NAV_LINKS = ["How It Works", "Gallery", "Pricing", "Blog", "FAQ"];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40">
      <nav className="w-full border-b-2 border-amber-900/40 px-6 py-2 flex items-center justify-between relative shadow-md" style={{ backgroundColor: "#f5ecd7" }}>

        {/* Mobile: hamburger on the left */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="lg:hidden p-2 text-red-900"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        {/* Desktop: logo + title on the left */}
        <a href="/" className="hidden lg:flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Dungeons & Doggos logo"
            width={68}
            height={68}
            className="rounded-sm w-[68px] h-[68px]"
          />
          <span
            className="text-xl font-bold text-red-900 tracking-wide"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Dungeons & Doggos
          </span>
        </a>

        {/* Mobile: title + logo centered absolutely */}
        <a href="/" className="lg:hidden absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          <span
            className="text-base font-bold text-red-900 tracking-wide"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Dungeons & Doggos
          </span>
          <Image
            src="/logo.png"
            alt="Dungeons & Doggos logo"
            width={48}
            height={48}
            className="rounded-sm w-[48px] h-[48px]"
          />
        </a>

        {/* Desktop: nav links in the middle */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-10 ml-auto mr-6 xl:mr-10">
          {NAV_LINKS.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex items-center gap-2 text-sm text-stone-600 hover:text-red-900 transition-colors"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              <span className="w-2 h-2 rounded-full border-2 border-stone-400 flex-shrink-0" />
              {label}
            </a>
          ))}
          <a
            href="/sign-in"
            className="flex items-center gap-2 text-sm text-stone-600 hover:text-red-900 transition-colors"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            <span className="w-2 h-2 rounded-full border-2 border-stone-400 flex-shrink-0" />
            Sign In
          </a>
        </div>

        {/* Desktop: CTA on the right */}
        <a
          href="/generate"
          className="hidden lg:block bg-red-900 hover:bg-red-950 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors whitespace-nowrap"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Cast Polymorph
        </a>

      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          className="lg:hidden w-full border-b-2 border-amber-900/40 px-6 py-2 flex flex-col divide-y divide-amber-900/20 shadow-md"
          style={{ backgroundColor: "#f5ecd7" }}
        >
          {[...NAV_LINKS, "Sign In"].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-sm text-stone-600 hover:text-red-900 transition-colors py-2"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              <span className="w-2 h-2 rounded-full border-2 border-stone-400 flex-shrink-0" />
              {label}
            </a>
          ))}
          <a
            href="/generate"
            onClick={() => setMenuOpen(false)}
            className="my-3 bg-red-900 hover:bg-red-950 text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors text-center"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Cast Polymorph
          </a>
        </div>
      )}
    </div>
  );
}
