import express from "express";
import Coating from "../models/Coat.js";

const router = express.Router();

router.get("/", async (req, res) => {
    res.json(await Coating.find());
});

router.get("/:id", async (req, res) => {
    res.json(await Coating.findById(req.params.id));
});

router.post("/", async (req, res) => {
    res.json(await Coating.create(req.body));
});

router.put("/:id", async (req, res) => {
    res.json(await Coating.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

router.delete("/:id", async (req, res) => {
    await Coating.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

export default router;
