import express from "express";
import Reward from "../models/Reward.js";
import { calculateReward } from "../services/rewardEngine.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/submit", auth, async (req, res) => {
  const { gameId, score, status, meta } = req.body;

  const amount = calculateReward(gameId, { score, status, meta });

  if (amount > 0) {
    await Reward.create({
      wallet: req.user.address,
      gameId,
      amount,
    });
  }

  res.json({ success: true, amount });
});

export default router;
