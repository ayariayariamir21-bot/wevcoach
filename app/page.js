import Link from "next/link";
import ContactForm from "./contact-form";
import { posts as fallbackPosts } from "../data/posts";
import { getPlans, getPosts, getProducts } from "../lib/site";

export const dynamic = "force-dynamic";

const fallbackPlans = [
  {
    name: "Beginner Marathon Plan",
    price: "$29",
    description: "16 weeks, 4 runs/week, perfect for your first 42K.",
    link: "https://buy.stripe.com/your-link",
  },
  {
    name: "Sub-4:00 Plan",
    price: "$49",
    description: "18 weeks with speed work and pacing strategy.",
    link: "https://buy.stripe.com/your-link",
  },
  {
    name: "Sub-3:00 Elite Plan",
    price: "$79",
    description: "20 weeks, advanced workouts + 1 video analysis.",
    link: "https://buy.stripe.com/your-link",
  },
];

const testimonials = [
  {
    name: "Sara M.",
    before: "4:52",
    after: "4:11",
    quote: "The pacing plan changed everything for me.",
  },
  {
    name: "Youssef K.",
    before: "First marathon",
    after: "3:58",
    quote: "Finished strong, no injuries, best decision ever.",
  },
  {
    name: "Lina B.",
    before: "5:10",
    after: "4:30",
    quote: "Weekly feedback kept me consistent.",
  },
];

const videos = ["VIDEO_ID_1", "VIDEO_ID_2"];

function formatPrice(price) {
  return typeof price === "number" ? `$${price}` : price;
}

