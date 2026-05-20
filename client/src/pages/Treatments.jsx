import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet, apiDelete } from "../api";

export default function Treatments() {
    const [treatments, setTreatments] = useState([]);

    useEffect(() => {
        async function load() {
            const data = await apiGet("/treatments");
            setTreatments(data);
        }
        load();
    }, []);


    async function loadTreatments() {
        const data = await apiGet("/treatments");
        setTreatments(data);
    }

    async function handleDelete(id) {
        if (!confirm("Delete this treatment?")) return;
        await apiDelete(`/treatments/${id}`);
        loadTreatments();
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Treatments</h1>

            <Link to="/treatments/new">➕ Add Treatment</Link>

            <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {treatments.map((t) => (
                        <tr key={t._id}>
                            <td>{t.name}</td>
                            <td>{t.description}</td>
                            <td>${t.price}</td>
                            <td>
                                <Link to={`/treatments/${t._id}/edit`}>Edit</Link> |{" "}
                                <button onClick={() => handleDelete(t._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
