import express from "express";
import Frame from "../models/Frame.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// protect routes with authentication middleware
router.use(verifyToken);

router.get("/", async (req, res) => {
    res.json(await Frame.find());
});

router.get("/:id", async (req, res) => {
    res.json(await Frame.findById(req.params.id));
});

router.post("/", async (req, res) => {
    res.json(await Frame.create(req.body));
});

router.put("/:id", async (req, res) => {
    res.json(await Frame.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

router.delete("/:id", async (req, res) => {
    await Frame.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

export default router;
