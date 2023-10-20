import { NextRequest, NextResponse } from "next/server";

// GET quote PDF html
export async function GET(
  request: NextRequest,
  { params }: { params: { quoteID: string } }
) {
  const quoteID = params.quoteID;
  console.log("Quote ID:", quoteID);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CRM_API_ENDPOINT}/pdf/quote/${quoteID}`
  );
  const data = await response.text();

  return NextResponse.json({ data });
}
