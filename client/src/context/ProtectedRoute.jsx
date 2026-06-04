import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { can } from "../roles.js";

export default function ProtectedRoute({ children, permission }) {
  const { user, isAuthenticated, loading } = useAuth();

  // Still loading auth state
  if (loading) return <p>Loading...</p>;

  // Not logged in → redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but missing required permission
  if (permission && !can(user, permission)) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>🚫 Access Denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  // All good → render the page
  return children;
}
