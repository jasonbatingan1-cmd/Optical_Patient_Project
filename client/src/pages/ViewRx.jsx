import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { apiGet } from "../api";
import { useAuth } from "../context/AuthContext.jsx";
import { can } from "../roles.js";

export default function ViewRx() {
    const { id } = useParams(); // patient ID
    const nav = useNavigate();
    const { user } = useAuth();

    const [patient, setPatient] = useState(null);
    const [rx, setRx] = useState(null);

    useEffect(() => {
        load();
    }, []);

    async function load() {
        const p = await apiGet(`/patients/${id}`);
        setPatient(p);

        const r = await apiGet(`/rx/patient/${id}`);
        setRx(r);
    }

    if (!patient) return <p>Loading...</p>;

    return (
        <div style={{ padding: "2rem" }}>
            <button onClick={() => nav("/patients")} style={{ marginBottom: "1rem" }}>
                ← Back to Patients
            </button>

            <h1>Prescription Details</h1>
            <p>
                Patient: <strong>{patient.firstName} {patient.lastName}</strong>
            </p>

            {!rx ? (
                <p>No prescription found for this patient.</p>
            ) : (
                <>
                    <h2>Right Eye (OD)</h2>
                    <ul>
                        <li>SPH: {rx.od_sph}</li>
                        <li>CYL: {rx.od_cyl}</li>
                        <li>Axis: {rx.od_axis}</li>
                        <li>Add: {rx.od_add}</li>
                        <li>Prism Horizontal: {rx.od_prism_h}</li>
                        <li>Prism Vertical: {rx.od_prism_v}</li>
                    </ul>

                    <h2>Left Eye (OS)</h2>
                    <ul>
                        <li>SPH: {rx.os_sph}</li>
                        <li>CYL: {rx.os_cyl}</li>
                        <li>Axis: {rx.os_axis}</li>
                        <li>Add: {rx.os_add}</li>
                        <li>Prism Horizontal: {rx.os_prism_h}</li>
                        <li>Prism Vertical: {rx.os_prism_v}</li>
                    </ul>

                    <h2>PD</h2>
                    <ul>
                        <li>Single PD: {rx.pd_single}</li>
                        <li>OD PD: {rx.pd_od}</li>
                        <li>OS PD: {rx.pd_os}</li>
                    </ul>

                    <h2>Lens Options</h2>
                    <ul>
                        <li>Lens Type: {rx.lensType}</li>
                        <li>Coating: {rx.coating}</li>
                        <li>Treatment: {rx.treatment}</li>
                    </ul>

                    {can(user, "EDIT_RX") && (
                        <Link to={`/rx/${id}/edit`}>
                            <button style={{ marginTop: "1rem" }}>Edit Prescription</button>
                        </Link>
                    )}
                </>
            )}
        </div>
    );
}
