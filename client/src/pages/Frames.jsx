import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet, apiDelete } from "../api";

export default function Frames() {
    const [frames, setFrames] = useState([]);

    useEffect(() => {
        //define and call load() to avoid React warning about useEffect callback being async
        async function load() {
            const data = await apiGet("/frames");
            setFrames(data);
        }
        load();
    }, []);


    async function loadFrames() {
        const data = await apiGet("/frames");
        setFrames(data);
    }

    async function handleDelete(id) {
        if (!confirm("Delete this frame?")) return;
        await apiDelete(`/frames/${id}`);
        loadFrames();
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Frames Catalog</h1>

            <Link to="/frames/new">➕ Add Frame</Link>

            <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {frames.map((f) => (
                        <tr key={f._id}>
                            <td>{f.brand}</td>
                            <td>{f.model}</td>
                            <td>{f.color}</td>
                            <td>{f.size}</td>
                            <td>${f.price}</td>
                            <td>
                                <Link to={`/frames/${f._id}/edit`}>Edit</Link> |{" "}
                                <button onClick={() => handleDelete(f._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
