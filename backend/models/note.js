import mongoose from "mongoose";

const note = mongoose.Schema({
  title: String,
  description: String,
  date: { type: Date, default: Date.now },
  userId: String,
});

export default mongoose.model("Note", note);
