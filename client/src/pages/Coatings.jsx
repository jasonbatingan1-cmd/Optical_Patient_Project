import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet, apiDelete } from "../api";

export default function Coatings() {
    const [coatings, setCoatings] = useState([]);

    useEffect(() => {
        async function load() {
            const data = await apiGet("/coatings");
            setCoatings(data);
        }
        load();
    }, []);


    async function loadCoatings() {
        const data = await apiGet("/coatings");
        setCoatings(data);
    }

    async function handleDelete(id) {
        if (!confirm("Delete this coating?")) return;
        await apiDelete(`/coatings/${id}`);
        loadCoatings();
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Coatings</h1>

            <Link to="/coatings/new">➕ Add Coating</Link>

            <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {coatings.map((c) => (
                        <tr key={c._id}>
                            <td>{c.name}</td>
                            <td>{c.type}</td>
                            <td>{c.description}</td>
                            <td>${c.price}</td>
                            <td>
                                <Link to={`/coatings/${c._id}/edit`}>Edit</Link> |{" "}
                                <button onClick={() => handleDelete(c._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
