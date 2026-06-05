import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../api";
import { useAuth } from "../context/AuthContext.jsx";
import { can } from "../roles.js";

export default function AddLens() {
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

    const [form, setForm] = useState({
        brand: "",
        type: "",
        material: "",
        index: "",
        price: ""
    });

    function update(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await apiPost("/lenses", form);
        nav("/lenses");
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Add Lens</h1>

            <form onSubmit={handleSubmit}>
                <input name="brand" placeholder="Brand" onChange={update} />
                <input name="type" placeholder="Type" onChange={update} />
                <input name="material" placeholder="Material" onChange={update} />
                <input name="index" placeholder="Index" onChange={update} />
                <input name="price" placeholder="Price" onChange={update} />

                <button type="submit" style={{ marginTop: "1rem" }}>
                    Save Lens
                </button>
            </form>
        </div>
    );
}
