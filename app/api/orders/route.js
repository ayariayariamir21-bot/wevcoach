import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/lib/models/Order";
import { requireAdmin, dbError } from "@/lib/require-admin";

export async function GET(request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    await dbConnect();
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error) {
    return dbError(error);
  }
}
