import mongoose from "mongoose";

const user = mongoose.Schema({
    email: String,
    passwordHash: String,
})

export default mongoose.model("User", user);