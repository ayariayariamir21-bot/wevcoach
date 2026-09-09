import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    product_name: { type: String },
    buyer_email: { type: String },
    amount: { type: Number },
    status: { type: String, default: "paid" },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
