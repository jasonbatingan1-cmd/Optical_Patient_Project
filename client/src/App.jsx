import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./context/ProtectedRoute.jsx";
import RoleRoute from "./context/RoleRoute.jsx";

// NAVBAR
import NavBar from "./components/NavBar.jsx";

// AUTH
import LoginPage from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";

// DASHBOARD
import Dashboard from "./pages/Dashboard.jsx";

// ADMIN
import AdminPanel from "./pages/AdminPanel.jsx";

// PATIENTS
import Patients from "./pages/Patients.jsx";
import AddPatient from "./pages/AddPatient.jsx";
import EditPatient from "./pages/EditPatient.jsx";
import ViewPatient from "./pages/ViewPatient.jsx";

// FRAMES
import Frames from "./pages/Frames.jsx";
import AddFrame from "./pages/AddFrame.jsx";
import EditFrame from "./pages/EditFrame.jsx";

// LENSES
import Lenses from "./pages/Lenses.jsx";
import AddLens from "./pages/AddLens.jsx";
import EditLens from "./pages/EditLens.jsx";

// RX
import ViewRx from "./pages/ViewRx.jsx";
import CreateRx from "./pages/CreateRx.jsx";
import EditRx from "./pages/EditRx.jsx";

export default function App() {
  return (
    <BrowserRouter>

      {/* NAVBAR ALWAYS VISIBLE WHEN LOGGED IN */}
      <NavBar />

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ADMIN PANEL (ADMIN ONLY) */}
        <Route
          path="/admin"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <AdminPanel />
            </RoleRoute>
          }
        />

        {/* PATIENTS */}
        <Route
          path="/patients"
          element={
            <ProtectedRoute>
              <Patients />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patients/new"
          element={
            <ProtectedRoute>
              <AddPatient />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patients/:id/edit"
          element={
            <ProtectedRoute>
              <EditPatient />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patients/:id"
          element={
            <ProtectedRoute>
              <ViewPatient />
            </ProtectedRoute>
          }
        />

        {/* FRAMES */}
        <Route
          path="/frames"
          element={
            <ProtectedRoute>
              <Frames />
            </ProtectedRoute>
          }
        />

        <Route
          path="/frames/new"
          element={
            <ProtectedRoute>
              <AddFrame />
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

        {/* LENSES */}
        <Route
          path="/lenses"
          element={
            <ProtectedRoute>
              <Lenses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lenses/new"
          element={
            <ProtectedRoute>
              <AddLens />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lenses/:id/edit"
          element={
            <ProtectedRoute>
              <EditLens />
            </ProtectedRoute>
          }
        />

        {/* RX */}
        <Route
          path="/patients/:id/rx"
          element={
            <ProtectedRoute>
              <ViewRx />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patients/:id/rx/new"
          element={
            <ProtectedRoute>
              <CreateRx />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patients/:id/rx/edit"
          element={
            <ProtectedRoute>
              <EditRx />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
