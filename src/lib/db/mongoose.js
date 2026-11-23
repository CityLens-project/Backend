import mongoose from "mongoose";
import { env } from "../config/env.js";

export async function connectDB() {
  try {
    await mongoose.connect(env.db.url, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
}
