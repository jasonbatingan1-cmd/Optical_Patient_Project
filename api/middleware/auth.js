const API_BASE = "http://localhost:3000";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";

export function verifyToken(req, res, next) {
    console.log("Headers received:", req.headers);
    console.log("verifyToken middleware stack index:", req._middlewareIndex);


    console.log("🔐 verifyToken triggered for:", req.originalUrl);

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Invalid token format" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log("JWT VERIFY ERROR:", err.message);

        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

