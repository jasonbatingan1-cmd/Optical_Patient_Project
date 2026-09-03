// api/test/helpers.mjs
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";

export function generateToken(role = "admin") {
    return jwt.sign({ id: "000000000000000000000000", role }, JWT_SECRET, { expiresIn: "1h" });
}