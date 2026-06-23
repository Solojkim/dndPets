import Image from "next/image";

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b-2 border-amber-900/40 px-6 py-2 flex items-center justify-between shadow-md" style={{ backgroundColor: "#f5ecd7" }}>
      <a href="/" className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="Dungeons & Doggos logo"
          width={68}
          height={68}
          className="rounded-sm"
        />
        <span
          className="text-xl font-bold text-red-900 tracking-wide"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Dungeons & Doggos
        </span>
      </a>

      <div className="hidden md:flex items-center gap-10 ml-auto mr-10">
        {["How It Works", "Gallery", "Pricing", "Blog", "FAQ"].map((label) => (
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

      <a
        href="/generate"
        className="bg-red-900 hover:bg-red-950 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors whitespace-nowrap"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        Cast Polymorph
      </a>
    </nav>
  );
}
