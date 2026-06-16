import { NextResponse } from "next/server";
import { getProductById, products } from "@/data/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const category = searchParams.get("category");

  if (id) {
    const product = getProductById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ product });
  }

  let filtered = products;
  if (category && category !== "All") {
    filtered = products.filter((p) => p.category === category);
  }

  return NextResponse.json({ products: filtered });
}
