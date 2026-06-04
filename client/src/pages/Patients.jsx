import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet, apiDelete } from "../api";

export default function Patients() {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        async function load() {
            const data = await apiGet("/patients");
            setPatients(data);
        }
        load();
    }, []);

    async function handleDelete(id) {
        if (!confirm("Delete this patient?")) return;
        await apiDelete(`/patients/${id}`);

        const data = await apiGet("/patients");
        setPatients(data);
    }

    return (
        <div>
            <h1>Patients</h1>

            <Link to="/patients/new">➕ Add Patient</Link>

            <table border="1" cellPadding="8" style={{ marginTop: "20px", width: "100%" }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>DOB</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {patients.map((p) => (
                        <tr key={p._id}>
                            <td>{p.firstName} {p.lastName}</td>
                            <td>{p.dob}</td>
                            <td>{p.phone}</td>
                            <td>{p.email}</td>
                            <td>{p.notes}</td>
                            <td>
                                <Link to={`/patients/${p._id}/edit`}>Edit</Link> |{" "}

                                <Link to={`/rx/${p._id}/edit`}>
                                    <button>Edit Rx</button>
                                </Link>{" "}

                                <Link to={`/rx/${p._id}`}>
                                    <button>View Rx</button>
                                </Link>{" "}

                                <button onClick={() => handleDelete(p._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
