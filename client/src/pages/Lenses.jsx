import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet, apiDelete } from "../api";

export default function Lenses() {
    const [lenses, setLenses] = useState([]);

    useEffect(() => {
        async function load() {
            const data = await apiGet("/lenses");
            setLenses(data);
        }
        load();
    }, []);


    async function loadLenses() {
        const data = await apiGet("/lenses");
        setLenses(data);
    }

    async function handleDelete(id) {
        if (!confirm("Delete this lens?")) return;
        await apiDelete(`/lenses/${id}`);
        loadLenses();
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Lenses Catalog</h1>

            <Link to="/lenses/new">➕ Add Lens</Link>

            <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th>Brand</th>
                        <th>Material</th>
                        <th>Index</th>
                        <th>Type</th>
                        <th>Coating</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {lenses.map((l) => (
                        <tr key={l._id}>
                            <td>{l.brand}</td>
                            <td>{l.material}</td>
                            <td>{l.index}</td>
                            <td>{l.type}</td>
                            <td>{l.coating}</td>
                            <td>${l.price}</td>
                            <td>
                                <Link to={`/lenses/${l._id}/edit`}>Edit</Link> |{" "}
                                <button onClick={() => handleDelete(l._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
