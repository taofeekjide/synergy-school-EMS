import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI;

export async function connectToDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
