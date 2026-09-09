import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    body: { type: String },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Message ||
  mongoose.model("Message", MessageSchema);
