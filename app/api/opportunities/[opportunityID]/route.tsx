import { NextRequest, NextResponse } from "next/server";
import {
  getOpportunityData,
  revalidateOpportunityCache,
} from "@/app/utils/getData";

// GET opportunity data
export async function GET(
  request: NextRequest,
  { params }: { params: { opportunityID: string } }
) {
  const opportunityID = params.opportunityID;
  await revalidateOpportunityCache();
  const data = await getOpportunityData(opportunityID);

  return NextResponse.json({ data });
}
