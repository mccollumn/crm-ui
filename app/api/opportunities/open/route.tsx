import { NextRequest, NextResponse } from "next/server";
import { getOpenOpportunities } from "@/app/utils/getData";

// GET list of open opportunities
export async function GET(request: NextRequest) {
  const data = await getOpenOpportunities();

  return NextResponse.json({ data });
}
