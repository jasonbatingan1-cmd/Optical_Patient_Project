import express from "express";
import Frame from "../models/Frame.js";
import { requireRole } from "../middleware/roles.js";

const router = express.Router();

// GET all frames
router.get("/", async (req, res) => {
    res.json(await Frame.find());
});

// GET single frame
router.get("/:id", async (req, res) => {
    res.json(await Frame.findById(req.params.id));
});

// CREATE frame
router.post("/", requireRole("admin", "optician"), async (req, res) => {
    res.json(await Frame.create(req.body));
});

// UPDATE frame
router.put("/:id", requireRole("admin", "optician"), async (req, res) => {
    res.json(await Frame.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

// DELETE frame
router.delete("/:id", requireRole("admin", "optician"), async (req, res) => {
    await Frame.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

export default router;
