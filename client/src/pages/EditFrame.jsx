import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPut } from "../api";

export default function EditFrame() {
    const { id } = useParams();
    const nav = useNavigate();
    const [form, setForm] = useState(null);

    useEffect(() => {
        async function load() {
            const data = await apiGet(`/frames/${id}`);
            setForm(data);
        }
        load();
    }, [id]);

    function update(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await apiPut(`/frames/${id}`, form);
        nav("/frames");
    }

    if (!form) return <p>Loading...</p>;

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Edit Frame</h1>

            <form onSubmit={handleSubmit}>
                <input name="brand" value={form.brand} onChange={update} />
                <input name="model" value={form.model} onChange={update} />
                <input name="color" value={form.color} onChange={update} />
                <input name="size" value={form.size} onChange={update} />
                <input name="price" value={form.price} onChange={update} />

                <button type="submit" style={{ marginTop: "1rem" }}>
                    Update Frame
                </button>
            </form>
        </div>
    );
}
