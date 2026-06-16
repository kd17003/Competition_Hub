"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Plus, ThumbsDown, ThumbsUp, X } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { UserAvatar } from "@/components/UserAvatar";
import { categories, products } from "@/data/products";
import { useCompare } from "@/context/CompareContext";
import { buildComparison } from "@/lib/utils";
import { ComparisonRow, Product } from "@/types";

export default function ComparePage() {
  const { compareSlots, compareList, removeFromCompare, setCompareSlot, clearCompare } =
    useCompare();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showPicker, setShowPicker] = useState<number | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [comparison, setComparison] = useState<ComparisonRow[]>([]);

  const slots = compareSlots;

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleCompare = async () => {
    if (compareList.length < 2) return;

    try {
      const response = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productIds: compareList.map((p) => p.id) }),
      });

      if (response.ok) {
        const data = await response.json();
        setComparison(data.comparison);
      } else {
        setComparison(buildComparison(compareList));
      }
    } catch {
      setComparison(buildComparison(compareList));
    }

    setShowComparison(true);
  };

  const handleSelectProduct = (product: Product, slotIndex: number) => {
    if (compareList.some((p) => p.id === product.id) && slots[slotIndex]?.id !== product.id) {
      setShowPicker(null);
      return;
    }

    setCompareSlot(slotIndex, product);
    setShowPicker(null);
  };

  useEffect(() => {
    if (compareList.length < 2) {
      setShowComparison(false);
    }
  }, [compareList.length]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <header className="flex items-center justify-end border-b border-card-border bg-white px-8 py-4">
          <UserAvatar />
        </header>

        <div className="mx-auto w-full max-w-5xl flex-1 px-8 py-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Compare Products</h1>
              <p className="mt-1 text-sm text-muted">
                Compare products by their price, and ratings.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="category" className="text-sm text-muted">
                Choose Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-xl border border-card-border bg-white px-4 py-2 text-sm outline-none focus:border-primary"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {slots.map((product, index) => (
              <div
                key={index}
                className="relative flex min-h-[220px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-card-border bg-white p-6"
              >
                {product ? (
                  <>
                    <button
                      type="button"
                      onClick={() => removeFromCompare(product.id)}
                      className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-muted transition-colors hover:bg-red-100 hover:text-red-500"
                      aria-label="Remove product"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-slate-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <h3 className="mt-3 text-sm font-semibold">{product.name}</h3>
                    <p className="text-xs text-muted">{product.category}</p>
                  </>
                ) : (
                  <>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-muted">
                      <Plus className="h-6 w-6" />
                    </div>
                    <p className="mt-3 text-sm font-medium text-foreground">Add Product</p>
                    <button
                      type="button"
                      onClick={() => setShowPicker(showPicker === index ? null : index)}
                      className="mt-3 rounded-xl bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-dark"
                    >
                      Select Product
                    </button>
                  </>
                )}

                {showPicker === index && (
                  <div className="absolute left-0 right-0 top-full z-10 mt-2 max-h-60 overflow-y-auto rounded-xl border border-card-border bg-white shadow-lg">
                    {filteredProducts.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleSelectProduct(p, index)}
                        disabled={compareList.some((c) => c.id === p.id) && slots[index]?.id !== p.id}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{p.name}</p>
                          <p className="text-xs text-muted">{p.category}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={handleCompare}
              disabled={compareList.length < 2}
              className="rounded-xl bg-slate-400 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50 enabled:bg-primary enabled:hover:bg-primary-dark"
            >
              Compare
            </button>
            {compareList.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  clearCompare();
                  setShowComparison(false);
                }}
                className="text-xs text-muted underline hover:text-primary"
              >
                Clear all products
              </button>
            )}
          </div>

          {showComparison && compareList.length >= 2 && (
            <div className="mt-10 animate-fade-in rounded-2xl border border-card-border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground">Detailed Comparison</h2>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="text-muted transition-colors hover:text-green-600"
                    aria-label="Helpful"
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="text-muted transition-colors hover:text-red-500"
                    aria-label="Not helpful"
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[600px] text-sm">
                  <thead>
                    <tr className="border-b border-card-border">
                      <th className="py-3 pr-4 text-left font-medium text-muted">Attribute</th>
                      {compareList.map((product) => (
                        <th key={product.id} className="px-4 py-3 text-left font-semibold">
                          {product.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row) => (
                      <tr key={row.attribute} className="border-b border-card-border/60">
                        <td className="py-3 pr-4 font-medium text-muted">{row.attribute}</td>
                        {row.values.map((value, idx) => (
                          <td key={idx} className="px-4 py-3 text-foreground">
                            {String(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link href="/" className="text-sm text-primary hover:underline">
              ← Back to shopping assistant
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
