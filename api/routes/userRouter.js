import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
    res.json(await User.find());
});

// GET one user
router.get("/:id", async (req, res) => {
    res.json(await User.findById(req.params.id));
});

// CREATE user
router.post("/", async (req, res) => {
    res.json(await User.create(req.body));
});

// UPDATE user
router.put("/:id", async (req, res) => {
    res.json(await User.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

// DELETE user
router.delete("/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

export default router;
