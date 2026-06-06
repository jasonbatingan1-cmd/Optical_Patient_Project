import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet, apiDelete } from "../api";
import Card from "../components/Card";
import Grid from "../components/Grid";
import AddCard from "../components/AddCard";

export default function Lenses() {
    const nav = useNavigate();
    const [lenses, setLenses] = useState([]);

    useEffect(() => {
        load();
    }, []);

    async function load() {
        setLenses(await apiGet("/lenses"));
    }

    async function handleDelete(id) {
        if (!confirm("Delete this lens?")) return;
        await apiDelete(`/lenses/${id}`);
        load();
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Lenses</h1>
            <p>Catalog of available lenses.</p>

            <Grid>
                <AddCard title="Lens" to="/lenses/new" />

                {lenses.map(l => (
                    <Card key={l._id}>
                        <div>
                            <h2 style={{ margin: 0 }}>{l.brand}</h2>
                            <p style={{ margin: "0.5rem 0", color: "#555" }}>
                                {l.material} – {l.index}
                            </p>
                            <p style={{ margin: 0, color: "#777" }}>
                                Type: {l.type}
                            </p>
                        </div>

                        {/* ⭐ Delete button */}
                        <button
                            className="btn-outline"
                            style={{ marginTop: "1rem", color: "red" }}
                            onClick={() => handleDelete(l._id)}
                        >
                            Delete
                        </button>
                    </Card>
                ))}
            </Grid>
        </div>
    );
}
