import { NextResponse } from "next/server";
import { verifyAuth } from "./auth";

// Returns a 401 JSON response if not authenticated, otherwise null.
export function requireAdmin(request) {
  const admin = verifyAuth(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

// Map common Mongoose errors to clean API responses.
export function dbError(error) {
  if (error?.name === "CastError") {
    return NextResponse.json({ error: "Invalid id format" }, { status: 400 });
  }
  if (error?.code === 11000) {
    return NextResponse.json(
      { error: "Duplicate value for a unique field" },
      { status: 400 }
    );
  }
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}

// Returns parsed JSON body, or null if the body is not valid JSON.
export async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
