import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGet, apiPost } from "../api";
import Card from "../components/Card";
import "../styles/buttons.css";

export default function CreateRx() {
    const { id } = useParams(); // patient ID
    const nav = useNavigate();

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
        coating: "",
        frame: ""
    });

    const [lensOptions, setLensOptions] = useState([]);
    const [coatOptions, setCoatOptions] = useState([]);
    const [frameOptions, setFrameOptions] = useState([]);

    // Load dropdown options
    useEffect(() => {
        async function loadOptions() {
            const lenses = await apiGet("/lenses");
            const coats = await apiGet("/coatings");
            const frames = await apiGet("/frames");

            setLensOptions(lenses);
            setCoatOptions(coats);
            setFrameOptions(frames);
        }

        loadOptions();
    }, []);

    function update(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function save() {
        await apiPost(`/rx/${id}`, form);
        nav(`/patients/${id}/rx`);
    }

    return (
        <div style={{ padding: "2rem" }}>
            <button onClick={() => nav(`/patients/${id}`)} className="btn-outline">
                ← Back to Patient
            </button>

            <h1>Create Prescription</h1>

            <Card>
                <h2>OD (Right Eye)</h2>
                <input name="od_sph" value={form.od_sph} onChange={update} placeholder="Sphere" />
                <input name="od_cyl" value={form.od_cyl} onChange={update} placeholder="Cylinder" />
                <input name="od_axis" value={form.od_axis} onChange={update} placeholder="Axis" />
                <input name="od_add" value={form.od_add} onChange={update} placeholder="Add" />
                <input name="od_prism_h" value={form.od_prism_h} onChange={update} placeholder="Prism Horizontal" />
                <input name="od_prism_v" value={form.od_prism_v} onChange={update} placeholder="Prism Vertical" />

                <h2>OS (Left Eye)</h2>
                <input name="os_sph" value={form.os_sph} onChange={update} placeholder="Sphere" />
                <input name="os_cyl" value={form.os_cyl} onChange={update} placeholder="Cylinder" />
                <input name="os_axis" value={form.os_axis} onChange={update} placeholder="Axis" />
                <input name="os_add" value={form.os_add} onChange={update} placeholder="Add" />
                <input name="os_prism_h" value={form.os_prism_h} onChange={update} placeholder="Prism Horizontal" />
                <input name="os_prism_v" value={form.os_prism_v} onChange={update} placeholder="Prism Vertical" />

                <h2>PD</h2>
                <input name="pd_single" value={form.pd_single} onChange={update} placeholder="Single PD" />
                <input name="pd_od" value={form.pd_od} onChange={update} placeholder="PD OD" />
                <input name="pd_os" value={form.pd_os} onChange={update} placeholder="PD OS" />

                <h2>Lens Options</h2>

                <label>Lens Type</label>
                <select name="lensType" value={form.lensType} onChange={update}>
                    <option value="">Select Lens Type</option>
                    {lensOptions.map(l => (
                        <option
                            key={l._id}
                            value={l._id}   // store ID instead of text
                        >
                            {l.brand} – {l.material} – {l.index} – {l.type}
                        </option>
                    ))}
                </select>

                <label>Coating</label>
                <select name="coating" value={form.coating} onChange={update}>
                    <option value="">Select Coating</option>
                    {coatOptions.map(c => (
                        <option key={c._id} value={c._id}>
                            {c.name}
                        </option>
                    ))}
                </select>

                <label>Frame</label>
                <select name="frame" value={form.frame} onChange={update}>
                    <option value="">Select Frame</option>
                    {frameOptions.map(f => (
                        <option key={f._id} value={f._id}>
                            {f.brand} – {f.model}
                        </option>
                    ))}
                </select>

                <button onClick={save} className="btn-outline" style={{ marginTop: "1.5rem" }}>
                    Save Prescription
                </button>
            </Card>
        </div>
    );
}
