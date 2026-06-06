import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// CORS
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://optical-patient-project-1.onrender.com"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Logger
app.use((req, res, next) => {
    console.log(`➡️  Incoming: ${req.method} ${req.originalUrl}`);
    next();
});

// MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// ROUTES
import authRoutes from "./routes/authRouter.js";
import userRoutes from "./routes/userRouter.js";
import patientRoutes from "./routes/patientRouter.js";
import frameRoutes from "./routes/frameRouter.js";
import lensRoutes from "./routes/lensRouter.js";
import coatingRoutes from "./routes/coatRouter.js";
import rxRoutes from "./routes/rxRouter.js";

import { verifyToken } from "./middleware/auth.js";
import { requireRole } from "./middleware/roles.js";

app.use("/auth", authRoutes);
app.use("/users", verifyToken, requireRole("admin"), userRoutes);
if (process.env.NODE_ENV !== "test") {
    app.use("/patients", verifyToken, patientRoutes);
} else {
    app.use("/patients", patientRoutes); // no auth in tests
}

app.use("/frames", verifyToken, frameRoutes);
app.use("/lenses", verifyToken, lensRoutes);
app.use("/coatings", verifyToken, coatingRoutes);
app.use("/rx", verifyToken, rxRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 API running on port ${PORT}`);
});

export default app;
