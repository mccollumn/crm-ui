import { NextRequest, NextResponse } from "next/server";
import { getQuoteData, revalidateQuoteCache } from "@/app/utils/getData";

// GET quote data
export async function GET(
  request: NextRequest,
  { params }: { params: { quoteID: string } }
) {
  const quoteID = params.quoteID;
  await revalidateQuoteCache();
  const data = await getQuoteData(quoteID);

  return NextResponse.json({ data });
}
