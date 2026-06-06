import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGet, apiPut } from "../api";
import Card from "../components/Card";
import "../styles/buttons.css";

export default function EditPatient() {
    const { id } = useParams();
    const nav = useNavigate();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        phone: "",
        email: "",
        notes: ""
    });

    useEffect(() => {
        apiGet(`/patients/${id}`).then(data => setForm(data));
    }, [id]);

    function update(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function save() {
        await apiPut(`/patients/${id}`, form);
        nav(`/patients`);
    }

    return (
        <div style={{ padding: "2rem" }}>
            <button className="btn-outline" onClick={() => nav("/patients")}>
                ← Back to Patients
            </button>
            <h1>Edit Patient</h1>

            <Card>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <input name="firstName" value={form.firstName} onChange={update} placeholder="First Name" />
                    <input name="lastName" value={form.lastName} onChange={update} placeholder="Last Name" />
                    <input name="dob" value={form.dob} onChange={update} placeholder="DOB" />
                    <input name="phone" value={form.phone} onChange={update} placeholder="Phone" />
                    <input name="email" value={form.email} onChange={update} placeholder="Email" />
                    <input name="notes" value={form.notes} onChange={update} placeholder="Notes" />
                </div>

                <button className="btn-outline" onClick={save} style={{ marginTop: "1.5rem" }}>
                    Save Changes
                </button>
            </Card>
        </div>
    );
}
