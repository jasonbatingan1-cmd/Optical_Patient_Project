import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPut } from "../api";

export default function EditPatient() {
    const { id } = useParams();
    const nav = useNavigate();
    const [form, setForm] = useState(null);

    useEffect(() => {
        load();
    }, []);

    async function load() {
        const data = await apiGet(`/patients/${id}`);
        setForm(data);
    }

    function update(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await apiPut(`/patients/${id}/edit`, form);
        nav("/patients");
    }

    if (!form) return <p>Loading...</p>;

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Edit Patient</h1>

            <form onSubmit={handleSubmit}>
                <input name="firstName" value={form.firstName} onChange={update} />
                <input name="lastName" value={form.lastName} onChange={update} />
                <input name="dob" value={form.dob} onChange={update} />
                <input name="phone" value={form.phone} onChange={update} />
                <input name="email" value={form.email} onChange={update} />

                <button type="submit" style={{ marginTop: "1rem" }}>
                    Update Patient
                </button>
            </form>
        </div>
    );
}
