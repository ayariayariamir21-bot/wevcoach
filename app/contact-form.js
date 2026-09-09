"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorDetail, setErrorDetail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorDetail("");
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, body: message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorDetail(err.message);
    }
  }

  if (status === "success") {
    return (
      <p className="mx-auto mt-8 max-w-md rounded-xl border border-emerald-400/30 bg-gray-900 px-6 py-4 font-semibold text-emerald-400">
        Message sent! I&apos;ll reply within 24h.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 flex max-w-md flex-col gap-4 text-left"
    >
      <label className="flex flex-col gap-1 text-sm font-medium">
        Name
        <input
          type="text"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="rounded border border-gray-700 bg-gray-950 px-4 py-3 text-gray-100 placeholder-gray-500 outline-none focus:border-emerald-400"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium">
        Email
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="rounded border border-gray-700 bg-gray-950 px-4 py-3 text-gray-100 placeholder-gray-500 outline-none focus:border-emerald-400"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium">
        Message
        <textarea
          name="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me about your goals..."
          rows={5}
          className="rounded border border-gray-700 bg-gray-950 px-4 py-3 text-gray-100 placeholder-gray-500 outline-none focus:border-emerald-400"
        />
      </label>
      {status === "error" && (
        <p className="rounded border border-red-500/40 bg-red-950 px-4 py-3 text-sm text-red-300">
          Something went wrong{errorDetail ? `: ${errorDetail}` : ". Please try again."}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded bg-emerald-500 px-8 py-3 font-semibold text-gray-950 transition-colors hover:bg-emerald-400 disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
