import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGet, apiPut } from "../api";

export default function EditFrame() {
    const { id } = useParams();
    const nav = useNavigate();

    const [form, setForm] = useState({
        brand: "",
        model: "",
        color: "",
        size: "",
        price: ""
    });

    useEffect(() => {
        load();
    }, []);

    async function load() {
        const data = await apiGet(`/frames/${id}`);
        setForm({
            brand: data?.brand || "",
            model: data?.model || "",
            color: data?.color || "",
            size: data?.size || "",
            price: data?.price || ""
        });

    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await apiPut(`/frames/${id}`, form);
        nav("/frames");
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Edit Frame</h1>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
                <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" />
                <input name="model" value={form.model} onChange={handleChange} placeholder="Model" />
                <input name="color" value={form.color} onChange={handleChange} placeholder="Color" />
                <input name="size" value={form.size} onChange={handleChange} placeholder="Size" />
                <input name="price" value={form.price} onChange={handleChange} placeholder="Price" />

                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}
