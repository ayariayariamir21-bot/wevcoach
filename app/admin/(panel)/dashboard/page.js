"use client";

import { useEffect, useState } from "react";

const cards = [
  { key: "products", label: "Products", emoji: "📦" },
  { key: "plans", label: "Plans", emoji: "📋" },
  { key: "posts", label: "Posts", emoji: "📝" },
  { key: "unreadMessages", label: "Unread Messages", emoji: "✉️" },
  { key: "orders", label: "Orders", emoji: "🛒" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/stats")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load stats");
        setStats(await res.json());
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Dash<span className="text-emerald-400">board</span>
      </h1>
      {error && (
        <p className="mt-4 rounded border border-red-500/40 bg-red-950 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}
      {!stats && !error && <p className="mt-6 text-gray-400">Loading...</p>}
      {stats && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.key}
              className="rounded-xl border border-gray-800 bg-gray-900 p-6"
            >
              <p className="text-3xl">{card.emoji}</p>
              <p className="mt-3 text-4xl font-extrabold text-emerald-400">
                {stats[card.key] ?? 0}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-300">
                {card.label}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
