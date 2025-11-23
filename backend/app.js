import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import upload from "./middleware/uploadMiddleware.js"
// import connectDB from "./config/db.js";
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";

dotenv.config();
// connectDB();

const app = express();

// Middlewares
// Allow requests from your frontend URL
app.use(cors({
    origin: ["http://localhost:3000"], // Next.js frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

// Routes placeholder
app.get("/", (req, res) => {
    res.send("VTMS SaaS Backend API Running ✅");
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/companies", companyRoutes);

export default app;
