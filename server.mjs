import express from 'express';
import connectDB from "./db/conn.mjs";
import cors from 'cors';
import dotenv from 'dotenv';
import { globalErr, log } from "./middleware/middleware.mjs";

// Routes
import Countdown from "./routes/countdownRoutes.mjs";
import Comment from "./routes/commentsRoutes.mjs";
import Post from "./routes/postsRoutes.mjs";


// Setups
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(log);
app.use(cors({ origin: 'http://http://localhost:5173', credentials: true }));

// Routes 
app.use("/api/posts", postsRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/countdown", countdownRoutes);

app.get("/api/countdown", (req, res) => {
  const christmas = new Date(new Date().getFullYear(), 11, 25);
  const now = new Date();
  const diff = christmas - now;

  res.json({
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  });
});

// Listener
app.get("/", (req, res) => {
  res.send("Server is running! Use /api/post");
});

app.listen(PORT, () => {
    console.log(`Server Running on Port: ${PORT}`)
});