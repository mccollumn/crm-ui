import { NextRequest, NextResponse } from "next/server";
import { getContactsByAccount } from "@/app/utils/getData";

// GET contacts for an account
export async function GET(
  request: NextRequest,
  { params }: { params: { accountID: string } }
) {
  const accountID = params.accountID;
  const data = await getContactsByAccount(accountID);

  return NextResponse.json({ data });
}
