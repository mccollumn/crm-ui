import { NextRequest, NextResponse } from "next/server";
import { getOpportunityData } from "@/app/utils/getData";

// GET opportunity data
export async function GET(
  request: NextRequest,
  { params }: { params: { opportunityID: string } }
) {
  const opportunityID = params.opportunityID;
  const data = await getOpportunityData(opportunityID);

  return NextResponse.json({ data });
}
