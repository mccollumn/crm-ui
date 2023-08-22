import { NextRequest, NextResponse } from "next/server";
import { getData } from "@/app/utils/getData";

// Retrieve data for account
export async function GET(
  request: NextRequest,
  { params }: { params: { accountID: string } }
) {
  const accountID = params.accountID;

  console.log("Retrieve data for:", accountID);

  const data = await getData(accountID);

  return NextResponse.json({ data });
}
