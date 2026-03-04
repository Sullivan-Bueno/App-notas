import mongoose from "mongoose";

const user = mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

export default mongoose.model("User", user);