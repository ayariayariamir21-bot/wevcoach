// One-time admin setup script.
// Reads MONGODB_URI, ADMIN_EMAIL and ADMIN_PASSWORD from .env.local,
// hashes the password with bcrypt and inserts the admin.
//
// Run once with:  node scripts/create-admin.js
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

dotenv.config({ path: ".env.local" });

const { MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET } = process.env;

if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI in .env.local");
  process.exit(1);
}
if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("Missing ADMIN_EMAIL or ADMIN_PASSWORD in .env.local");
  process.exit(1);
}
if (!JWT_SECRET) {
  console.error("Missing JWT_SECRET in .env.local (needed for login later)");
  process.exit(1);
}

const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);
const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

await mongoose.connect(MONGODB_URI);

const existing = await Admin.findOne({ email: ADMIN_EMAIL });
if (existing) {
  console.log(`Admin ${ADMIN_EMAIL} already exists — nothing to do.`);
} else {
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await Admin.create({ email: ADMIN_EMAIL, passwordHash });
  console.log(`Admin ${ADMIN_EMAIL} created.`);
}

await mongoose.disconnect();
