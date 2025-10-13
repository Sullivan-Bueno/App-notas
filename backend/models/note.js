import mongoose from "mongoose";

const note = mongoose.Schema({
  title: String,
  description: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Note", note);
