import Link from "next/link";
import { notFound } from "next/navigation";
import { posts as fallbackPosts, getPost as getLocalPost } from "../../../data/posts";
import { getPosts, getPostBySlug } from "../../../lib/site";

export const dynamic = "force-dynamic";

// DB first, local file as fallback (works with no database configured).
async function findPost(slug) {
  const dbPost = await getPostBySlug(slug);
  if (dbPost) return dbPost;
  return getLocalPost(slug) || null;
}

function toParagraphs(content) {
  if (Array.isArray(content)) return content;
  if (typeof content === "string" && content.length > 0) {
    return content.split(/\n\n+/);
  }
  return [];
}

export async function generateStaticParams() {
  const dbPosts = await getPosts();
  const source = dbPosts === null || dbPosts.length === 0 ? fallbackPosts : dbPosts;
  return source.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await findPost(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: `${post.title} — Alex Coach`,
    description: post.excerpt,
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const post = await findPost(slug);
  if (!post) notFound();

  const paragraphs = toParagraphs(post.content);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <main className="mx-auto max-w-2xl px-4 py-16">
        <Link
          href="/#blog"
          className="text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
        >
          ← Back to Blog
        </Link>
        <p className="mt-8 text-5xl">{post.emoji}</p>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-400">
            {post.date}
          </span>
          <span className="rounded-full border border-gray-700 bg-gray-900 px-3 py-1 text-gray-300">
            {post.readTime || post.read_time}
          </span>
        </p>
        {paragraphs.length === 0 ? (
          <p className="mt-8 rounded-xl border border-gray-800 bg-gray-900 px-6 py-8 text-center text-gray-400">
            Full article coming soon.
          </p>
        ) : (
          <div className="mt-8 flex flex-col gap-6 text-lg leading-relaxed text-gray-300">
            {paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}
        <Link
          href="/#blog"
          className="mt-12 inline-block rounded bg-emerald-500 px-6 py-3 font-semibold text-gray-950 transition-colors hover:bg-emerald-400"
        >
          ← Back to Blog
        </Link>
      </main>
    </div>
  );
}
