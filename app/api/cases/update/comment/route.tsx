import { postData } from "@/app/utils/getData";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  const res = await postData(
    `${process.env.CRM_API_ENDPOINT}/casecomment/update`,
    data
  );
  return NextResponse.json({ res });
}
