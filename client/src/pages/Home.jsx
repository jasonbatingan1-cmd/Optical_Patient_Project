import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div style={{ padding: "2rem" }}>
            <h1>JB Vision Home</h1>
            <p>Select a module to begin:</p>

            <ul style={{ marginTop: "1rem", lineHeight: "2rem" }}>
                <li><Link to="/patients">Patients</Link></li>
                <li><Link to="/frames">Frames Catalog</Link></li>
                <li><Link to="/lenses">Lenses Catalog</Link></li>
                <li><Link to="/treatments">Treatments</Link></li>
                <li><Link to="/coatings">Coatings</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </div>
    );
}
