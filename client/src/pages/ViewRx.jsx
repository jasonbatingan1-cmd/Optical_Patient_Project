import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGet } from "../api";
import Card from "../components/Card";
import "../styles/buttons.css";

export default function ViewRx() {
    const { id } = useParams(); // patient ID
    const nav = useNavigate();

    const [patient, setPatient] = useState(null);
    const [rx, setRx] = useState(null);
    const [lens, setLens] = useState(null);
    const [coating, setCoating] = useState(null);
    const [frame, setFrame] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        loadData();
    }, [id]);

    async function loadData() {
        // Load patient
        const p = await apiGet(`/patients/${id}`);
        setPatient(p);

        // Load Rx
        const r = await apiGet(`/rx/patient/${id}`);
        setRx(r);

        // If Rx exists, load related objects
        if (r) {
            if (r.lensType) {
                const lensObj = await apiGet(`/lenses/${r.lensType}`);
                setLens(lensObj);
            }

            if (r.coating) {
                const coatObj = await apiGet(`/coatings/${r.coating}`);
                setCoating(coatObj);
            }

            if (r.frame) {
                const frameObj = await apiGet(`/frames/${r.frame}`);
                setFrame(frameObj);
            }
        }

        setLoaded(true);
    }

    if (!patient) return <p>Loading...</p>;

    function handlePrint() {
        window.print();
    }

    function handleEmail() {
        const subject = `Prescription for ${patient.firstName} ${patient.lastName}`;
        const body = `
Prescription Details:

OD:
  SPH: ${rx.od_sph}
  CYL: ${rx.od_cyl}
  Axis: ${rx.od_axis}
  Add: ${rx.od_add}
  Prism H: ${rx.od_prism_h}
  Prism V: ${rx.od_prism_v}

OS:
  SPH: ${rx.os_sph}
  CYL: ${rx.os_cyl}
  Axis: ${rx.os_axis}
  Add: ${rx.os_add}
  Prism H: ${rx.os_prism_h}
  Prism V: ${rx.os_prism_v}

PD:
  Single: ${rx.pd_single}
  OD: ${rx.pd_od}
  OS: ${rx.pd_os}

Lens:
  ${lens ? `${lens.brand} – ${lens.material} – ${lens.index} – ${lens.type}` : "None"}

Coating:
  ${coating ? coating.name : "None"}

Frame:
  ${frame ? `${frame.brand} – ${frame.model}` : "None"}
`;

        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }

    return (
        <div style={{ padding: "2rem" }}>
            <button className="btn-outline" onClick={() => nav(`/patients/${id}`)}>
                ← Back to Patient
            </button>

            <h1>Prescription</h1>
            <p>
                Patient: <strong>{patient.firstName} {patient.lastName}</strong>
            </p>

            {/* ⭐ No Rx */}
            {loaded && !rx && (
                <Card style={{ marginTop: "1rem", padding: "1.5rem" }}>
                    <h2>No prescription found</h2>
                    <p>This patient does not have a prescription yet.</p>

                    <button
                        className="btn-outline"
                        style={{ marginTop: "1rem" }}
                        onClick={() => nav(`/patients/${id}/rx/new`)}
                    >
                        Create Prescription
                    </button>
                </Card>
            )}

            {/* ⭐ Rx exists */}
            {rx && (
                <Card style={{ marginTop: "1rem", padding: "1.5rem" }}>
                    <h2>Right Eye (OD)</h2>
                    <p>SPH: {rx.od_sph}</p>
                    <p>CYL: {rx.od_cyl}</p>
                    <p>Axis: {rx.od_axis}</p>
                    <p>Add: {rx.od_add}</p>
                    <p>Prism H: {rx.od_prism_h}</p>
                    <p>Prism V: {rx.od_prism_v}</p>

                    <h2 style={{ marginTop: "1.5rem" }}>Left Eye (OS)</h2>
                    <p>SPH: {rx.os_sph}</p>
                    <p>CYL: {rx.os_cyl}</p>
                    <p>Axis: {rx.os_axis}</p>
                    <p>Add: {rx.os_add}</p>
                    <p>Prism H: {rx.os_prism_h}</p>
                    <p>Prism V: {rx.os_prism_v}</p>

                    <h2 style={{ marginTop: "1.5rem" }}>PD</h2>
                    <p>Single: {rx.pd_single}</p>
                    <p>OD: {rx.pd_od}</p>
                    <p>OS: {rx.pd_os}</p>

                    <h2 style={{ marginTop: "1.5rem" }}>Lens Options</h2>

                    <p>
                        <strong>Lens:</strong>{" "}
                        {lens
                            ? `${lens.brand} – ${lens.material} – ${lens.index} – ${lens.type}`
                            : "None"}
                    </p>

                    <p>
                        <strong>Coating:</strong>{" "}
                        {coating ? coating.name : "None"}
                    </p>

                    <p>
                        <strong>Frame:</strong>{" "}
                        {frame ? `${frame.brand} – ${frame.model}` : "None"}
                    </p>

                    <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
                        <button className="btn-outline" onClick={handlePrint}>
                            🖨️ Print
                        </button>

                        <button className="btn-outline" onClick={handleEmail}>
                            ✉️ Email
                        </button>
                    </div>
                    
                    <button
                        className="btn-outline"
                        style={{ marginTop: "1.5rem" }}
                        onClick={() => nav(`/patients/${id}/rx/edit`)}
                    >
                        Update Prescription
                    </button>
                </Card>
            )}
        </div>
    );
}
