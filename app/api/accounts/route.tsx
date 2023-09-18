import { NextRequest, NextResponse } from "next/server";
import { getAccounts } from "@/app/utils/getData";

// GET list of accounts
export async function GET(request: NextRequest) {
  const data = await getAccounts();

  return NextResponse.json({ data });
}
