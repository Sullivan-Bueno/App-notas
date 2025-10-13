import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ quiet: true, path: "../.env" });

export default async function connectDB() {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Connected!");
  } catch (err) {
    console.log(err);
  }
}
