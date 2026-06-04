import express from "express";
import Rx from "../models/Prescription.js";
import { requireRole } from "../middleware/roles.js";

const router = express.Router();

/**
 * GET latest Rx for a patient
 * Everyone logged in can view
 */
router.get("/patient/:patientId", async (req, res) => {
    try {
        const rx = await Rx.findOne({ patient: req.params.patientId })
            .sort({ createdAt: -1 });

        res.json(rx);
    } catch (err) {
        console.error("RX FETCH ERROR:", err);
        res.status(500).json({ message: "Failed to fetch prescription" });
    }
});

/**
 * GET single Rx by ID
 * Everyone logged in can view
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
 * Admin + Optician only
 */
router.post(
    "/:id",
    requireRole("admin", "optician"),
    async (req, res) => {
        try {
            const saved = await Rx.create({
                patient: req.params.id,
                ...req.body
            });

            res.json(saved);
        } catch (err) {
            console.error("RX SAVE ERROR:", err);
            res.status(500).json({ message: "Failed to save prescription" });
        }
    }
);

/**
 * UPDATE Rx
 * Admin + Optician only
 */
router.put(
    "/:id",
    requireRole("admin", "optician"),
    async (req, res) => {
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
    }
);

/**
 * DELETE Rx
 * Admin + Optician only
 */
router.delete(
    "/:id",
    requireRole("admin", "optician"),
    async (req, res) => {
        try {
            await Rx.findByIdAndDelete(req.params.id);
            res.json({ success: true });
        } catch (err) {
            console.error("RX DELETE ERROR:", err);
            res.status(500).json({ message: "Failed to delete prescription" });
        }
    }
);

export default router;