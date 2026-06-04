import dotenv from "dotenv";
dotenv.config();import express from "express";

import mongoose from "mongoose";
import cors from "cors";

console.log("JWT_SECRET:", process.env.JWT_SECRET);

const app = express();
// CORS configuration to allow requests from the React frontend
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
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

console.log("📌 Mounting /auth");
app.use("/auth", authRoutes);

console.log("📌 Mounting protected routes");
app.use("/users", verifyToken, requireRole("admin"), userRoutes);
app.use("/patients", verifyToken, patientRoutes);
app.use("/frames", verifyToken, frameRoutes);
app.use("/lenses", verifyToken, lensRoutes);
app.use("/coatings", verifyToken, coatingRoutes);
app.use("/treatments", verifyToken, treatmentRoutes);
app.use("/rx", verifyToken, requireRole("admin", "optician"), rxRoutes);


app.listen(process.env.PORT, () =>
    console.log(`🚀 API running on port ${process.env.PORT}`)
);
