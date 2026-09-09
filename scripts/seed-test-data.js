// Seed sample data for testing the admin API in Postman.
// Only inserts into collections that are currently empty (safe to re-run).
//
// Requires MONGODB_URI in .env.local.
// Run with:  node scripts/seed-test-data.js
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: ".env.local" });

const { MONGODB_URI } = process.env;
if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI in .env.local");
  process.exit(1);
}

const Product = mongoose.model(
  "Product",
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      tag: String,
      emoji: String,
      description: String,
      link: String,
    },
    { timestamps: true }
  )
);
const Plan = mongoose.model(
  "Plan",
  new mongoose.Schema(
    { name: String, price: Number, description: String, link: String },
    { timestamps: true }
  )
);
const Post = mongoose.model(
  "Post",
  new mongoose.Schema(
    {
      slug: { type: String, unique: true, required: true },
      title: String,
      emoji: String,
      excerpt: String,
      content: String,
      date: String,
      read_time: String,
    },
    { timestamps: true }
  )
);
const Message = mongoose.model(
  "Message",
  new mongoose.Schema(
    { name: String, email: String, body: String, read: Boolean },
    { timestamps: true }
  )
);

await mongoose.connect(MONGODB_URI);

async function seedIfEmpty(model, label, docs) {
  const count = await model.countDocuments();
  if (count > 0) {
    console.log(`${label}: already has ${count} docs — skipped.`);
    return;
  }
  await model.insertMany(docs);
  console.log(`${label}: inserted ${docs.length} sample docs.`);
}

await seedIfEmpty(Product, "products", [
  {
    name: "Marathon Nutrition Guide",
    price: 9,
    tag: "ebook",
    emoji: "📘",
    description: "Race-week fueling plan, 40 pages.",
    link: "https://gumroad.com/your-product",
  },
  {
    name: "Alex's Racing Shoes",
    price: 180,
    tag: "gear",
    emoji: "👟",
    description: "The carbon-plated shoes I race in.",
    link: "https://example.com/shoes",
  },
]);

await seedIfEmpty(Plan, "plans", [
  {
    name: "Beginner Marathon Plan",
    price: 29,
    description: "16 weeks, 4 runs/week, perfect for your first 42K.",
    link: "https://buy.stripe.com/your-link",
  },
]);

await seedIfEmpty(Post, "posts", [
  {
    slug: "how-to-pace-your-first-marathon",
    title: "How to Pace Your First Marathon",
    emoji: "🏃",
    excerpt: "Negative-split strategy for first-timers.",
    content: "Start slower than goal pace. Finish faster. Full article coming soon.",
    date: "2026-08-20",
    read_time: "5 min read",
  },
]);

await seedIfEmpty(Message, "messages", [
  {
    name: "Test Runner",
    email: "runner@example.com",
    body: "Hi Alex, which plan fits a 4:30 goal?",
    read: false,
  },
]);

await mongoose.disconnect();
console.log("Done.");
