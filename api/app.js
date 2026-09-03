import dotenv from "dotenv-flow";
dotenv.config();

import express from "express";
import cors from "cors";

const app = express();

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

app.use((req, res, next) => {
    console.log(`➡️  Incoming: ${req.method} ${req.originalUrl}`);
    next();
});

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
app.use("/patients", verifyToken, patientRoutes);
app.use("/frames", verifyToken, frameRoutes);
app.use("/lenses", verifyToken, lensRoutes);
app.use("/coatings", verifyToken, coatingRoutes);
app.use("/rx", verifyToken, rxRoutes);

export default app;