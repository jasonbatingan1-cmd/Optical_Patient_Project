import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { apiPost } from "../api";

export default function LoginPage() {
    const nav = useNavigate();
    const { isAuthenticated, login } = useAuth();   // <-- FIXED

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
            await login(email, password);   // <-- correct
            nav("/dashboard");
        } catch (err) {
            setError("Invalid email or password");
        }
    };

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
