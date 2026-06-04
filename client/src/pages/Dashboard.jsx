import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { can } from "../roles.js";

export default function Dashboard() {
    const { user } = useAuth();

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Dashboard</h1>
            <p>Welcome, {user?.email}</p>

            <h2>Navigation</h2>
            <ul style={{ lineHeight: "2rem" }}>
                <li><Link to="/patients">Patients</Link></li>

                {can(user, "VIEW_FRAMES") && (
                    <li><Link to="/frames">Frames</Link></li>
                )}

                {can(user, "VIEW_LENSES") && (
                    <li><Link to="/lenses">Lenses</Link></li>
                )}

                {can(user, "VIEW_TREATMENTS") && (
                    <li><Link to="/treatments">Treatments</Link></li>
                )}

                {can(user, "MANAGE_USERS") && (
                    <li><Link to="/admin">Admin Panel</Link></li>
                )}
            </ul>
        </div>
    );
}
