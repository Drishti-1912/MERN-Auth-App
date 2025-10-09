import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { protect } from "./middleware/authMiddleware.js";

dotenv.config();
connectDB();

const app = express();

// ✅ Parse incoming JSON
app.use(express.json());

// ✅ Allowed Frontend Domains
const allowedOrigins = [
  "http://localhost:3000", // local testing
  "https://mern-auth-app-frontend-three.vercel.app",
  "https://mern-auth-app-frontend-git-main-drishtis-projects-ef8c2a2f.vercel.app",
  "https://mern-auth-app-frontend-95ij2v7nn-drishtis-projects-ef8c2a2f.vercel.app" // ✅ your latest frontend domain
];

// ✅ CORS Configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests from Postman or no origin (like direct Render test)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("🚫 Blocked CORS request from:", origin);
        callback(new Error("CORS not allowed for this origin"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Root Route (checks if backend is running)
app.get("/", (req, res) => {
  res.status(200).send("✅ API is running successfully!");
});

// ✅ Auth Routes
app.use("/api/auth", authRoutes);

// ✅ Protected Route Example
app.get("/api/protected", protect, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  if (err.message.includes("CORS")) {
    res.status(403).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
