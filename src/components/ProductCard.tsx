"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart, Share2, ShoppingCart } from "lucide-react";
import { useCompare } from "@/context/CompareContext";
import { discountedPrice, formatPrice } from "@/lib/utils";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const { addToCompare, isInCompare, isCompareFull } = useCompare();
  const [selectedSize, setSelectedSize] = useState(product.sizes[2] ?? product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [wishlisted, setWishlisted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const finalPrice = discountedPrice(product.price, product.discountPercent);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const handleAddToCompare = () => {
    if (isInCompare(product.id)) {
      showToast("Already in compare list");
      return;
    }
    if (isCompareFull) {
      showToast("Compare list is full (max 3)");
      return;
    }
    const added = addToCompare(product);
    if (added) showToast("Added to compare list");
  };

  const handleAddToCart = () => {
    showToast(`Added ${product.name} (${selectedSize}, ${selectedColor.name}) to cart`);
  };

  return (
    <div
      className={`group relative shrink-0 overflow-hidden rounded-2xl border border-card-border bg-white shadow-sm transition-all duration-300 hover:border-fuchsia-400 hover:shadow-lg ${
        compact ? "w-[220px]" : "w-[260px]"
      }`}
    >
      {toast && (
        <div className="absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-full bg-slate-900 px-3 py-1 text-xs text-white">
          {toast}
        </div>
      )}

      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="260px"
        />
        <button
          type="button"
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-muted shadow-sm transition-colors hover:text-red-500"
          aria-label="Add to wishlist"
        >
          <Heart className={`h-4 w-4 ${wishlisted ? "fill-red-500 text-red-500" : ""}`} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-base font-semibold text-foreground">{product.name}</h3>
        <p className="mt-0.5 text-xs text-muted">{product.category}</p>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-foreground">{formatPrice(finalPrice)}</span>
          {product.discountPercent > 0 && (
            <>
              <span className="text-xs text-muted line-through">{formatPrice(product.price)}</span>
              <span className="rounded-md bg-orange-100 px-1.5 py-0.5 text-[10px] font-semibold text-accent-orange">
                {product.discountPercent}% OFF
              </span>
            </>
          )}
        </div>

        <div className="mt-2 flex items-center gap-1 text-xs">
          <span className="font-semibold text-foreground">{product.rating}</span>
          <span className="text-yellow-400">★</span>
          <span className="text-primary">({product.reviewCount} reviews)</span>
        </div>

        <div className="mt-3 flex justify-end">
          <button
            type="button"
            className="text-muted transition-colors hover:text-primary"
            aria-label="Share product"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col justify-end rounded-2xl bg-white/95 p-4 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
        <p className="mb-2 text-xs font-medium text-muted">Select Size</p>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`rounded-lg border px-2 py-1 text-[10px] font-medium transition-colors ${
                selectedSize === size
                  ? "border-primary bg-primary-light text-primary"
                  : "border-card-border text-muted hover:border-primary"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        <p className="mb-2 text-xs font-medium text-muted">Select Color</p>
        <div className="mb-4 flex gap-2">
          {product.colors.map((color) => (
            <button
              key={color.name}
              type="button"
              onClick={() => setSelectedColor(color)}
              title={color.name}
              className={`h-6 w-6 rounded-full border-2 transition-transform hover:scale-110 ${
                selectedColor.name === color.name ? "border-primary" : "border-transparent"
              }`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className="rounded-xl border border-primary bg-white py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary-light"
          >
            Add to cart
          </button>
          <button
            type="button"
            onClick={handleAddToCompare}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-primary py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add to compare list
          </button>
        </div>
      </div>
    </div>
  );
}
