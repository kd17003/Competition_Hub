import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Air Spain",
    category: "Unisex Sneakers",
    price: 4500,
    discountPercent: 10,
    rating: 4.5,
    reviewCount: 120,
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
    sizes: ["6 UK", "7 UK", "8 UK", "9 UK", "10 UK"],
    colors: [
      { name: "Brown", hex: "#8B4513" },
      { name: "Yellow", hex: "#F5C518" },
      { name: "Blue", hex: "#2563EB" },
    ],
    description: "Premium unisex sneakers with cushioned sole and breathable upper.",
    material: "Leather & Mesh",
    brand: "Opura",
    inStock: true,
  },
  {
    id: "2",
    name: "Urban Runner Pro",
    category: "Running Shoes",
    price: 5200,
    discountPercent: 15,
    rating: 4.7,
    reviewCount: 89,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    sizes: ["6 UK", "7 UK", "8 UK", "9 UK", "10 UK"],
    colors: [
      { name: "Red", hex: "#DC2626" },
      { name: "White", hex: "#F9FAFB" },
      { name: "Black", hex: "#111827" },
    ],
    description: "Lightweight running shoes designed for daily training and marathons.",
    material: "Synthetic Mesh",
    brand: "Opura Sport",
    inStock: true,
  },
  {
    id: "3",
    name: "Classic Loafers",
    category: "Formal Shoes",
    price: 3800,
    discountPercent: 5,
    rating: 4.3,
    reviewCount: 56,
    image:
      "https://images.unsplash.com/photo-1533867610662-4c1a2e4a3b8e?w=400&h=400&fit=crop",
    sizes: ["6 UK", "7 UK", "8 UK", "9 UK", "10 UK"],
    colors: [
      { name: "Brown", hex: "#78350F" },
      { name: "Black", hex: "#1F2937" },
    ],
    description: "Elegant loafers perfect for office and semi-formal occasions.",
    material: "Genuine Leather",
    brand: "Opura Classic",
    inStock: true,
  },
  {
    id: "4",
    name: "Trail Blazer X",
    category: "Hiking Boots",
    price: 6500,
    discountPercent: 12,
    rating: 4.8,
    reviewCount: 203,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8d357?w=400&h=400&fit=crop",
    sizes: ["6 UK", "7 UK", "8 UK", "9 UK", "10 UK"],
    colors: [
      { name: "Green", hex: "#15803D" },
      { name: "Brown", hex: "#92400E" },
    ],
    description: "Rugged hiking boots with waterproof membrane and ankle support.",
    material: "Nubuck Leather",
    brand: "Opura Outdoor",
    inStock: true,
  },
  {
    id: "5",
    name: "Cloud Step",
    category: "Casual Sneakers",
    price: 3200,
    discountPercent: 8,
    rating: 4.2,
    reviewCount: 74,
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
    sizes: ["6 UK", "7 UK", "8 UK", "9 UK", "10 UK"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Grey", hex: "#9CA3AF" },
      { name: "Navy", hex: "#1E3A8A" },
    ],
    description: "Everyday casual sneakers with cloud-like cushioning.",
    material: "Canvas & Rubber",
    brand: "Opura",
    inStock: true,
  },
  {
    id: "6",
    name: "Street Flex",
    category: "Unisex Sneakers",
    price: 4100,
    discountPercent: 10,
    rating: 4.6,
    reviewCount: 145,
    image:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop",
    sizes: ["6 UK", "7 UK", "8 UK", "9 UK", "10 UK"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#F3F4F6" },
      { name: "Orange", hex: "#EA580C" },
    ],
    description: "Street-style sneakers with bold design and all-day comfort.",
    material: "Synthetic Leather",
    brand: "Opura Street",
    inStock: true,
  },
  {
    id: "7",
    name: "Elite Court",
    category: "Basketball Shoes",
    price: 5800,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 312,
    image:
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=400&h=400&fit=crop",
    sizes: ["6 UK", "7 UK", "8 UK", "9 UK", "10 UK"],
    colors: [
      { name: "Red", hex: "#B91C1C" },
      { name: "Black", hex: "#111827" },
      { name: "Gold", hex: "#CA8A04" },
    ],
    description: "High-performance basketball shoes with superior ankle lockdown.",
    material: "Knit Upper",
    brand: "Opura Sport",
    inStock: true,
  },
  {
    id: "8",
    name: "Minimal Slide",
    category: "Sandals",
    price: 1800,
    discountPercent: 0,
    rating: 4.0,
    reviewCount: 38,
    image:
      "https://images.unsplash.com/photo-1603487742131-416a7f39b8bd?w=400&h=400&fit=crop",
    sizes: ["6 UK", "7 UK", "8 UK", "9 UK", "10 UK"],
    colors: [
      { name: "Black", hex: "#374151" },
      { name: "Beige", hex: "#D6D3D1" },
    ],
    description: "Minimalist slides for casual wear and post-workout comfort.",
    material: "EVA Foam",
    brand: "Opura",
    inStock: true,
  },
];

