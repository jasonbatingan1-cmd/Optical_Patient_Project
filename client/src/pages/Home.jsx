import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div style={{ padding: "3rem", textAlign: "center" }}>
            <h1>Welcome to JB Vision</h1>
            <p>Your optical management system</p>

            <Link to="/login">
                <button style={{ marginTop: "2rem", padding: "1rem 2rem" }}>
                    Login
                </button>
            </Link>
        </div>
    );
}
