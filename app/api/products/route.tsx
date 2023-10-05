import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/app/utils/getData";

// GET list of products
export async function GET(request: NextRequest) {
  const data = await getProducts();

  return NextResponse.json({ data });
}
