import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔍 GLOBAL REQUEST LOGGER
app.use((req, res, next) => {
    console.log(`➡️  Incoming: ${req.method} ${req.originalUrl}`);
    next();
});

console.log("Server listening on:", process.env.PORT);


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// ROUTES
import authRoutes from "./routes/authRouter.js";
import userRoutes from "./routes/userRouter.js";
import patientRoutes from "./routes/patientRouter.js";
import frameRoutes from "./routes/frameRouter.js";
import lensRoutes from "./routes/lensRouter.js";
import treatmentRoutes from "./routes/treatmentRouter.js";
import coatingRoutes from "./routes/coatRouter.js";
import rxRoutes from "./routes/rxRouter.js";

import { verifyToken } from "./middleware/auth.js";
import { requireRole } from "./middleware/roles.js";

// 🔥 LOG ROUTER MOUNTS
console.log("📌 Mounting /auth");
app.use("/auth", authRoutes);

console.log("📌 Mounting /users");
app.use("/users", userRoutes);

console.log("📌 Mounting protected routes");
app.use("/patients", verifyToken, patientRoutes);
app.use("/frames", verifyToken, frameRoutes);
app.use("/lenses", verifyToken, lensRoutes);
app.use("/treatments", verifyToken, treatmentRoutes);
app.use("/coatings", verifyToken, coatingRoutes);
app.use("/rx", verifyToken, requireRole("admin", "optician"), rxRoutes);

app.listen(process.env.PORT, () =>
    console.log(`🚀 API running on port ${process.env.PORT}`)
);
