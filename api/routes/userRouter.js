import express from "express";
import User from "../models/User.js";
import { requireRole } from "../middleware/roles.js";

const router = express.Router();

// 🔥 CREATE USER — bootstrap admin allowed
router.post("/", async (req, res, next) => {
    console.log("🔥 /users POST HIT");
    const count = await User.countDocuments();

    // FIRST USER — allow without token
    if (count === 0) {
        const user = await User.create(req.body);
        return res.json(user);
    }

    // Otherwise require token
    next();
});

// CREATE user (admin only)
router.post("/", requireRole("admin"), async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});

// GET all users
router.get("/", requireRole("admin"), async (req, res) => {
    res.json(await User.find());
});

// GET one user
router.get("/:id", requireRole("admin"), async (req, res) => {
    res.json(await User.findById(req.params.id));
});

// UPDATE user
router.put("/:id", requireRole("admin"), async (req, res) => {
    res.json(await User.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

// DELETE user
router.delete("/:id", requireRole("admin"), async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

export default router;
