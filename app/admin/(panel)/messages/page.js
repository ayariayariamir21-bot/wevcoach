"use client";

import { useEffect, useState } from "react";

export default function AdminMessages() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch("/api/messages")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load messages");
        setItems(await res.json());
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  async function load() {
    try {
      const res = await fetch("/api/messages");
      if (!res.ok) throw new Error("Failed to load messages");
      setItems(await res.json());
    } catch (err) {
      setError(err.message);
    }
  }

  async function markRead(message) {
    if (message.read) return;
    setError("");
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });
      if (!res.ok) throw new Error("Failed to mark as read");
      setItems((list) =>
        list.map((m) => (m._id === message._id ? { ...m, read: true } : m))
      );
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id, e) {
    e.stopPropagation();
    if (!window.confirm("Delete this message?")) return;
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setSuccess("Message deleted.");
      setItems((list) => list.filter((m) => m._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  const unread = items.filter((m) => !m.read).length;

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Messages{" "}
        {unread > 0 && (
          <span className="ml-2 rounded-full bg-emerald-500 px-3 py-1 align-middle text-sm font-bold text-gray-950">
            {unread} new
          </span>
        )}
      </h1>

      {error && (
        <p className="mt-4 rounded border border-red-500/40 bg-red-950 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}
      {success && (
        <p className="mt-4 rounded border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
          {success}
        </p>
      )}

      {loading ? (
        <p className="mt-6 text-gray-400">Loading...</p>
      ) : items.length === 0 ? (
        <p className="mt-6 text-gray-400">No messages yet.</p>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          {items.map((m) => (
            <div
              key={m._id}
              onClick={() => markRead(m)}
              className={`cursor-pointer rounded-xl border bg-gray-900 p-5 transition-colors hover:border-gray-600 ${
                m.read ? "border-gray-800" : "border-emerald-400"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-bold">
                  {m.name || "Anonymous"}{" "}
                  <span className="ml-1 text-sm font-normal text-gray-400">
                    {m.email}
                  </span>
                </p>
                <div className="flex items-center gap-3">
                  {!m.read && (
                    <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-bold text-gray-950">
                      NEW
                    </span>
                  )}
                  <button
                    onClick={(e) => handleDelete(m._id, e)}
                    className="rounded border border-red-500/40 px-3 py-1 text-sm text-red-300 transition-colors hover:bg-red-950"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="mt-2 text-gray-300">{m.body}</p>
              {m.createdAt && (
                <p className="mt-2 text-xs text-gray-500">
                  {new Date(m.createdAt).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
