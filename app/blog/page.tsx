import Link from "next/link";
import { POSTS, formatDate } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Dungeons & Doggos",
  description: "Tips, guides, and lore about DnD dog personalities, AI portrait generation, and everything in between.",
};

export default function BlogPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:px-8">
      <h1
        className="text-3xl md:text-4xl font-bold text-red-900 mb-3 text-center"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        The Scroll
      </h1>
      <p
        className="text-stone-500 mb-6 text-base text-center"
        style={{ fontFamily: "var(--font-lora)" }}
      >
        Guides, lore, and everything dogs & DnD.
      </p>

      <div className="flex flex-col rounded-xl overflow-hidden border border-amber-900/20">
        {POSTS.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group py-8 px-6 flex flex-col gap-2 hover:opacity-80 transition-opacity"
            style={{ backgroundColor: i % 2 === 0 ? "#f5ecd7" : "#ede0c4" }}
          >
            <div className="flex items-center gap-3 text-xs text-stone-400" style={{ fontFamily: "var(--font-lora)" }}>
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>{post.readingTime}</span>
            </div>
            <h2
              className="text-xl font-bold text-red-900 group-hover:underline underline-offset-4"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              {post.title}
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-lora)" }}>
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
