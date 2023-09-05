import { NextRequest, NextResponse } from "next/server";
import { getInternalUsers } from "@/app/utils/getData";

// GET list of accounts
export async function GET(request: NextRequest) {
  const data = await getInternalUsers();

  return NextResponse.json({ data });
}
