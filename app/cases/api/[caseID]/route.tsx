import { NextRequest, NextResponse } from "next/server";
import { getData } from "@/app/utils/getData";

// Retrieve data for case
export async function GET(
  request: NextRequest,
  { params }: { params: { caseID: string } }
) {
  const caseID = params.caseID;
  // const data = await getData("case", caseID);

  // return NextResponse.json({ data });
}
