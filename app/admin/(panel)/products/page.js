"use client";

import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  price: "",
  tag: "",
  emoji: "",
  description: "",
  link: "",
};

const inputClass =
  "rounded border border-gray-700 bg-gray-950 px-4 py-2 text-gray-100 placeholder-gray-500 outline-none focus:border-emerald-400";

export default function AdminProducts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/products")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load products");
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
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to load products");
      setItems(await res.json());
    } catch (err) {
      setError(err.message);
    }
  }

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setSuccess("");
    setError("");
    setShowForm(true);
  }

  function openEdit(product) {
    setEditingId(product._id);
    setForm({
      name: product.name || "",
      price: String(product.price ?? ""),
      tag: product.tag || "",
      emoji: product.emoji || "",
      description: product.description || "",
      link: product.link || "",
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
    const price = Number(form.price);
    if (!form.name || form.price === "" || Number.isNaN(price)) {
      setError("Name and a valid price are required.");
      setSaving(false);
      return;
    }
    try {
      const res = await fetch(
        editingId ? `/api/products/${editingId}` : "/api/products",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, price }),
        }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Save failed");
      setSuccess(editingId ? "Product updated." : "Product added.");
      setShowForm(false);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this product?")) return;
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setSuccess("Product deleted.");
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Products</h1>
        <button
          onClick={openAdd}
          className="rounded bg-emerald-500 px-5 py-2 font-semibold text-gray-950 transition-colors hover:bg-emerald-400"
        >
          + Add Product
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
          <label className="flex flex-col gap-1 text-sm font-medium">
            Name *
            <input required value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Product name" className={inputClass} />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium">
            Price ($) *
            <input required type="number" min="0" step="0.01" value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="29" className={inputClass} />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium">
            Tag
            <input value={form.tag} onChange={(e) => set("tag", e.target.value)} placeholder="ebook / gear" className={inputClass} />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium">
            Emoji
            <input value={form.emoji} onChange={(e) => set("emoji", e.target.value)} placeholder="📘" className={inputClass} />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium sm:col-span-2">
            Description
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Short description..." rows={3} className={inputClass} />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium sm:col-span-2">
            Link
            <input value={form.link} onChange={(e) => set("link", e.target.value)} placeholder="https://..." className={inputClass} />
          </label>
          <div className="flex gap-3 sm:col-span-2">
            <button type="submit" disabled={saving} className="rounded bg-emerald-500 px-6 py-2 font-semibold text-gray-950 transition-colors hover:bg-emerald-400 disabled:opacity-60">
              {saving ? "Saving..." : editingId ? "Update" : "Create"}
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
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Tag</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-gray-400">Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-gray-400">No products yet.</td></tr>
            ) : (
              items.map((p) => (
                <tr key={p._id} className="border-b border-gray-800 last:border-0 hover:bg-gray-900">
                  <td className="px-4 py-3 font-medium">{p.emoji ? `${p.emoji} ` : ""}{p.name}</td>
                  <td className="px-4 py-3 text-emerald-400">${p.price}</td>
                  <td className="px-4 py-3 text-gray-400">{p.tag || "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(p)} className="mr-2 rounded border border-gray-700 px-3 py-1 transition-colors hover:bg-gray-800">Edit</button>
                    <button onClick={() => handleDelete(p._id)} className="rounded border border-red-500/40 px-3 py-1 text-red-300 transition-colors hover:bg-red-950">Delete</button>
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
