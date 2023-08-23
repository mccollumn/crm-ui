import { NextResponse } from "next/server";
import { getData } from "@/app/utils/getData";

import { cases } from "@/mockData/cases.json" assert { type: "json" };

// Retrieve list of cases
export async function GET() {
  const data = await getData("");

  // return NextResponse.json({ data });
  return NextResponse.json({ cases });
}
