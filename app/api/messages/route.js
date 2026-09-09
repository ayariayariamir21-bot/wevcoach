import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Message from "@/lib/models/Message";
import { requireAdmin, dbError, readJson } from "@/lib/require-admin";

export async function GET(request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    await dbConnect();
    const messages = await Message.find().sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch (error) {
    return dbError(error);
  }
}

// Public: contact form submissions. No auth required.
export async function POST(request) {
  const body = await readJson(request);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const { name, email, body: messageBody } = body;
  if (!name || !email || !messageBody) {
    return NextResponse.json(
      { error: "Name, email and message are required" },
      { status: 400 }
    );
  }
  try {
    await dbConnect();
    const message = await Message.create({
      name,
      email,
      body: messageBody,
      read: false,
    });
    return NextResponse.json({ ok: true, id: message._id }, { status: 201 });
  } catch (error) {
    return dbError(error);
  }
}
