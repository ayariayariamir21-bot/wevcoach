import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import Plan from "@/lib/models/Plan";
import Post from "@/lib/models/Post";
import Message from "@/lib/models/Message";
import Order from "@/lib/models/Order";
import { requireAdmin, dbError } from "@/lib/require-admin";

export async function GET(request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    await dbConnect();
    const [products, plans, posts, unreadMessages, orders] = await Promise.all(
      [
        Product.countDocuments(),
        Plan.countDocuments(),
        Post.countDocuments(),
        Message.countDocuments({ read: false }),
        Order.countDocuments(),
      ]
    );
    return NextResponse.json({
      products,
      plans,
      posts,
      unreadMessages,
      orders,
    });
  } catch (error) {
    return dbError(error);
  }
}
