import mongoose from "mongoose";

const TreatmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, default: 0 }
});

export default mongoose.model("Treatment", TreatmentSchema);
