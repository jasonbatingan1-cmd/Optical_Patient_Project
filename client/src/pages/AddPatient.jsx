import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../api";

export default function AddPatient() {
    const nav = useNavigate();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        phone: "",
    });

    function update(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await apiPost("/patients", form);
        nav("/patients");
    }

    return (
        <div>
            <h1>Add Patient</h1>

            <form onSubmit={handleSubmit}>
                <input name="firstName" placeholder="First Name" onChange={update} />
                <input name="lastName" placeholder="Last Name" onChange={update} />
                <input name="dob" placeholder="DOB" onChange={update} />
                <input name="phone" placeholder="Phone" onChange={update} />

                <button type="submit">Save</button>
            </form>
        </div>
    );
}
