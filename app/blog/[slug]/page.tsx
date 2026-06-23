import { notFound } from "next/navigation";
import { POSTS, getPost, formatDate } from "@/lib/posts";
import type { Metadata } from "next";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Dungeons & Doggos`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `https://dungeonsdoggos.com/blog/${post.slug}`,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: Content } = await import(`@/content/blog/${slug}.mdx`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "Dungeons & Doggos" },
    publisher: {
      "@type": "Organization",
      name: "Dungeons & Doggos",
      url: "https://dungeonsdoggos.com",
    },
    url: `https://dungeonsdoggos.com/blog/${post.slug}`,
    mainEntityOfPage: `https://dungeonsdoggos.com/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-2xl mx-auto px-6 py-16">
        <div
          className="flex items-center gap-3 text-xs text-stone-400 mb-6"
          style={{ fontFamily: "var(--font-lora)" }}
        >
          <a href="/blog" className="hover:text-red-900 transition-colors">← The Scroll</a>
          <span>·</span>
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>

        <div
          className="prose prose-stone max-w-none
            prose-headings:font-bold prose-headings:text-red-900
            prose-h1:text-3xl prose-h1:md:text-4xl
            prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-2
            prose-p:text-stone-600 prose-p:leading-relaxed
            prose-a:text-red-900 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-stone-800
            prose-li:text-stone-600
            prose-hr:border-amber-900/20
            prose-ul:my-4 prose-li:my-0.5"
          style={{ fontFamily: "var(--font-lora)" }}
        >
          <Content />
        </div>

        <div className="mt-16 pt-8 border-t border-amber-900/20">
          <a
            href="/generate"
            className="inline-block bg-red-900 hover:bg-red-950 text-white font-semibold px-8 py-4 rounded-full transition-colors"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Cast Polymorph — Generate Your Portrait →
          </a>
        </div>
      </article>
    </>
  );
}
