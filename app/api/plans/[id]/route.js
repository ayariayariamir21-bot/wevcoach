import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Plan from "@/lib/models/Plan";
import { requireAdmin, dbError, readJson } from "@/lib/require-admin";

export async function PUT(request, { params }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const { id } = await params;
  const body = await readJson(request);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const { name, price } = body;
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
    const plan = await Plan.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }
    return NextResponse.json(plan);
  } catch (error) {
    return dbError(error);
  }
}

export async function DELETE(request, { params }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const { id } = await params;
  try {
    await dbConnect();
    const plan = await Plan.findByIdAndDelete(id);
    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return dbError(error);
  }
}
