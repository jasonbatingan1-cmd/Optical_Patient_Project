import { useNavigate } from "react-router-dom";
import Card from "./Card";
import "../styles/buttons.css";

export default function AddCard({ title, to }) {
    const nav = useNavigate();

    return (
        <Card style={{ marginBottom: "1.5rem", padding: "1.5rem" }}>
            <h2>{title}</h2>
            <button
                className="btn-outline"
                style={{ marginTop: "1rem" }}
                onClick={() => nav(to)}
            >
                + Add {title}
            </button>
        </Card>
    );
}
