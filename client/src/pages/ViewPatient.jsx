import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGet } from "../api";
import Card from "../components/Card";
import "../styles/buttons.css";

export default function ViewPatient() {
    const { id } = useParams(); // patient ID
    const nav = useNavigate();

    const [patient, setPatient] = useState(null);
    const [rx, setRx] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        loadData();
    }, [id]);

    async function loadData() {
        try {
            const p = await apiGet(`/patients/${id}`);
            setPatient(p);

            // ⭐ Fetch Rx and log result
            try {
                const r = await apiGet(`/rx/patient/${id}`);
                console.log("RX FETCH RESULT:", r);
                setRx(r);
            } catch (err) {
                console.error("RX FETCH ERROR:", err);
                setRx(null); // ensure null so Create button shows
            }

            setLoaded(true);
        } catch (err) {
            console.error("VIEW PATIENT LOAD ERROR:", err);
        }
    }

    if (!patient) return <p>Loading...</p>;

    return (
        <div style={{ padding: "2rem" }}>
            <button onClick={() => nav("/patients")} className="btn-outline">
                ← Back to Patients
            </button>

            <h1>Patient Details</h1>

            <Card>
                <h2>{patient.firstName} {patient.lastName}</h2>
                <p><strong>DOB:</strong> {patient.dob}</p>
                <p><strong>Phone:</strong> {patient.phone}</p>
                <p><strong>Email:</strong> {patient.email}</p>
                <p><strong>Notes:</strong> {patient.notes}</p>
            </Card>

            <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
                <button
                    onClick={() => nav(`/patients/${id}/edit`)}
                    className="btn-outline"
                >
                    Edit Patient
                </button>

                {/* ⭐ If Rx exists → View Prescription */}
                {loaded && rx && (
                    <button
                        onClick={() => nav(`/patients/${id}/rx`)}
                        className="btn-outline"
                    >
                        View Prescription
                    </button>
                )}

                {/* ⭐ If Rx does NOT exist → Create Prescription */}
                {loaded && !rx && (
                    <button
                        onClick={() => nav(`/patients/${id}/rx/new`)}
                        className="btn-outline"
                    >
                        Create Prescription
                    </button>
                )}
            </div>
        </div>
    );
}
