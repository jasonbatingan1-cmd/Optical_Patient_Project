const API_BASE = "http://localhost:3000";

function getAuthHeader() {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiGet(path) {
    const res = await fetch(API_BASE + path, {
        headers: {
            ...getAuthHeader()
        }
    });
    return res.json();
}

export async function apiPost(path, body) {
    const res = await fetch(API_BASE + path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(body)
    });
    return res.json();
}

export async function apiDelete(path) {
    const res = await fetch(API_BASE + path, {
        method: "DELETE",
        headers: {
            ...getAuthHeader()
        }
    });
    return res.json();
}
