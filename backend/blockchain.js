import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

const operatorWallet = new ethers.Wallet(
  process.env.OPERATOR_PRIVATE_KEY,
  provider
);

// Minimal ABI (only what backend needs)
const GAME_MANAGER_ABI = [
  "function rewardPlayer(address player, uint256 gameId, uint256 amount) external",
  "function addGameOperator(address operator) external",
];

export const gameManager = new ethers.Contract(
  process.env.GAMEMANAGER_ADDRESS,
  GAME_MANAGER_ABI,
  operatorWallet
);
