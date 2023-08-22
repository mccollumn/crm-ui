import { NextRequest, NextResponse } from "next/server";
import { postData } from "@/app/utils/getData";

// POST updated data
export async function POST(
  request: NextRequest,
  { params }: { params: { accountID: string } }
) {
  const accountID = params.accountID;

  console.log("Request:", await request.formData());
  const data = await postData(accountID);

  return NextResponse.json({ data });
}
