import { NextResponse } from "next/server";
import { getOpenCases } from "@/app/utils/getData";

// Retrieve list of cases
export async function GET() {
  const data = await getOpenCases();
  return NextResponse.json({ data });
}
