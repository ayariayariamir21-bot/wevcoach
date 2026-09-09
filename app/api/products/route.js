import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import { requireAdmin, dbError, readJson } from "@/lib/require-admin";

export async function GET(request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    await dbConnect();
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json(products);
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
  const { name, price, tag, emoji, description, link } = body;
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
    const product = await Product.create({
      name,
      price,
      tag,
      emoji,
      description,
      link,
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return dbError(error);
  }
}
