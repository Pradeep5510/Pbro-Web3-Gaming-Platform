import mongoose from "mongoose";

const gameHistorySchema = new mongoose.Schema(
  {
    walletAddress: {
      type: String,
      required: true,
      lowercase: true,
      index: true
    },
    gameId: {
      type: Number,
      required: true
    },
    reward: {
      type: Number,
      required: true
    },
    txHash: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export const GameHistory = mongoose.model(
  "GameHistory",
  gameHistorySchema
);
