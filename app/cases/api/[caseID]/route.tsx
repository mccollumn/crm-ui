import { NextRequest, NextResponse } from "next/server";
import { getCaseData } from "@/app/utils/getData";

// Retrieve data for case
export async function GET(
  request: NextRequest,
  { params }: { params: { caseID: string } }
) {
  const caseID = params.caseID;
  const data = await getCaseData(caseID);
  return NextResponse.json({ data });
}
