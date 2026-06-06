import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../api";
import Card from "../components/Card";
import "../styles/buttons.css";

export default function AddLens() {
    const nav = useNavigate();

    const [form, setForm] = useState({
        brand: "",
        material: "",
        index: "",
        type: "",
        price: ""
    });

    function update(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function save() {
        await apiPost("/lenses", form);
        nav("/lenses");
    }

    return (
        <div style={{ padding: "2rem" }}>
            <button className="btn-outline" onClick={() => nav("/lenses")}>
                ← Back to Lenses
            </button>

            <h1>Add Lens</h1>

            <Card style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <input name="brand" placeholder="Brand" value={form.brand} onChange={update} />
                    <input name="material" placeholder="Material" value={form.material} onChange={update} />
                    <input name="index" placeholder="Index (e.g. 1.59, 1.67)" value={form.index} onChange={update} />
                    <input name="type" placeholder="Type (SV, PAL, BF)" value={form.type} onChange={update} />
                    <input name="price" placeholder="Price" value={form.price} onChange={update} />
                </div>

                <button className="btn-outline" style={{ marginTop: "1rem" }} onClick={save}>
                    Save Lens
                </button>
            </Card>
        </div>
    );
}
