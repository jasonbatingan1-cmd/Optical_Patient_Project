const API_URL = "http://localhost:3000";

export async function apiGet(path) {
    const token = localStorage.getItem("token");

    const res = await fetch(API_URL + path, {
        credentials: "include",
        headers: {
            "Authorization": token ? `Bearer ${token}` : ""
        }
    });
    return res.json();
}

export async function apiPost(path, body) {
    const token = localStorage.getItem("token");

    const res = await fetch(API_URL + path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : ""
        },
        credentials: "include",
        body: JSON.stringify(body)
    });
    return res.json();
}

export async function apiPut(path, body) {
    const token = localStorage.getItem("token");

    const res = await fetch(API_URL + path, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : ""
        },
        credentials: "include",
        body: JSON.stringify(body)
    });
    return res.json();
}

export async function apiDelete(path) {
    const token = localStorage.getItem("token");

    const res = await fetch(API_URL + path, {
        method: "DELETE",
        headers: {
            "Authorization": token ? `Bearer ${token}` : ""
        },
        credentials: "include"
    });
    return res.json();
}
