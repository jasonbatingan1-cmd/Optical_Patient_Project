import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to local MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ Connected to local MongoDB"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// Your routes here
import patientRoutes from "./routes/patientRouter.js";
import frameRoutes from "./routes/frameRouter.js";
import lensRoutes from "./routes/lensRouter.js";
import treatmentRoutes from "./routes/treatmentRouter.js";
import coatingRoutes from "./routes/coatRouter.js";
import userRoutes from "./routes/userRouter.js";
import authRoutes from "./routes/authRouter.js";
import rxRoutes from "./routes/rxRouter.js";

// mount routes
app.use("/patients", patientRoutes);
app.use("/frames", frameRoutes);
app.use("/lenses", lensRoutes);
app.use("/treatments", treatmentRoutes);
app.use("/coatings", coatingRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/rx", rxRoutes);

app.listen(process.env.PORT, () =>
    console.log(`🚀 API running on port ${process.env.PORT}`)
);
