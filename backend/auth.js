import dotenv from "dotenv";
dotenv.config();

import express from "express";
import jwt from "jsonwebtoken";
import { ethers } from "ethers";
import { nonces } from "./authStore.js";
import { User } from "./models/User.js";
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET not set in environment");
}
const JWT_EXPIRY = "1h";

/**
 * GET /auth/nonce?address=0x...
 */
router.get("/nonce", (req, res) => {
  const { address } = req.query;

  if (!ethers.isAddress(address)) {
    return res.status(400).json({ error: "Invalid wallet address" });
  }

  const nonce = `Login to Pbro Gaming Platform: ${Math.floor(
    Math.random() * 1_000_000
  )}`;

  nonces.set(address.toLowerCase(), nonce);
  res.json({ nonce });
});

/**
 * POST /auth/verify
 */
router.post("/verify", async (req, res) => {
  console.log("VERIFY BODY:", req.body);

  const { address, signature } = req.body;

  if (!ethers.isAddress(address) || !signature) {
    return res.status(400).json({ error: "Invalid request" });
  }

  const nonce = nonces.get(address.toLowerCase());
  if (!nonce) {
    return res.status(400).json({ error: "Nonce not found" });
  }

  const recoveredAddress = ethers.verifyMessage(nonce, signature);

  if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
    return res.status(401).json({ error: "Signature verification failed" });
  }

  // One-time nonce
  nonces.delete(address.toLowerCase());

  // Create or update user
  let user = await User.findOne({ walletAddress: address.toLowerCase() });
  if (!user) {
    user = await User.create({ walletAddress: address.toLowerCase() });
  }
  user.lastLoginAt = new Date();
  await user.save();

  const token = jwt.sign(
    { address },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  );

  res.json({ token });
});

export default router;
