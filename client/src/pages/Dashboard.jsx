import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
    const { user } = useAuth();

    return (
        <div>
            <h1>Dashboard</h1>

            {user.role === "admin" && (
                <p>Welcome Admin — you have full system access.</p>
            )}

            {user.role === "manager" && (
                <p>Welcome Manager — you can manage staff and reports.</p>
            )}

            {user.role === "optician" && (
                <p>Welcome Optician — you can manage patient orders.</p>
            )}
        </div>
    );
}
