import { postData } from "@/app/utils/getData";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  const res = postData(
    `${process.env.CRM_API_ENDPOINT}/opportunity/update`,
    data
  );
  return NextResponse.json({ res });
}
