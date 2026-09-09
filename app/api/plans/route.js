import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Plan from "@/lib/models/Plan";
import { requireAdmin, dbError, readJson } from "@/lib/require-admin";

export async function GET(request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    await dbConnect();
    const plans = await Plan.find().sort({ createdAt: -1 });
    return NextResponse.json(plans);
  } catch (error) {
    return dbError(error);
  }
}

export async function POST(request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const body = await readJson(request);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const { name, price, description, link } = body;
  if (!name || price === undefined || price === null) {
    return NextResponse.json(
      { error: "Name and price are required" },
      { status: 400 }
    );
  }
  if (typeof price !== "number") {
    return NextResponse.json(
      { error: "Price must be a number" },
      { status: 400 }
    );
  }
  try {
    await dbConnect();
    const plan = await Plan.create({ name, price, description, link });
    return NextResponse.json(plan, { status: 201 });
  } catch (error) {
    return dbError(error);
  }
}
