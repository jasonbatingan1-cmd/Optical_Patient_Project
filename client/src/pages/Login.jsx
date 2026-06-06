import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
    const nav = useNavigate();
    const { isAuthenticated, login } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await login(email, password);
            nav("/dashboard");
        } catch (err) {
            setError("Invalid email or password");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Login</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />

                    {error && <p style={styles.error}>{error}</p>}

                    <button type="submit" style={styles.button}>
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5"
    },
    card: {
        width: 360,
        padding: 32,
        borderRadius: 12,
        background: "#fff",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
    },
    title: {
        textAlign: "center",
        marginBottom: 24
    },
    input: {
        width: "100%",
        padding: 12,
        marginBottom: 12,
        borderRadius: 6,
        border: "1px solid #ccc",
        fontSize: 16
    },
    button: {
        width: "100%",
        padding: 12,
        background: "#1976d2",
        color: "#fff",
        border: "none",
        borderRadius: 6,
        fontSize: 16,
        cursor: "pointer"
    },
    error: {
        color: "red",
        marginBottom: 12
    }
};