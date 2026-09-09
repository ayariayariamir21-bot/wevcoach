import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema(
  {
    name: { type: String },
    price: { type: Number },
    description: { type: String },
    link: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Plan || mongoose.model("Plan", PlanSchema);
