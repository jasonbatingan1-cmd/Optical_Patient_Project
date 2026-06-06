import express from "express";
import Rx from "../models/Prescription.js";
import { requireRole } from "../middleware/roles.js";
import mongoose from "mongoose";

const router = express.Router();

// GET all Rx
router.get("/", async (req, res) => {
    try {
        const all = await Rx.find().populate("patient");
        res.json(all);
    } catch (err) {
        console.error("RX FETCH ALL ERROR:", err);
        res.status(500).json({ message: "Failed to fetch prescriptions" });
    }
});

/**
 * ⭐ GET Rx by patient ID (MUST be above /:id)
 */
router.get("/patient/:id", async (req, res) => {
    try {
        const rx = await Rx.findOne({ patient: req.params.id });
        res.json(rx);
    } catch (err) {
        console.error("RX GET BY PATIENT ERROR:", err);
        res.status(500).json({ message: "Failed to fetch prescription" });
    }
});

/**
 * GET single Rx by Rx ID
 */
router.get("/:id", async (req, res) => {
    try {
        const rx = await Rx.findById(req.params.id);
        res.json(rx);
    } catch (err) {
        console.error("RX GET ERROR:", err);
        res.status(500).json({ message: "Failed to fetch prescription" });
    }
});

/**
 * CREATE Rx for a patient
 */
router.post("/:id", requireRole("admin", "optician"), async (req, res) => {
    try {
        const saved = await Rx.create({
            patient: new mongoose.Types.ObjectId(req.params.id),
            ...req.body
        });

        res.json(saved);
    } catch (err) {
        console.error("RX SAVE ERROR:", err);
        res.status(500).json({ message: "Failed to save prescription" });
    }
});

/**
 * UPDATE Rx
 */
router.put("/:id", requireRole("admin", "optician"), async (req, res) => {
    try {
        const updated = await Rx.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updated);
    } catch (err) {
        console.error("RX UPDATE ERROR:", err);
        res.status(500).json({ message: "Failed to update prescription" });
    }
});

/**
 * DELETE Rx
 */
router.delete("/:id", requireRole("admin", "optician"), async (req, res) => {
    try {
        await Rx.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        console.error("RX DELETE ERROR:", err);
        res.status(500).json({ message: "Failed to delete prescription" });
    }
});

export default router;