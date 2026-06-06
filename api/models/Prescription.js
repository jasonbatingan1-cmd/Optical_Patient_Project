import mongoose from "mongoose";

const RxSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },

    // OD
    od_sph: String,
    od_cyl: String,
    od_axis: String,
    od_add: String,
    od_prism_h: String,
    od_prism_v: String,

    // OS
    os_sph: String,
    os_cyl: String,
    os_axis: String,
    os_add: String,
    os_prism_h: String,
    os_prism_v: String,

    // PD
    pd_single: String,
    pd_od: String,
    pd_os: String,

    // Lens options
    lensType: String,
    treatment: String,
    coating: String,
    frame: String,

    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Rx", RxSchema);
