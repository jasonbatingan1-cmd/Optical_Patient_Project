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

router.post("/", requireRole("EDIT_RX"), async (req, res) => {
    res.json(await Lens.create(req.body));
});

router.put("/:id", requireRole("EDIT_RX"), async (req, res) => {
    res.json(await Lens.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

router.delete("/:id", requireRole("EDIT_RX"), async (req, res) => {
    await Lens.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

export default router;
