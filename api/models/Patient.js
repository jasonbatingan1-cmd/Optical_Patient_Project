import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    dob: String,
    phone: String,
    email: String,
    notes: String
});

export default mongoose.model("Patient", PatientSchema);
