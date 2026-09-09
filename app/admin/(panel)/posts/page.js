"use client";

import { useEffect, useState } from "react";

const emptyForm = {
  title: "",
  slug: "",
  emoji: "",
  excerpt: "",
  content: "",
  date: "",
  read_time: "",
};

const inputClass =
  "rounded border border-gray-700 bg-gray-950 px-4 py-2 text-gray-100 placeholder-gray-500 outline-none focus:border-emerald-400";

export default function AdminPosts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingSlug, setEditingSlug] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/posts")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load posts");
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
      const res = await fetch("/api/posts");
      if (!res.ok) throw new Error("Failed to load posts");
      setItems(await res.json());
    } catch (err) {
      setError(err.message);
    }
  }

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function openAdd() {
    setEditingSlug(null);
    setForm(emptyForm);
    setSuccess("");
    setError("");
    setShowForm(true);
  }

  function openEdit(post) {
    setEditingSlug(post.slug);
    setForm({
      title: post.title || "",
      slug: post.slug || "",
      emoji: post.emoji || "",
      excerpt: post.excerpt || "",
      content: post.content || "",
      date: post.date || "",
      read_time: post.read_time || "",
    });
    setSuccess("");
    setError("");
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    if (!form.title || !form.slug) {
      setError("Title and slug are required.");
      setSaving(false);
      return;
    }
    try {
      const res = await fetch(
        editingSlug ? `/api/posts/${editingSlug}` : "/api/posts",
        {
          method: editingSlug ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Save failed");
      setSuccess(editingSlug ? "Post updated." : "Post added.");
      setShowForm(false);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(slug) {
    if (!window.confirm("Delete this post?")) return;
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`/api/posts/${slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setSuccess("Post deleted.");
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Posts</h1>
        <button
          onClick={openAdd}
          className="rounded bg-emerald-500 px-5 py-2 font-semibold text-gray-950 transition-colors hover:bg-emerald-400"
        >
          + Add Post
        </button>
      </div>

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

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 grid grid-cols-1 gap-3 rounded-xl border border-gray-800 bg-gray-900 p-6 sm:grid-cols-2"
        >
          <label className="flex flex-col gap-1 text-sm font-medium sm:col-span-2">
            Title *
            <input required value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Post title" className={inputClass} />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium">
            Slug *
            <input required value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="my-post-slug" disabled={!!editingSlug} className={`${inputClass} disabled:opacity-60`} />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium">
            Emoji
            <input value={form.emoji} onChange={(e) => set("emoji", e.target.value)} placeholder="🏃" className={inputClass} />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium sm:col-span-2">
            Excerpt
            <input value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} placeholder="One-line summary..." className={inputClass} />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium sm:col-span-2">
            Content
            <textarea value={form.content} onChange={(e) => set("content", e.target.value)} placeholder="Full article text (blank line between paragraphs)..." rows={10} className={inputClass} />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium">
            Date
            <input value={form.date} onChange={(e) => set("date", e.target.value)} placeholder="2026-08-20" className={inputClass} />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium">
            Read time
            <input value={form.read_time} onChange={(e) => set("read_time", e.target.value)} placeholder="5 min read" className={inputClass} />
          </label>
          <div className="flex gap-3 sm:col-span-2">
            <button type="submit" disabled={saving} className="rounded bg-emerald-500 px-6 py-2 font-semibold text-gray-950 transition-colors hover:bg-emerald-400 disabled:opacity-60">
              {saving ? "Saving..." : editingSlug ? "Update" : "Create"}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="rounded border border-gray-700 px-6 py-2 font-semibold text-gray-300 transition-colors hover:bg-gray-800">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mt-6 overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-800 bg-gray-900 text-gray-400">
              <th className="px-4 py-3">Post</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-gray-400">Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-gray-400">No posts yet.</td></tr>
            ) : (
              items.map((p) => (
                <tr key={p.slug} className="border-b border-gray-800 last:border-0 hover:bg-gray-900">
                  <td className="px-4 py-3 font-medium">{p.emoji ? `${p.emoji} ` : ""}{p.title}</td>
                  <td className="px-4 py-3 text-gray-400">{p.slug}</td>
                  <td className="px-4 py-3 text-gray-400">{p.date || "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(p)} className="mr-2 rounded border border-gray-700 px-3 py-1 transition-colors hover:bg-gray-800">Edit</button>
                    <button onClick={() => handleDelete(p.slug)} className="rounded border border-red-500/40 px-3 py-1 text-red-300 transition-colors hover:bg-red-950">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
