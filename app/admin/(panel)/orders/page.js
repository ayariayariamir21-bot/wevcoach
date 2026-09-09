"use client";

import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/orders")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load orders");
        setItems(await res.json());
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const total = items.reduce(
    (sum, o) => sum + (typeof o.amount === "number" ? o.amount : 0),
    0
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Orders</h1>
        {items.length > 0 && (
          <p className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1 text-sm font-bold text-emerald-400">
            Total: ${total.toFixed(2)}
          </p>
        )}
      </div>

      {error && (
        <p className="mt-4 rounded border border-red-500/40 bg-red-950 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-800 bg-gray-900 text-gray-400">
              <th className="px-4 py-3">Buyer</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-400">Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-400">No orders yet. They appear here after a Stripe checkout completes.</td></tr>
            ) : (
              items.map((o) => (
                <tr key={o._id} className="border-b border-gray-800 last:border-0 hover:bg-gray-900">
                  <td className="px-4 py-3 font-medium">{o.buyer_email || "—"}</td>
                  <td className="px-4 py-3">{o.product_name}</td>
                  <td className="px-4 py-3 text-emerald-400">
                    ${typeof o.amount === "number" ? o.amount.toFixed(2) : o.amount}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-400">
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {o.createdAt ? new Date(o.createdAt).toLocaleString() : "—"}
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
