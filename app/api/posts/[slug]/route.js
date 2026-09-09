import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Post from "@/lib/models/Post";
import { requireAdmin, dbError, readJson } from "@/lib/require-admin";

export async function GET(request, { params }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const { slug } = await params;
  try {
    await dbConnect();
    const post = await Post.findOne({ slug });
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    return dbError(error);
  }
}

export async function PUT(request, { params }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const { slug } = await params;
  const body = await readJson(request);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (!body.title) {
    return NextResponse.json(
      { error: "Title is required" },
      { status: 400 }
    );
  }
  try {
    await dbConnect();
    const post = await Post.findOneAndUpdate({ slug }, body, {
      new: true,
      runValidators: true,
    });
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    return dbError(error);
  }
}

export async function DELETE(request, { params }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const { slug } = await params;
  try {
    await dbConnect();
    const post = await Post.findOneAndDelete({ slug });
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return dbError(error);
  }
}
