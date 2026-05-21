import mongoose from "mongoose";

const LensSchema = new mongoose.Schema({
    brand: { type: String },
    material: { type: String }, // Poly, Trivex, Hi-Index, etc.
    index: { type: String },    // 1.50, 1.59, 1.67, 1.74
    type: { type: String },     // SV, BF, PAL
    coating: { type: String },  // AR, Blue Light, UV
    price: { type: Number, default: 0 }
});

export default mongoose.model("Lens", LensSchema);
