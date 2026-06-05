import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGet, apiPost, apiPut } from "../api";
import { useAuth } from "../context/AuthContext.jsx";
import { can } from "../roles.js";

export default function EnterRx() {
    const { id } = useParams(); // patient ID
    const nav = useNavigate();
    const { user } = useAuth();

    // Role protection
    if (!can(user, "EDIT_RX")) {
        return (
            <div style={{ padding: "2rem" }}>
                <h2>🚫 Access Denied</h2>
                <p>You do not have permission to enter prescriptions.</p>
            </div>
        );
    }

    // Dropdown data
    const [lenses, setLenses] = useState([]);
    const [coatings, setCoatings] = useState([]);

    const [patient, setPatient] = useState(null);
    const [existingRx, setExistingRx] = useState(null);

    const [form, setForm] = useState({
        od_sph: "",
        od_cyl: "",
        od_axis: "",
        od_add: "",
        od_prism_h: "",
        od_prism_v: "",

        os_sph: "",
        os_cyl: "",
        os_axis: "",
        os_add: "",
        os_prism_h: "",
        os_prism_v: "",

        pd_single: "",
        pd_od: "",
        pd_os: "",

        lensType: "",
        treatment: "",
        coating: "",
    });

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            // Load patient
            const p = await apiGet(`/patients/${id}`);
            setPatient(p);

            // Load existing Rx
            const r = await apiGet(`/rx/patient/${id}`);
            if (r) {
                setExistingRx(r);
                setForm(prev => ({ ...prev, ...r }));
            }

            // Load dropdown data
            const lensList = await apiGet("/lenses");
            const coatingList = await apiGet("/coatings");

            setLenses(lensList);
            setCoatings(coatingList);
        } catch (err) {
            console.error("Error loading RX data:", err);
        }
    }

    function update(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (existingRx) {
                await apiPut(`/rx/${existingRx._id}`, form);
            } else {
                await apiPost(`/rx/${id}`, form);
            }

            nav(`/rx/${id}`);
        } catch (err) {
            console.error("RX save error:", err);
            alert("Failed to save prescription");
        }
    }

    if (!patient) return <p>Loading...</p>;

    return (
        <div style={{ padding: "2rem" }}>
            <button onClick={() => nav("/patients")} style={{ marginBottom: "1rem" }}>
                ← Back to Patients
            </button>

            <h1>{existingRx ? "Edit Prescription" : "Enter Prescription"}</h1>
            <p>
                Patient: <strong>{patient.firstName} {patient.lastName}</strong>
            </p>

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
                    <select name="lensType" value={form.lensType} onChange={update}>
                        <option value="">Select Lens Type</option>
                        {lenses.map(l => (
                            <option
                                key={l._id}
                                value={`${l.brand} ${l.material} ${l.index} ${l.type}`}
                            >
                                {l.brand} — {l.material} — {l.index} — {l.type}
                            </option>
                        ))}
                    </select>

                    <select name="coating" value={form.coating} onChange={update}>
                        <option value="">Select Coating</option>
                        {coatings.map(c => (
                            <option key={c._id} value={c.name}>
                                {c.name}
                            </option>
                        ))}
                    </select>

                    <input
                        name="treatment"
                        placeholder="Treatment Notes"
                        value={form.treatment}
                        onChange={update}
                    />
                </div>

                <button type="submit" style={{ marginTop: "1.5rem" }}>
                    {existingRx ? "Update Prescription" : "Save Prescription"}
                </button>
            </form>
        </div>
    );
}
