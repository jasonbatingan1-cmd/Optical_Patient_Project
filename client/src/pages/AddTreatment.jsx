import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../api";

export default function AddTreatment() {
    const nav = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
    });

    function update(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await apiPost("/treatments", form);
        nav("/treatments");
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Add Treatment</h1>

            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" onChange={update} />
                <input name="description" placeholder="Description" onChange={update} />
                <input name="price" placeholder="Price" onChange={update} />

                <button type="submit" style={{ marginTop: "1rem" }}>
                    Save Treatment
                </button>
            </form>
        </div>
    );
}
