import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

export default function RoleRoute({ allowedRoles, children }) {
    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;

    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
}
