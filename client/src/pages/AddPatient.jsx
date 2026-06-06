import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../api";
import Card from "../components/Card";
import "../styles/buttons.css";

export default function AddPatient() {
    const nav = useNavigate();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        phone: "",
        email: "",
        notes: ""
    });

    function update(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function save() {
        await apiPost("/patients", form);
        nav("/patients");
    }

    return (
        <div style={{ padding: "2rem" }}>
            <button className="btn-outline" onClick={() => nav("/patients")}>
                ← Back to Patients
            </button>

            <h1>Add Patient</h1>

            <Card style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <input name="firstName" placeholder="First Name" value={form.firstName} onChange={update} />
                    <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={update} />
                    <input name="dob" placeholder="DOB (YYYY-MM-DD)" value={form.dob} onChange={update} />
                    <input name="phone" placeholder="Phone" value={form.phone} onChange={update} />
                    <input name="email" placeholder="Email" value={form.email} onChange={update} />
                    <input name="notes" placeholder="Notes" value={form.notes} onChange={update} />
                </div>
                
                <button className="btn-outline" style={{ marginTop: "1rem" }} onClick={save}>
                    Save Patient
                </button>
            </Card>
        </div>
    );
}
