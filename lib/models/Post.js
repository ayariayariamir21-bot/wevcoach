import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true, required: true },
    title: { type: String },
    emoji: { type: String },
    excerpt: { type: String },
    content: { type: String },
    date: { type: String },
    read_time: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
