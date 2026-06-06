import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet, apiDelete } from "../api";
import Card from "../components/Card";
import Grid from "../components/Grid";
import AddCard from "../components/AddCard";

export default function Patients() {
    const nav = useNavigate();
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        load();
    }, []);

    async function load() {
        setPatients(await apiGet("/patients"));
    }

    async function handleDelete(id) {
        if (!confirm("Delete this patient?")) return;
        await apiDelete(`/patients/${id}`);
        load();
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Patients</h1>

            <Grid>
                <AddCard title="Patient" to="/patients/new" />

                {patients.map(p => (
                    <Card key={p._id}>
                        <div onClick={() => nav(`/patients/${p._id}`)} style={{ cursor: "pointer" }}>
                            <h2 style={{ margin: 0 }}>
                                {p.firstName} {p.lastName}
                            </h2>
                            <p style={{ margin: "0.5rem 0", color: "#555" }}>
                                DOB: {p.dob}
                            </p>
                            <p style={{ margin: 0, color: "#777" }}>
                                Phone: {p.phone}
                            </p>
                        </div>

                        {/* ⭐ Delete button */}
                        <button
                            className="btn-outline"
                            style={{ marginTop: "1rem", color: "red" }}
                            onClick={() => handleDelete(p._id)}
                        >
                            Delete
                        </button>
                    </Card>
                ))}
            </Grid>
        </div>
    );
}
