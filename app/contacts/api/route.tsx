import { NextResponse } from "next/server";
import { getData } from "@/app/utils/getData";

// Retrieve list of contatcs
export async function GET() {
  const data = await getData("");

  return NextResponse.json({ data });
}
