import express from "express";
import Patient from "../models/Patient.js";
import { requireRole } from "../middleware/roles.js";

const router = express.Router();

// CREATE patient
router.post("/", async (req, res) => {
    const patient = await Patient.create(req.body);
    res.json(patient);
});

// GET all patients
router.get("/", async (req, res) => {
    const patients = await Patient.find();
    res.json(patients);
});

// UPDATE patient
router.put("/:id/edit", requireRole("EDIT_RX"), async (req, res) => {
    const updated = await Patient.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(updated);
});

// DELETE patient
router.delete("/:id", requireRole("EDIT_RX"), async (req, res) => {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

// GET one patient (MUST BE LAST), otherwise it will conflict with the /:id/edit route
router.get("/:id", async (req, res) => {
    const patient = await Patient.findById(req.params.id);
    res.json(patient);
});

export default router;
