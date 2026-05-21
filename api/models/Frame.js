import mongoose from "mongoose";

const FrameSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    color: { type: String },
    size: { type: String },
    price: { type: Number, default: 0 }
});

export default mongoose.model("Frame", FrameSchema);
