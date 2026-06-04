import express from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

console.log("📌 authRouter loaded");


const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";

// REGISTER (public)
router.post("/register", async (req, res) => {
    console.log("🔥 /auth/register HIT");
    console.log("JWT_SECRET:", JWT_SECRET);

    const { email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already in use" });

    const hashed = await bcryptjs.hash(password, 10);

    const user = await User.create({
        email,
        password: hashed,
        role: role || "user"
    });

    res.json(user);
});

// LOGIN (public)
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcryptjs.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
        { id: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.json({ token, user });
});

// CHECK SESSION (public)
router.get("/me", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.json(null);

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);
        res.json(user);
    } catch {
        res.json(null);
    }
});

// LOGOUT (public)
router.post("/logout", (req, res) => {
    res.json({ success: true });
});

export default router;
