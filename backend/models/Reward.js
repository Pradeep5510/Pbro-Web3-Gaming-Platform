import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema({
  wallet: { type: String, index: true },
  gameId: String,
  amount: Number,
  claimed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Reward", rewardSchema);
