import { NextRequest, NextResponse } from "next/server";
import { postData } from "@/app/utils/getData";

// POST updated data
export async function POST(
  request: NextRequest,
  { params }: { params: { caseID: string } }
) {
  const caseID = params.caseID;

  console.log("Request:", await request.formData());
  const data = await postData(caseID);

  return NextResponse.json({ data });
}
