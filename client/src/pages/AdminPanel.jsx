import { useAuth } from "../context/AuthContext.jsx";

export default function AdminPanel() {
    const { user } = useAuth();

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Admin Panel</h1>
            <p style={styles.subtitle}>Welcome, {user?.email}</p>

            <div style={styles.cardGrid}>
                <div style={styles.card}>
                    <h3>User Management</h3>
                    <p>View, edit, and manage all users.</p>
                </div>

                <div style={styles.card}>
                    <h3>System Logs</h3>
                    <p>Monitor system activity and events.</p>
                </div>

                <div style={styles.card}>
                    <h3>Settings</h3>
                    <p>Configure application‑wide settings.</p>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: { padding: "40px" },
    title: { fontSize: "32px", marginBottom: "10px" },
    subtitle: { fontSize: "18px", marginBottom: "30px", color: "#555" },
    cardGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px"
    },
    card: {
        padding: "20px",
        borderRadius: "8px",
        background: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    }
};
