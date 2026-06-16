import { NextResponse } from "next/server";
import { generateAIReply, products, searchProducts } from "@/data/products";
import { ChatRequest } from "@/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequest;
    const message = body.message?.trim();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const results = searchProducts(message);
    const reply = generateAIReply(message, results);

    return NextResponse.json({
      reply,
      products: results.length > 0 ? results : products.slice(0, 4),
    });
  } catch {
    return NextResponse.json({ error: "Failed to process chat message" }, { status: 500 });
  }
}
