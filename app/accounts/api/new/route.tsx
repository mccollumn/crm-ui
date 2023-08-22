import { NextRequest, NextResponse } from "next/server";
import { postData } from "@/app/utils/getData";

// POST data for new account (no account ID yet)
export async function POST(request: NextRequest) {
  console.log("Request:", await request.formData());
  const data = await postData("");

  return NextResponse.json({ data });
}
