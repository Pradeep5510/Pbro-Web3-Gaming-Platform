import { GAME_REGISTRY } from "../games/config.js";

export function calculateReward(gameId, result) {
  const game = GAME_REGISTRY[gameId];

  if (!game) throw new Error("Invalid game");

  switch (game.rewardModel) {
    case "multiplier":
      return Math.floor(game.rewards.baseReward * result.meta.multiplier);

    case "fixed":
      return result.status === "win" ? game.rewards.winReward : 0;

    case "skill":
      return result.status === "win" ? game.rewards.win : 0;

    default:
      return 0;
  }
}
