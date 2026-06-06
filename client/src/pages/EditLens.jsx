import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGet, apiPut } from "../api";
import Card from "../components/Card";

export default function EditLens() {
    const { id } = useParams();
    const nav = useNavigate();

    const [form, setForm] = useState({
        brand: "",
        material: "",
        index: "",
        type: "",
        price: ""
    });

    useEffect(() => {
        apiGet(`/lenses/${id}`).then(data => setForm(data));
    }, [id]);

    function update(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function save() {
        await apiPut(`/lenses/${id}`, form);
        nav("/lenses");
    }

    return (
        <div style={{ padding: "2rem" }}>
            <button onClick={() => nav("/lenses")}>← Back</button>
            <h1>Edit Lens</h1>

            <Card>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <input name="brand" value={form.brand} onChange={update} placeholder="Brand" />
                    <input name="material" value={form.material} onChange={update} placeholder="Material" />
                    <input name="index" value={form.index} onChange={update} placeholder="Index" />
                    <input name="type" value={form.type} onChange={update} placeholder="Type" />
                    <input name="price" value={form.price} onChange={update} placeholder="Price" />
                </div>

                <button onClick={save} style={{ marginTop: "1.5rem" }}>
                    Save Changes
                </button>
            </Card>
        </div>
    );
}
