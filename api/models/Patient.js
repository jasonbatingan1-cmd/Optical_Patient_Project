import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    dob: { type: Date, required: true },
    phone: {
        type: String,
        required: true,
        match: [/^\+?[\d\s\-()]{7,15}$/, "Invalid phone number format"]
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    notes: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.model("Patient", PatientSchema);