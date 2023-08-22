import { NextRequest, NextResponse } from "next/server";
import { postData } from "@/app/utils/getData";

// POST data for new case (no case ID yet)
export async function POST(request: NextRequest) {
  console.log("Request:", await request.formData());
  const data = await postData("");

  return NextResponse.json({ data });
}
