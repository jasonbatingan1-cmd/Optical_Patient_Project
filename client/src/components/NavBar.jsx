import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function NavBar() {
    const { user, isAuthenticated, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav style={styles.nav}>
            {/* LEFT SIDE */}
            <div style={styles.left}>
                <Link to="/dashboard" style={styles.brand}>JB Vision</Link>
            </div>

            {/* HAMBURGER (mobile only) */}
            <div style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>

            {/* RIGHT SIDE (desktop) */}
            <div style={styles.right}>
                {isAuthenticated && (
                    <>
                        <Link to="/dashboard" style={styles.link}>Dashboard</Link>

                        <span style={styles.userText}>
                            {user?.email} ({user?.role})
                        </span>

                        {user?.role === "admin" && (
                            <Link to="/admin" style={styles.link}>Admin Panel</Link>
                        )}

                        <button onClick={logout} style={styles.logoutBtn}>
                            Logout
                        </button>
                    </>
                )}

                {!isAuthenticated && (
                    <Link to="/login" style={styles.link}>Login</Link>
                )}
            </div>

            {/* MOBILE MENU */}
            {menuOpen && (
                <div style={styles.mobileMenu}>
                    {isAuthenticated && (
                        <>
                            <Link to="/dashboard" style={styles.mobileLink}>Dashboard</Link>

                            <span style={styles.mobileUser}>
                                {user?.email} ({user?.role})
                            </span>

                            {user?.role === "admin" && (
                                <Link to="/admin" style={styles.mobileLink}>Admin Panel</Link>
                            )}

                            <button onClick={logout} style={styles.mobileLogoutBtn}>
                                Logout
                            </button>
                        </>
                    )}

                    {!isAuthenticated && (
                        <Link to="/login" style={styles.mobileLink}>Login</Link>
                    )}
                </div>
            )}
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
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        position: "relative"
    },

    left: {
        flex: 1
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

    link: {
        color: "#fff",
        textDecoration: "none",
        fontSize: "16px"
    },

    userText: {
        fontSize: "16px",
        opacity: 0.9
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

    /* HAMBURGER */
    hamburger: {
        display: "none",
        fontSize: "28px",
        cursor: "pointer"
    },

    /* MOBILE MENU */
    mobileMenu: {
        position: "absolute",
        top: "60px",
        right: 0,
        width: "100%",
        background: "#1976d2",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
    },

    mobileLink: {
        color: "#fff",
        textDecoration: "none",
        fontSize: "18px"
    },

    mobileUser: {
        color: "#fff",
        fontSize: "16px",
        opacity: 0.9
    },

    mobileLogoutBtn: {
        background: "#d32f2f",
        border: "none",
        padding: "10px 16px",
        borderRadius: "4px",
        color: "#fff",
        cursor: "pointer",
        fontSize: "16px"
    },

    /* RESPONSIVE BREAKPOINT */
    "@media (max-width: 768px)": {
        right: {
            display: "none"
        },
        hamburger: {
            display: "block"
        }
    }
};
