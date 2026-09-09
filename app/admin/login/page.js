"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  // Already logged in? Skip the form.
  useEffect(() => {
    fetch("/api/auth/me").then((res) => {
      if (res.ok) router.replace("/admin/dashboard");
    });
  }, [router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Login failed");
      }
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4 text-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border border-gray-800 bg-gray-900 p-8"
      >
        <p className="text-center text-lg font-extrabold tracking-wide">
          ALEX<span className="text-emerald-400">.COACH</span>
        </p>
        <h1 className="mt-2 text-center text-2xl font-bold">Admin Login</h1>
        <label className="mt-6 flex flex-col gap-1 text-sm font-medium">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="youremail@gmail.com"
            className="rounded border border-gray-700 bg-gray-950 px-4 py-3 text-gray-100 placeholder-gray-500 outline-none focus:border-emerald-400"
          />
        </label>
        <label className="mt-4 flex flex-col gap-1 text-sm font-medium">
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="rounded border border-gray-700 bg-gray-950 px-4 py-3 text-gray-100 placeholder-gray-500 outline-none focus:border-emerald-400"
          />
        </label>
        {error && (
          <p className="mt-4 rounded border border-red-500/40 bg-red-950 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={sending}
          className="mt-6 w-full rounded bg-emerald-500 px-8 py-3 font-semibold text-gray-950 transition-colors hover:bg-emerald-400 disabled:opacity-60"
        >
          {sending ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}
