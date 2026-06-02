import express from "express";
import Treatment from "../models/Treatment.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// protect routes with authentication middleware
router.use(verifyToken);

router.get("/", async (req, res) => {
    res.json(await Treatment.find());
});

router.get("/:id", async (req, res) => {
    res.json(await Treatment.findById(req.params.id));
});

router.post("/", async (req, res) => {
    res.json(await Treatment.create(req.body));
});

router.put("/:id", async (req, res) => {
    res.json(await Treatment.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

router.delete("/:id", async (req, res) => {
    await Treatment.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

export default router;
