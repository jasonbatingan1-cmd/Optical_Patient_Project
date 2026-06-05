import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPut } from "../api";
import { useAuth } from "../context/AuthContext.jsx";
import { can } from "../roles.js";

export default function EditLens() {
    const { id } = useParams();
    const nav = useNavigate();
    const [form, setForm] = useState(null);    
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
    useEffect(() => {
        load();
    }, []);

    async function load() {
        const data = await apiGet(`/lenses/${id}`);
        setForm(data);
    }

    function update(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await apiPut(`/lenses/${id}`, form);
        nav("/lenses");
    }

    if (!form) return <p>Loading...</p>;

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Edit Lens</h1>

            <form onSubmit={handleSubmit}>
                <input name="brand" value={form.brand} onChange={update} />
                <input name="type" value={form.type} onChange={update} />
                <input name="material" value={form.material} onChange={update} />
                <input name="index" value={form.index} onChange={update} />
                <input name="price" value={form.price} onChange={update} />

                <button type="submit" style={{ marginTop: "1rem" }}>
                    Update Lens
                </button>
            </form>
        </div>
    );
}
