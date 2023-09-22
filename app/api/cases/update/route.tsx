import { postData } from "@/app/utils/getData";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  console.log("Case data:", data);
  const res = postData(`${process.env.CRM_API_ENDPOINT}/case/update`, data);
  return NextResponse.json({ res });
}
