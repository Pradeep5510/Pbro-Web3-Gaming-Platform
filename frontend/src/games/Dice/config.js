export const DICE_CONFIG = {
  id: "dice",
  name: "Dice",
  description: "Roll the dice and win on 4–6.",
  type: "chance",
  mode: "singleplayer",
  rewardModel: "fixed",

  limits: {
    minBet: 5,
    maxBet: 500,
  },

  rewards: {
    winReward: 20,
    loseReward: 0,
  },

  security: {
    backendValidation: true,
    vrfPlanned: true,
  },
};
