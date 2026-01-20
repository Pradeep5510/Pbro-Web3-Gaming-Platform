import express from "express";
import Reward from "../models/Reward.js";
import { ethers } from "ethers";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/claim", auth, async (req, res) => {
  const rewards = await Reward.find({
    wallet: req.user.address,
    claimed: false,
  });

  const total = rewards.reduce((sum, r) => sum + r.amount, 0);
  if (total === 0) return res.status(400).json({ error: "Nothing to claim" });

  // Call GameManager
  await gameManager.mintReward(req.user.address, total);

  await Reward.updateMany(
    { wallet: req.user.address, claimed: false },
    { claimed: true }
  );

  res.json({ success: true, amount: total });
});

export default router;
