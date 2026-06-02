import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(true);

    // Auto-load user on refresh
    useEffect(() => {
        async function fetchUser() {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await fetch("http://localhost:3000/auth/me", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const data = await res.json();

                if (data) {
                    setUser(data);
                } else {
                    logout();
                }
            } catch {
                logout();
            }

            setLoading(false);
        }

        fetchUser();
    }, [token]);

    // Login function
    async function login(email, password) {
        const res = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser(data.user);
    }

    // Logout function
    function logout() {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                isAuthenticated: !!user,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
