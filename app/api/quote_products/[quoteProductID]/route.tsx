import { NextRequest, NextResponse } from "next/server";
import { getQuoteProductData } from "@/app/utils/getData";

// GET quote product data
export async function GET(
  request: NextRequest,
  { params }: { params: { quoteProductID: string } }
) {
  const quoteProductID = params.quoteProductID;
  const data = await getQuoteProductData(quoteProductID);

  return NextResponse.json({ data });
}
