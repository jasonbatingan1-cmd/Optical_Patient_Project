import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./context/ProtectedRoute.jsx";
import RoleRoute from "./context/RoleRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import LoginPage from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import NavBar from "./components/NavBar.jsx";
import Patients from "./pages/Patients.jsx";
import Coatings from "./pages/Coatings.jsx";
import Frames from "./pages/Frames.jsx";
import Lenses from "./pages/Lenses.jsx";
import EnterRx from "./pages/EnterRx.jsx";
import ViewRx from "./pages/ViewRx.jsx";
import EditFrame from "./pages/EditFrame.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin only route */}
        <Route
          path="/admin"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <AdminPanel />
            </RoleRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        <Route
          path="/patients"
          element={
            <ProtectedRoute>
              <Patients />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/coatings"
          element={
            <ProtectedRoute>
              <Coatings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/frames/:id/edit"
          element={
            <ProtectedRoute>
              <EditFrame />
            </ProtectedRoute>
          }
        />
        <Route
          path="/frames"
          element={
            <ProtectedRoute>
              <Frames />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/lenses"
          element={
            <ProtectedRoute>
              <Lenses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rx"
          element={
            <ProtectedRoute>
              <Lenses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patients/:id/rx"
          element={
            <ProtectedRoute permission="EDIT_RX">
              <EnterRx />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patients/:id/rx/view"
          element={
            <ProtectedRoute permission="VIEW_RX">
              <ViewRx />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
