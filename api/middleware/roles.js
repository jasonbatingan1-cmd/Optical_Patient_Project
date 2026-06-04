import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

export function requireRole(...allowedRoles) {
    return (req, res, next) => {
        console.log("User role:", req.user.role);
        console.log("Allowed roles:", allowedRoles);

        if (!req.user || !req.user.role) {
            return res.status(403).json({ message: "Forbidden: no role" });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden: insufficient role" });
        }

        next();
    };
}
