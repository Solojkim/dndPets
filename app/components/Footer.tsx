export default function Footer() {
  return (
    <footer className="px-6 py-12" style={{ backgroundColor: "#2c1810" }}>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

        <div className="flex flex-col items-center md:items-start gap-2">
          <span
            className="text-lg font-bold text-amber-100"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Dungeons & Doggies
          </span>
          <p
            className="text-sm text-amber-900/70"
            style={{ fontFamily: "var(--font-lora)" }}
          >
            Fantasy portraits for good boys.
          </p>
        </div>

        <div className="flex items-center gap-8">
          <a
            href="#"
            className="text-sm text-amber-200/70 hover:text-amber-100 transition-colors"
            style={{ fontFamily: "var(--font-lora)" }}
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-sm text-amber-200/70 hover:text-amber-100 transition-colors"
            style={{ fontFamily: "var(--font-lora)" }}
          >
            Contact
          </a>
          <a
            href="#"
            className="text-sm text-amber-200/70 hover:text-amber-100 transition-colors"
            style={{ fontFamily: "var(--font-lora)" }}
          >
            Reddit
          </a>
          <a
            href="#"
            className="text-sm text-amber-200/70 hover:text-amber-100 transition-colors"
            style={{ fontFamily: "var(--font-lora)" }}
          >
            TikTok
          </a>
        </div>

        <p
          className="text-xs text-amber-900/50"
          style={{ fontFamily: "var(--font-lora)" }}
        >
          © 2026 Dungeons & Doggies
        </p>

      </div>
    </footer>
  );
}
