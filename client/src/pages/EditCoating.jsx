import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPut } from "../api";

export default function EditCoating() {
    const { id } = useParams();
    const nav = useNavigate();
    const [form, setForm] = useState(null);

    useEffect(() => {
        async function load() {
            const data = await apiGet(`/coatings/${id}`);
            setForm(data);
        }
        load();
    }, [id]);

    function update(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await apiPut(`/coatings/${id}`, form);
        nav("/coatings");
    }

    if (!form) return <p>Loading...</p>;

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Edit Coating</h1>

            <form onSubmit={handleSubmit}>
                <input name="name" value={form.name} onChange={update} />
                <input name="type" value={form.type} onChange={update} />
                <input name="description" value={form.description} onChange={update} />
                <input name="price" value={form.price} onChange={update} />

                <button type="submit" style={{ marginTop: "1rem" }}>
                    Update Coating
                </button>
            </form>
        </div>
    );
}
