// api.js — clean, production-ready API helper

// 🔥 Auto-detect backend URL
const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://optical-patient-project.onrender.com";

// 🔥 Helper to get token safely
function getToken() {
    return localStorage.getItem("token");
}

// 🔥 Core request wrapper
async function request(method, path, body) {
    const token = getToken();

    const res = await fetch(`${API_URL}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        credentials: "include",
        body: body ? JSON.stringify(body) : undefined
    });

    let data;
    try {
        data = await res.json();
    } catch {
        data = null;
    }

    if (!res.ok) {
        throw new Error(data?.message || "API request failed");
    }

    return data;
}

// 🔥 Exported helpers
export const apiGet = (path) => request("GET", path);
export const apiPost = (path, body) => request("POST", path, body);
export const apiPut = (path, body) => request("PUT", path, body);
export const apiDelete = (path) => request("DELETE", path);
