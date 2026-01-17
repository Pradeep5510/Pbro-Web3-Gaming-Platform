import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { ethers } from "ethers";
import authRoutes from "./auth.js";
import { gameManager } from "./blockchain.js";
import { connectDB } from "./db.js";
import { requireAuth } from "./middleware/authMiddleware.js";



const app = express();
app.use(cors());
app.use(express.json());

// ✅ AUTH ROUTES (THIS FIXES YOUR 404)
app.use("/auth", authRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Backend running" });
});

// Reward route
app.post("/reward", requireAuth, async (req, res) => {
  try {
    const { player, gameId, reward } = req.body;

    if (!ethers.isAddress(player)) {
      return res.status(400).json({ error: "Invalid wallet address" });
    }

    const amount = ethers.parseEther(reward.toString());
    const tx = await gameManager.rewardPlayer(player, gameId, amount);
    await tx.wait();

    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({
      error: "Reward failed",
      message: err.reason || err.message
    });
  }
});

// DB connect BEFORE listen
connectDB(process.env.MONGO_URI);

app.listen(4000, () => {
  console.log("🚀 Backend running on port 4000");
});
