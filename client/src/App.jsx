import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Patients from "./pages/Patients";
import AddPatient from "./pages/AddPatient";
import EditPatient from "./pages/EditPatient";
import EnterRx from "./pages/EnterRx";
import Frames from "./pages/Frames";
import Lenses from "./pages/Lenses";
import Treatments from "./pages/Treatments";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />

        {/* Patients */}
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/new" element={<AddPatient />} />
        <Route path="/patients/:id/edit" element={<EditPatient />} />
        <Route path="/patients/:id/rx" element={<EnterRx />} />

        {/* Catalog */}
        <Route path="/frames" element={<Frames />} />
        <Route path="/lenses" element={<Lenses />} />
        <Route path="/treatments" element={<Treatments />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
