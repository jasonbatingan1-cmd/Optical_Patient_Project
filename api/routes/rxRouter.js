import express from "express";
import Rx from "../models/Prescription.js";
import { requireRole } from "../middleware/roles.js";

const router = express.Router();

// GET all Rx for a patient
router.get("/patient/:patientId", requireRole("admin", "optician"), async (req, res) => {
    const list = await Rx.find({ patient: req.params.patientId });
    res.json(list);
});

// GET single Rx
router.get("/:id", requireRole("admin", "optician"), async (req, res) => {
    res.json(await Rx.findById(req.params.id));
});

// CREATE Rx
router.post("/", requireRole("admin", "optician"), async (req, res) => {
    res.json(await Rx.create(req.body));
});

// UPDATE Rx
router.put("/:id", requireRole("admin", "optician"), async (req, res) => {
    res.json(await Rx.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

// DELETE Rx
router.delete("/:id", requireRole("admin", "optician"), async (req, res) => {
    await Rx.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

export default router;
