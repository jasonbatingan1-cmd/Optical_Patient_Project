import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../api";

export default function AddFrame() {
    const nav = useNavigate();

    const [form, setForm] = useState({
        brand: "",
        model: "",
        color: "",
        size: "",
        price: ""
    });

    function update(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await apiPost("/frames", form);
        nav("/frames");
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Add Frame</h1>

            <form onSubmit={handleSubmit}>
                <input name="brand" placeholder="Brand" onChange={update} />
                <input name="model" placeholder="Model" onChange={update} />
                <input name="color" placeholder="Color" onChange={update} />
                <input name="size" placeholder="Size" onChange={update} />
                <input name="price" placeholder="Price" onChange={update} />

                <button type="submit" style={{ marginTop: "1rem" }}>
                    Save Frame
                </button>
            </form>
        </div>
    );
}
