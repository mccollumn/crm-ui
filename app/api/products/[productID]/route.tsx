import { NextRequest, NextResponse } from "next/server";
import { getProductData } from "@/app/utils/getData";

// GET product data
export async function GET(
  request: NextRequest,
  { params }: { params: { productID: string } }
) {
  const productID = params.productID;
  const data = await getProductData(productID);

  return NextResponse.json({ data });
}
