import Image from "next/image";

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b-2 border-amber-900/40 px-6 py-1 flex items-center justify-between shadow-md" style={{ backgroundColor: "#f5ecd7" }}>
      <div className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="Dungeons & Doggies logo"
          width={72}
          height={72}
          className="rounded-sm"
        />
        <span
          className="text-xl font-bold text-red-900 tracking-wide"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Dungeons & Doggies
        </span>
      </div>

      <div className="hidden md:flex items-center gap-12">
        <a href="#how-it-works" className="text-sm text-stone-600 hover:text-red-900 transition-colors" style={{ fontFamily: "var(--font-cinzel)" }}>How It Works</a>
        <a href="#examples" className="text-sm text-stone-600 hover:text-red-900 transition-colors" style={{ fontFamily: "var(--font-cinzel)" }}>Examples</a>
        <a href="#faq" className="text-sm text-stone-600 hover:text-red-900 transition-colors" style={{ fontFamily: "var(--font-cinzel)" }}>FAQ</a>
      </div>

      <a
        href="#generator"
        className="bg-red-900 hover:bg-red-950 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        Create Your Portrait
      </a>
    </nav>
  );
}
