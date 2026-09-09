import { NextResponse } from "next/server";
import Stripe from "stripe";
import dbConnect from "@/lib/mongodb";
import Order from "@/lib/models/Order";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "STRIPE_WEBHOOK_SECRET is not configured" },
      { status: 500 }
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder");
    const rawBody = await request.text();
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch {
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const product_name =
      session.metadata?.product_name || "Unknown product";
    const buyer_email =
      session.customer_details?.email || session.customer_email || "";
    const amount =
      typeof session.amount_total === "number" ? session.amount_total / 100 : 0;

    try {
      await dbConnect();
      await Order.create({
        product_name,
        buyer_email,
        amount,
        status: "paid",
      });
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to save order" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