export const categories = [
  "All",
  "Unisex Sneakers",
  "Running Shoes",
  "Formal Shoes",
  "Hiking Boots",
  "Casual Sneakers",
  "Basketball Shoes",
  "Sandals",
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function searchProducts(query: string): Product[] {
  const normalized = query.toLowerCase().trim();
  if (!normalized) return products.slice(0, 4);

  const keywords = normalized.split(/\s+/);

  const scored = products.map((product) => {
    const searchText = [
      product.name,
      product.category,
      product.brand,
      product.description,
      product.material,
      ...product.colors.map((c) => c.name),
    ]
      .join(" ")
      .toLowerCase();

    let score = 0;
    for (const keyword of keywords) {
      if (searchText.includes(keyword)) score += 2;
      if (product.name.toLowerCase().includes(keyword)) score += 3;
      if (product.category.toLowerCase().includes(keyword)) score += 2;
    }

    if (normalized.includes("sneaker") && product.category.toLowerCase().includes("sneaker"))
      score += 2;
    if (normalized.includes("run") && product.category.toLowerCase().includes("running"))
      score += 2;
    if (normalized.includes("formal") && product.category.toLowerCase().includes("formal"))
      score += 2;
    if (normalized.includes("cheap") || normalized.includes("budget")) {
      score += product.price < 4000 ? 2 : 0;
    }
    if (normalized.includes("best") || normalized.includes("top")) {
      score += product.rating >= 4.5 ? 2 : 0;
    }

    return { product, score };
  });

  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.product)
    .slice(0, 6);
}

export function generateAIReply(query: string, results: Product[]): string {
  const normalized = query.toLowerCase();

  if (results.length === 0) {
    return "I couldn't find products matching your search. Try asking for sneakers, running shoes, or formal shoes under a specific budget.";
  }

  if (normalized.includes("compare")) {
    return `I found ${results.length} products you might want to compare. Add them to your compare list to see a detailed side-by-side comparison.`;
  }

  if (normalized.includes("cheap") || normalized.includes("budget")) {
    return `Here are some budget-friendly options I found for you. The ${results[0].name} starts at ₹${results[0].price.toLocaleString("en-IN")}.`;
  }

  if (normalized.includes("best") || normalized.includes("top rated")) {
    return `Based on ratings and reviews, here are our top picks. ${results[0].name} leads with ${results[0].rating} stars from ${results[0].reviewCount} reviews.`;
  }

  const categoriesFound = [...new Set(results.map((p) => p.category))];
  if (categoriesFound.length === 1) {
    return `I found ${results.length} great ${categoriesFound[0].toLowerCase()} for you. Swipe through the carousel to explore each option.`;
  }

  return `I found ${results.length} products matching "${query}". Browse the carousel below and hover on any card to see sizes, colors, and actions.`;
}
