import { createContext, useContext, useEffect, useState } from "react";

// 🔥 Auto-detect backend URL based on environment
const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://optical-patient-project.onrender.com";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    // 🔥 Load user on startup or when token changes
    useEffect(() => {
        async function loadUser() {
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`${API_URL}/auth/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = await res.json();

                if (res.ok && data) {
                    setUser(data);
                } else {
                    localStorage.removeItem("token");
                    setToken(null);
                    setUser(null);
                }
            } catch (err) {
                localStorage.removeItem("token");
                setToken(null);
                setUser(null);
            }

            setLoading(false);
        }

        loadUser();
    }, [token]);

    // 🔥 Login function used by Login.jsx
    const login = async (email, password) => {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Login failed");

        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser(data.user);
    };

    // 🔥 Logout
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                isAuthenticated: !!user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
