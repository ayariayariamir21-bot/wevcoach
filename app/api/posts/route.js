import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Post from "@/lib/models/Post";
import { requireAdmin, dbError, readJson } from "@/lib/require-admin";

export async function GET(request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    await dbConnect();
    const posts = await Post.find().sort({ createdAt: -1 });
    return NextResponse.json(posts);
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
  const { slug, title, emoji, excerpt, content, date, read_time } = body;
  if (!slug || !title) {
    return NextResponse.json(
      { error: "Slug and title are required" },
      { status: 400 }
    );
  }
  try {
    await dbConnect();
    const post = await Post.create({
      slug,
      title,
      emoji,
      excerpt,
      content,
      date,
      read_time,
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return dbError(error);
  }
}
