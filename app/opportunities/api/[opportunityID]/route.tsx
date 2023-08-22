import { NextRequest, NextResponse } from "next/server";
import { getData } from "@/app/utils/getData";

// Retrieve data for opportunity
export async function GET(
  request: NextRequest,
  { params }: { params: { opportunityID: string } }
) {
  const opportunityID = params.opportunityID;

  console.log("Retrieve data for:", opportunityID);

  const data = await getData(opportunityID);

  return NextResponse.json({ data });
}
