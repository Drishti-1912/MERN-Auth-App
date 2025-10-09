import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://mern-auth-app-frontend-three.vercel.app",
    "https://mern-auth-app-frontend-git-main-drishtis-projects-ef8c2a2f.vercel.app"
    // Add any additional Vercel domains here
  ],
  credentials: true
}));
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);

// protected test route
import { protect } from "./middleware/authMiddleware.js";
app.get("/api/protected", protect, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
