export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  image: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  description: string;
  material: string;
  brand: string;
  inStock: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  products?: Product[];
  timestamp: number;
}

export interface CompareProduct extends Product {
  selectedSize?: string;
  selectedColor?: string;
}

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  reply: string;
  products: Product[];
}

export interface CompareRequest {
  productIds: string[];
}

export interface CompareResponse {
  products: Product[];
  comparison: ComparisonRow[];
}

export interface ComparisonRow {
  attribute: string;
  values: (string | number | boolean)[];
}
