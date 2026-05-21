import mongoose from "mongoose";

const CoatingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String },
    description: { type: String },
    price: { type: Number, default: 0 }
});

export default mongoose.model("Coating", CoatingSchema);
