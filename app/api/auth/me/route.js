import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";

export async function GET(request) {
  const admin = verifyAuth(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ email: admin.email });
}
