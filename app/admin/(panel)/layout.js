"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin/dashboard", label: "📊 Dashboard" },
  { href: "/admin/products", label: "📦 Products" },
  { href: "/admin/plans", label: "📋 Plans" },
  { href: "/admin/posts", label: "📝 Posts" },
  { href: "/admin/messages", label: "✉️ Messages" },
  { href: "/admin/orders", label: "🛒 Orders" },
];

export default function PanelLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) router.replace("/admin/login");
        else setReady(true);
      })
      .catch(() => router.replace("/admin/login"));
  }, [router]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100 md:flex-row">
      {/* Top bar on mobile, sidebar on desktop */}
      <nav className="border-b border-gray-800 bg-gray-900 px-4 py-4 md:min-h-screen md:w-64 md:border-r md:border-b-0">
        <p className="text-lg font-extrabold tracking-wide">
          ALEX<span className="text-emerald-400">.COACH</span>
          <span className="ml-2 text-xs font-medium text-gray-400">admin</span>
        </p>
        <div className="mt-3 flex gap-2 overflow-x-auto md:mt-6 md:flex-col">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors hover:bg-gray-800 ${
                pathname === link.href
                  ? "bg-gray-800 text-emerald-400"
                  : "text-gray-300"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="rounded px-4 py-2 text-left text-sm font-medium whitespace-nowrap text-red-300 transition-colors hover:bg-gray-800"
          >
            🚪 Logout
          </button>
        </div>
      </nav>
      <main className="flex-1 px-4 py-8 md:px-8">{children}</main>
    </div>
  );
}
