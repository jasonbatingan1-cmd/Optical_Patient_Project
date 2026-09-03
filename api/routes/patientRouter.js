import express from "express";
import Patient from "../models/Patient.js";
import { requireRole } from "../middleware/roles.js";

const router = express.Router();

// CREATE patient
router.post("/", requireRole("admin", "optician"), async (req, res) => {
    try {
        const patient = await Patient.create(req.body);
        res.status(201).json(patient);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET all patients
router.get("/", async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE patient
router.put("/:id", requireRole("admin", "optician"), async (req, res) => {
    try {
        const updated = await Patient.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updated) return res.status(404).json({ error: "Patient not found" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE patient
router.delete("/:id", requireRole("admin", "optician"), async (req, res) => {
    try {
        const deleted = await Patient.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Patient not found" });
        res.json({ success: true });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET one patient (MUST BE LAST), otherwise it will conflict with the /:id/edit route
router.get("/:id", async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) return res.status(404).json({ error: "Patient not found" });
        res.json(patient);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;