import express from "express";
import Rx from "../models/Prescription.js";

const router = express.Router();

// GET all Rx for a patient
router.get("/patient/:patientId", async (req, res) => {
    const list = await Rx.find({ patient: req.params.patientId });
    res.json(list);
});

// GET single Rx
router.get("/:id", async (req, res) => {
    res.json(await Rx.findById(req.params.id));
});

// CREATE Rx
router.post("/", async (req, res) => {
    res.json(await Rx.create(req.body));
});

// UPDATE Rx
router.put("/:id", async (req, res) => {
    res.json(await Rx.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

// DELETE Rx
router.delete("/:id", async (req, res) => {
    await Rx.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

export default router;
