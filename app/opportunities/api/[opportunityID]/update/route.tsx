import { NextRequest, NextResponse } from "next/server";
import { postData } from "@/app/utils/getData";

// POST updated data
export async function POST(
  request: NextRequest,
  { params }: { params: { opportunityID: string } }
) {
  const opportunityID = params.opportunityID;

  console.log("Request:", await request.formData());
  const data = await postData(opportunityID);

  return NextResponse.json({ data });
}
