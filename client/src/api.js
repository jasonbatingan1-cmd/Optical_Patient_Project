const API_BASE = "http://localhost:3000/api";

export async function apiGet(url) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const res = await fetch(API_BASE + url, {
        headers: {
            "Authorization": `Bearer ${token}`, // get JWT token from localStorage and include in auth header
            "Role": `${role}` // get user role from localStorage and include in auth header
        }
    });

    return res.json();
}


export async function apiPost(path, data) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const res = await fetch(`${API_BASE}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // get JWT token from localStorage and include in auth header
            "Role": `${role}` // get user role from localStorage and include in auth header
        },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function apiPut(path, data) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const res = await fetch(`${API_BASE}${path}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // get JWT token from localStorage and include in auth header
            "Role": `${role}` // get user role from localStorage and include in auth header
        },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function apiDelete(path) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const res = await fetch(`${API_BASE}${path}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`, // get JWT token from localStorage and include in auth header
            "Role": `${role}` // get user role from localStorage and include in auth header
        }
    });
    return res.json();
}
