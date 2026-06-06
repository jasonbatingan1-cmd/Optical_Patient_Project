import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGet, apiPut } from "../api";
import Card from "../components/Card";

export default function EditFrame() {
    const { id } = useParams();
    const nav = useNavigate();

    const [form, setForm] = useState({
        brand: "",
        model: "",
        color: "",
        price: ""
    });

    useEffect(() => {
        apiGet(`/frames/${id}`).then(data => setForm(data));
    }, [id]);

    function update(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function save() {
        await apiPut(`/frames/${id}`, form);
        nav("/frames");
    }

    return (
        <div style={{ padding: "2rem" }}>
            <button onClick={() => nav("/frames")}>← Back</button>
            <h1>Edit Frame</h1>

            <Card>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <input name="brand" value={form.brand} onChange={update} placeholder="Brand" />
                    <input name="model" value={form.model} onChange={update} placeholder="Model" />
                    <input name="color" value={form.color} onChange={update} placeholder="Color" />
                    <input name="price" value={form.price} onChange={update} placeholder="Price" />
                </div>

                <button onClick={save} style={{ marginTop: "1.5rem" }}>
                    Save Changes
                </button>
            </Card>
        </div>
    );
}
