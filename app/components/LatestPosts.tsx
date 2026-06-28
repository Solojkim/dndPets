import Link from "next/link";
import { POSTS, formatDate } from "@/lib/posts";

export default function LatestPosts() {
  const latest = POSTS.slice(0, 3);

  return (
    <section id="blog" className="scroll-mt-16 md:scroll-mt-20 px-6 py-16 md:py-24" style={{ backgroundColor: "#f5ecd7" }}>
      <h2
        className="text-2xl md:text-3xl font-bold text-red-900 text-center mb-4"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        The Scroll
      </h2>
      <p
        className="text-center text-stone-600 text-sm md:text-base mb-12 max-w-xl mx-auto"
        style={{ fontFamily: "var(--font-lora)" }}
      >
        Guides, lore, and everything dogs & DnD.
      </p>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {latest.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-3 p-6 rounded-2xl border border-amber-900/20 hover:border-red-900/40 transition-colors"
            style={{ backgroundColor: "#ede0c4" }}
          >
            <div className="text-xs text-stone-400" style={{ fontFamily: "var(--font-lora)" }}>
              {formatDate(post.date)} · {post.readingTime}
            </div>
            <h3
              className="text-base font-bold text-red-900 group-hover:underline underline-offset-4 leading-snug"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              {post.title}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed" style={{ fontFamily: "var(--font-lora)" }}>
              {post.description}
            </p>
            <span className="text-xs text-red-900 font-semibold mt-auto" style={{ fontFamily: "var(--font-cinzel)" }}>
              Read →
            </span>
          </Link>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="/blog"
          className="inline-block border-2 border-red-900 text-red-900 hover:bg-red-900 hover:text-white font-semibold px-8 py-3 rounded-full transition-colors text-sm"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          View All Posts
        </Link>
      </div>
    </section>
  );
}
