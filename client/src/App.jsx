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
import AddFrame from "./pages/AddFrame";
import EditFrame from "./pages/EditFrame";
import AddLens from "./pages/AddLens";
import EditLens from "./pages/EditLens";
import AddTreatment from "./pages/AddTreatment";
import EditTreatment from "./pages/EditTreatment";
import Coatings from "./pages/Coatings";
import AddCoating from "./pages/AddCoating";
import EditCoating from "./pages/EditCoating";

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
          
          {/* Frames */}
          <Route path="/frames/new" element={<AddFrame />} />
          <Route path="/frames/:id/edit" element={<EditFrame />} />

        <Route path="/lenses" element={<Lenses />} />
          {/* Lenses */}
          <Route path="/lenses/new" element={<AddLens />} />
          <Route path="/lenses/:id/edit" element={<EditLens />} />

        <Route path="/treatments" element={<Treatments />} />
          {/* Treatments */}
          <Route path="/treatments/new" element={<AddTreatment />} />
          <Route path="/treatments/:id/edit" element={<EditTreatment />} />

        <Route path="/coatings" element={<Coatings />} />
          {/* Coatings */}
          <Route path="/coatings/new" element={<AddCoating />} />
          <Route path="/coatings/:id/edit" element={<EditCoating />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
