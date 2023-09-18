import { NextRequest, NextResponse } from "next/server";
import { getActiveAccounts } from "@/app/utils/getData";

// GET list of accounts
export async function GET(request: NextRequest) {
  const data = await getActiveAccounts();

  return NextResponse.json({ data });
}
