import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../api";
import Card from "../components/Card";
import "../styles/buttons.css";

export default function AddFrame() {
    const nav = useNavigate();

    const [form, setForm] = useState({
        brand: "",
        model: "",
        size: "",
        color: "",
        material: ""
    });

    function update(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function save() {
        await apiPost("/frames", form);
        nav("/frames");
    }

    return (
        <div style={{ padding: "2rem" }}>
            <button className="btn-outline" onClick={() => nav("/frames")}>
                ← Back to Frames
            </button>

            <h1>Add Frame</h1>

            <Card style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <input name="brand" placeholder="Brand" value={form.brand} onChange={update} />
                    <input name="model" placeholder="Model" value={form.model} onChange={update} />
                    <input name="size" placeholder="Size (e.g. 52-18-140)" value={form.size} onChange={update} />
                    <input name="color" placeholder="Color" value={form.color} onChange={update} />
                    <input name="material" placeholder="Material" value={form.material} onChange={update} />
                </div>

                <button className="btn-outline" style={{ marginTop: "1rem" }} onClick={save}>
                    Save Frame
                </button>
            </Card>
        </div>
    );
}
