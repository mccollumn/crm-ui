import { NextRequest, NextResponse } from "next/server";
import { getAccountData } from "@/app/utils/getData";

// GET account data
export async function GET(
  request: NextRequest,
  { params }: { params: { accountID: string } }
) {
  const accountID = params.accountID;
  const data = await getAccountData(accountID);

  return NextResponse.json({ data });
}
