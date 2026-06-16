import { ComparisonRow, Product } from "@/types";

export function formatPrice(price: number): string {
  return `₹ ${price.toLocaleString("en-IN")}`;
}

export function discountedPrice(price: number, discountPercent: number): number {
  return Math.round(price * (1 - discountPercent / 100));
}

export function buildComparison(products: Product[]): ComparisonRow[] {
  return [
    {
      attribute: "Price",
      values: products.map((p) => formatPrice(discountedPrice(p.price, p.discountPercent))),
    },
    {
      attribute: "Original Price",
      values: products.map((p) => formatPrice(p.price)),
    },
    {
      attribute: "Discount",
      values: products.map((p) => (p.discountPercent > 0 ? `${p.discountPercent}% OFF` : "None")),
    },
    {
      attribute: "Rating",
      values: products.map((p) => `${p.rating} ★ (${p.reviewCount} reviews)`),
    },
    {
      attribute: "Category",
      values: products.map((p) => p.category),
    },
    {
      attribute: "Brand",
      values: products.map((p) => p.brand),
    },
    {
      attribute: "Material",
      values: products.map((p) => p.material),
    },
    {
      attribute: "Available Sizes",
      values: products.map((p) => p.sizes.join(", ")),
    },
    {
      attribute: "Colors",
      values: products.map((p) => p.colors.map((c) => c.name).join(", ")),
    },
    {
      attribute: "In Stock",
      values: products.map((p) => (p.inStock ? "Yes" : "No")),
    },
    {
      attribute: "Description",
      values: products.map((p) => p.description),
    },
  ];
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
