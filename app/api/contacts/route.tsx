import { NextRequest, NextResponse } from "next/server";
import { getContacts } from "@/app/utils/getData";

// GET lists of contacts
export async function GET(request: NextRequest) {
  const data = await getContacts();

  return NextResponse.json({ data });
}
