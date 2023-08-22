import { NextRequest, NextResponse } from "next/server";
import { getData } from "@/app/utils/getData";

// Retrieve data for contact
export async function GET(
  request: NextRequest,
  { params }: { params: { contactID: string } }
) {
  const contactID = params.contactID;

  console.log("Retrieve data for:", contactID);

  const data = await getData(contactID);

  return NextResponse.json({ data });
}
