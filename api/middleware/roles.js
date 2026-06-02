import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

export function requireRole(...allowedRoles) {
    return async (req, res, next) => {
        console.log("🛑 requireRole triggered for:", req.originalUrl);

        const header = req.headers.authorization;
        if (!header) {
            console.log("❌ No token for role check");
            return res.status(403).json({ message: "Access denied" });
        }

        next();
    };
}