export default async function Home() {
  // null = database unreachable → fall back to local content (no crash).
  // []   = reachable but empty → friendly empty state below.
  const [dbPlans, dbPosts, dbProducts] = await Promise.all([
    getPlans(),
    getPosts(),
    getProducts(),
  ]);

  const plans = dbPlans === null ? fallbackPlans : dbPlans;
  const posts = dbPosts === null ? fallbackPosts : dbPosts;
  const products = dbProducts === null ? [] : dbProducts;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* 1. Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-gray-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-4">
          <a href="#top" className="text-lg font-extrabold tracking-wide">
            ALEX<span className="text-emerald-400">.COACH</span>
          </a>
          <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm font-medium sm:gap-x-6">
            <a href="#plans" className="transition-colors hover:text-emerald-400">
              Plans
            </a>
            <a href="#shop" className="transition-colors hover:text-emerald-400">
              Shop
            </a>
            <a href="#blog" className="transition-colors hover:text-emerald-400">
              Blog
            </a>
            <a href="#results" className="transition-colors hover:text-emerald-400">
              Results
            </a>
            <a href="#videos" className="transition-colors hover:text-emerald-400">
              Videos
            </a>
            <a
              href="#contact"
              className="rounded bg-emerald-500 px-4 py-2 text-gray-950 transition-colors hover:bg-emerald-400"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* 2. Hero */}
      <header id="top" className="px-4 pt-32 pb-20 text-center">
        <img
          src="/hero.jpg"
          alt="Alex Coach running"
          width={192}
          height={192}
          className="mx-auto h-48 w-48 rounded-full border-4 border-emerald-400 object-cover"
        />
        <h1 className="mx-auto mt-8 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
          Run Your Best <span className="text-emerald-400">Marathon</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-300">
          Marathon coach with 10+ years experience, PR 2:38. I help runners of
          every level train smarter, stay injury-free, and crush race day.
        </p>
        <a
          href="#plans"
          className="mt-8 inline-block rounded bg-emerald-500 px-8 py-3 font-semibold text-gray-950 transition-colors hover:bg-emerald-400"
        >
          See Training Plans
        </a>
      </header>

      {/* 3. Plans */}
      <section id="plans" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
        <h2 className="text-center text-3xl font-bold">
          Training <span className="text-emerald-400">Plans</span>
        </h2>
        {plans.length === 0 ? (
          <p className="mx-auto mt-10 max-w-md rounded-xl border border-gray-800 bg-gray-900 px-6 py-8 text-center text-gray-400">
            New training plans are on the way — check back soon, or send me a
            message below.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan._id || plan.name}
                className="flex flex-col rounded-xl border border-gray-800 bg-gray-900 p-6"
              >
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="mt-2 text-3xl font-extrabold text-emerald-400">
                  {formatPrice(plan.price)}
                </p>
                <p className="mt-3 flex-1 text-gray-300">{plan.description}</p>
                <a
                  href={plan.link || "https://buy.stripe.com/your-link"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 rounded bg-emerald-500 px-6 py-3 text-center font-semibold text-gray-950 transition-colors hover:bg-emerald-400"
                >
                  Buy Now
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Shop */}
        <div id="shop" className="mt-10 scroll-mt-20">
          {products.length > 0 && (
            <div className="grid gap-6 md:grid-cols-3">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="flex flex-col rounded-xl border border-gray-800 bg-gray-900 p-6"
                >
                  <p className="text-3xl">{product.emoji || "🛒"}</p>
                  <h3 className="mt-3 text-xl font-bold">{product.name}</h3>
                  <p className="mt-2 text-2xl font-extrabold text-emerald-400">
                    {formatPrice(product.price)}
                  </p>
                  {product.description && (
                    <p className="mt-3 flex-1 text-gray-300">
                      {product.description}
                    </p>
                  )}
                  {product.link && (
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 rounded bg-emerald-500 px-6 py-3 text-center font-semibold text-gray-950 transition-colors hover:bg-emerald-400"
                    >
                      Get it
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
          {/* Ebook banner */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-xl border border-emerald-400/30 bg-gray-900 px-6 py-6 sm:flex-row">
            <p className="text-lg font-semibold">
              📘 Ebook: Marathon Nutrition Guide
            </p>
            <a
              href="https://gumroad.com/your-product"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded bg-emerald-500 px-6 py-3 font-semibold text-gray-950 transition-colors hover:bg-emerald-400"
            >
              Get it — $9
            </a>
          </div>
        </div>
      </section>

      {/* 4. Blog */}
      <section id="blog" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
        <h2 className="text-center text-3xl font-bold">
          From the <span className="text-emerald-400">Blog</span>
        </h2>
        {posts.length === 0 ? (
          <p className="mx-auto mt-10 max-w-md rounded-xl border border-gray-800 bg-gray-900 px-6 py-8 text-center text-gray-400">
            First articles are on the way — check back soon.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-xl border border-gray-800 bg-gray-900 p-6 transition-colors hover:border-emerald-400/50"
              >
                <p className="text-4xl">{post.emoji}</p>
                <p className="mt-4 flex flex-wrap gap-2 text-xs font-medium">
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-400">
                    {post.date}
                  </span>
                  <span className="rounded-full border border-gray-700 bg-gray-950 px-3 py-1 text-gray-300">
                    {post.readTime || post.read_time}
                  </span>
                </p>
                <h3 className="mt-4 text-xl font-bold">{post.title}</h3>
                <p className="mt-3 text-gray-300">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 5. Results */}
      <section id="results" className="scroll-mt-20 bg-gray-900 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold">
            Runner <span className="text-emerald-400">Results</span>
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-gray-800 bg-gray-950 p-6"
              >
                <p className="text-lg font-bold text-emerald-400">
                  {t.before} → {t.after}
                </p>
                <p className="mt-2 font-semibold">{t.name}</p>
                <p className="mt-3 text-gray-300 italic">“{t.quote}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Videos */}
      <section id="videos" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
        <h2 className="text-center text-3xl font-bold">
          Training <span className="text-emerald-400">Videos</span>
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {videos.map((id) => (
            <div
              key={id}
              className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900"
            >
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${id}`}
                  title="Training video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Contact */}
      <section id="contact" className="scroll-mt-20 px-4 py-20 text-center">
        <h2 className="text-3xl font-bold">Ready to start?</h2>
        <p className="mx-auto mt-3 max-w-md text-gray-300">
          Tell me about your goals and I’ll reply with the best plan for you.
        </p>
        <ContactForm />
      </section>

      {/* 7. Footer */}
      <footer className="border-t border-gray-800 px-4 py-6 text-center text-sm text-gray-400">
        © 2026 Alex Coach — Built with Next.js
      </footer>
    </div>
  );
}
