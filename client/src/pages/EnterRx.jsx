import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiPost } from "../api";

export default function EnterRx() {
    const { id } = useParams(); // patient ID
    const nav = useNavigate();

    const [form, setForm] = useState({
        // OD (Right Eye)
        od_sph: "",
        od_cyl: "",
        od_axis: "",
        od_add: "",
        od_prism_h: "",
        od_prism_v: "",

        // OS (Left Eye)
        os_sph: "",
        os_cyl: "",
        os_axis: "",
        os_add: "",
        os_prism_h: "",
        os_prism_v: "",

        // PD
        pd_single: "",
        pd_od: "",
        pd_os: "",

        // Lens options
        lensType: "",
        treatment: "",
        coating: "",
    });

    function update(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await apiPost(`/patients/${id}/rx`, form);
        nav(`/patients/${id}/edit`);
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Enter Prescription (Rx)</h1>
            <p>Patient ID: {id}</p>

            <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>

                {/* OD */}
                <h2>Right Eye (OD)</h2>
                <div>
                    <input name="od_sph" placeholder="SPH" value={form.od_sph} onChange={update} />
                    <input name="od_cyl" placeholder="CYL" value={form.od_cyl} onChange={update} />
                    <input name="od_axis" placeholder="Axis" value={form.od_axis} onChange={update} />
                    <input name="od_add" placeholder="Add" value={form.od_add} onChange={update} />
                    <input name="od_prism_h" placeholder="Prism Horizontal" value={form.od_prism_h} onChange={update} />
                    <input name="od_prism_v" placeholder="Prism Vertical" value={form.od_prism_v} onChange={update} />
                </div>

                {/* OS */}
                <h2 style={{ marginTop: "1rem" }}>Left Eye (OS)</h2>
                <div>
                    <input name="os_sph" placeholder="SPH" value={form.os_sph} onChange={update} />
                    <input name="os_cyl" placeholder="CYL" value={form.os_cyl} onChange={update} />
                    <input name="os_axis" placeholder="Axis" value={form.os_axis} onChange={update} />
                    <input name="os_add" placeholder="Add" value={form.os_add} onChange={update} />
                    <input name="os_prism_h" placeholder="Prism Horizontal" value={form.os_prism_h} onChange={update} />
                    <input name="os_prism_v" placeholder="Prism Vertical" value={form.os_prism_v} onChange={update} />
                </div>

                {/* PD */}
                <h2 style={{ marginTop: "1rem" }}>PD (Pupillary Distance)</h2>
                <div>
                    <input name="pd_single" placeholder="Single PD" value={form.pd_single} onChange={update} />
                    <input name="pd_od" placeholder="OD PD" value={form.pd_od} onChange={update} />
                    <input name="pd_os" placeholder="OS PD" value={form.pd_os} onChange={update} />
                </div>

                {/* Lens Options */}
                <h2 style={{ marginTop: "1rem" }}>Lens Options</h2>
                <div>
                    <input name="lensType" placeholder="Lens Type (SV, BF, PAL)" value={form.lensType} onChange={update} />
                    <input name="treatment" placeholder="Treatment (AR, Blue Light, etc.)" value={form.treatment} onChange={update} />
                    <input name="coating" placeholder="Coating (Scratch, UV, etc.)" value={form.coating} onChange={update} />
                </div>

                <button type="submit" style={{ marginTop: "1.5rem" }}>
                    Save Prescription
                </button>
            </form>
        </div>
    );
}
