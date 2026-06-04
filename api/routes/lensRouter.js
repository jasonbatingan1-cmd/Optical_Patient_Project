import express from "express";
import Lens from "../models/Lens.js";

const router = express.Router();

router.get("/", async (req, res) => {
    res.json(await Lens.find());
});

router.get("/:id", async (req, res) => {
    res.json(await Lens.findById(req.params.id));
});

router.post("/", async (req, res) => {
    res.json(await Lens.create(req.body));
});

router.put("/:id", async (req, res) => {
    res.json(await Lens.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

router.delete("/:id", async (req, res) => {
    await Lens.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

export default router;
