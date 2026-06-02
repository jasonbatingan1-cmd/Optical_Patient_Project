import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

export function verifyToken(req, res, next) {
    console.log("🔐 verifyToken triggered for:", req.originalUrl);
    return res.status(401).json({ message: "verifyToken blocked request" });
}
