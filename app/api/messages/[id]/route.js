import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Message from "@/lib/models/Message";
import { requireAdmin, dbError, readJson } from "@/lib/require-admin";

export async function PUT(request, { params }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const { id } = await params;
  const body = (await readJson(request)) || {};
  const read = body.read === undefined ? true : body.read;
  if (typeof read !== "boolean") {
    return NextResponse.json(
      { error: "Read must be a boolean" },
      { status: 400 }
    );
  }
  try {
    await dbConnect();
    const message = await Message.findByIdAndUpdate(
      id,
      { read },
      { new: true }
    );
    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }
    return NextResponse.json(message);
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
    const message = await Message.findByIdAndDelete(id);
    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return dbError(error);
  }
}
