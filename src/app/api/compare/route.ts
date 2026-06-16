import { NextResponse } from "next/server";
import { getProductById } from "@/data/products";
import { buildComparison } from "@/lib/utils";
import { CompareRequest } from "@/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CompareRequest;
    const ids = body.productIds?.filter(Boolean) ?? [];

    if (ids.length < 2) {
      return NextResponse.json(
        { error: "At least 2 products are required for comparison" },
        { status: 400 },
      );
    }

    if (ids.length > 3) {
      return NextResponse.json(
        { error: "Maximum 3 products can be compared at once" },
        { status: 400 },
      );
    }

    const foundProducts = ids
      .map((id) => getProductById(id))
      .filter((p): p is NonNullable<typeof p> => Boolean(p));

    if (foundProducts.length < 2) {
      return NextResponse.json(
        { error: "Could not find enough valid products" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      products: foundProducts,
      comparison: buildComparison(foundProducts),
    });
  } catch {
    return NextResponse.json({ error: "Failed to compare products" }, { status: 500 });
  }
}
