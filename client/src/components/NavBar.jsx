import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function NavBar() {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <nav style={styles.nav}>
            <Link to="/" style={styles.brand}>MyApp</Link>

            <div style={styles.right}>
                {isAuthenticated && (
                    <>
                        <span style={styles.userText}>
                            {user?.email} ({user?.role})
                        </span>

                        {user?.role === "admin" && (
                            <Link to="/admin" style={styles.adminLink}>
                                Admin Panel
                            </Link>
                        )}

                        <button onClick={logout} style={styles.logoutBtn}>
                            Logout
                        </button>
                    </>
                )}

                {!isAuthenticated && (
                    <Link to="/login" style={styles.loginLink}>Login</Link>
                )}
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        height: "60px",
        background: "#1976d2",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
    },
    brand: {
        color: "#fff",
        textDecoration: "none",
        fontSize: "20px",
        fontWeight: "bold"
    },
    right: {
        display: "flex",
        alignItems: "center",
        gap: "16px"
    },
    userText: {
        fontSize: "16px",
        opacity: 0.9
    },
    adminLink: {
        color: "#fff",
        textDecoration: "none",
        fontSize: "16px",
        padding: "6px 10px",
        background: "#1565c0",
        borderRadius: "4px"
    },
    logoutBtn: {
        background: "#d32f2f",
        border: "none",
        padding: "8px 14px",
        borderRadius: "4px",
        color: "#fff",
        cursor: "pointer",
        fontSize: "14px"
    },
    loginLink: {
        color: "#fff",
        textDecoration: "none",
        fontSize: "16px"
    }
};
