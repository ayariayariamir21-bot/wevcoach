import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/lib/models/Product";
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
    const product = await Product.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
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
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return dbError(error);
  }
}
