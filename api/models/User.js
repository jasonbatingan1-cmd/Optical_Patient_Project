import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed
    role: { type: String, default: "user" } // user, admin, optician
});

export default mongoose.model("User", UserSchema);
