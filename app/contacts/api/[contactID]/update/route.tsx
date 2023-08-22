import { NextRequest, NextResponse } from "next/server";
import { postData } from "@/app/utils/getData";

// POST updated data
export async function POST(
  request: NextRequest,
  { params }: { params: { contactID: string } }
) {
  const contactID = params.contactID;

  console.log("Request:", await request.formData());
  const data = await postData(contactID);

  return NextResponse.json({ data });
}
