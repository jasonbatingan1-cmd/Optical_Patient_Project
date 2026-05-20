import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../api";

export default function AddCoating() {
    const nav = useNavigate();

    const [form, setForm] = useState({
        name: "",
        type: "",
        description: "",
        price: "",
    });

    function update(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await apiPost("/coatings", form);
        nav("/coatings");
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Add Coating</h1>

            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" onChange={update} />
                <input name="type" placeholder="Type (AR, UV, Blue Light, etc.)" onChange={update} />
                <input name="description" placeholder="Description" onChange={update} />
                <input name="price" placeholder="Price" onChange={update} />

                <button type="submit" style={{ marginTop: "1rem" }}>
                    Save Coating
                </button>
            </form>
        </div>
    );
}
