import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet, apiDelete } from "../api";
import Card from "../components/Card";
import Grid from "../components/Grid";
import AddCard from "../components/AddCard";

export default function Frames() {
    const nav = useNavigate();
    const [frames, setFrames] = useState([]);

    useEffect(() => {
        load();
    }, []);

    async function load() {
        setFrames(await apiGet("/frames"));
    }

    async function handleDelete(id) {
        if (!confirm("Delete this frame?")) return;
        await apiDelete(`/frames/${id}`);
        load();
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Frames</h1>

            <Grid>
                <AddCard title="Frame" to="/frames/new" />

                {frames.map(f => (
                    <Card key={f._id}>
                        <div>
                            <h2 style={{ margin: 0 }}>{f.brand}</h2>
                            <p style={{ margin: "0.5rem 0", color: "#555" }}>
                                Model: {f.model}
                            </p>
                            <p style={{ margin: 0, color: "#777" }}>
                                Size: {f.size}
                            </p>
                        </div>

                        {/* ⭐ Delete button */}
                        <button
                            className="btn-outline"
                            style={{ marginTop: "1rem", color: "red" }}
                            onClick={() => handleDelete(f._id)}
                        >
                            Delete
                        </button>
                    </Card>
                ))}
            </Grid>
        </div>
    );
}
