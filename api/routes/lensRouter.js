import express from "express";
import Lens from "../models/Lens.js";
import { requireRole } from "../middleware/roles.js";

const router = express.Router();

router.get("/", async (req, res) => {
    res.json(await Lens.find());
});

router.get("/:id", async (req, res) => {
    res.json(await Lens.findById(req.params.id));
});

// ⭐ Allow admin + optician to create lenses
router.post("/", requireRole("admin", "optician"), async (req, res) => {
    res.json(await Lens.create(req.body));
});

// ⭐ Allow admin + optician to update lenses
router.put("/:id", requireRole("admin", "optician"), async (req, res) => {
    res.json(await Lens.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

// ⭐ Allow admin + optician to delete lenses
router.delete("/:id", requireRole("admin", "optician"), async (req, res) => {
    await Lens.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

export default router;
