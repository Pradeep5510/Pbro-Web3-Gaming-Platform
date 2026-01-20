export const AVIATOR_CONFIG = {
  id: "aviator",
  name: "Aviator",
  description: "Crash multiplier game. Cash out before crash.",
  type: "chance",
  mode: "singleplayer",
  rewardModel: "multiplier",

  limits: {
    minBet: 10,
    maxBet: 1000,
    maxMultiplier: 10,
  },

  rewards: {
    baseReward: 10,
    multiplierFactor: 1.0,
  },

  security: {
    backendValidation: true,
    vrfPlanned: true,
  },
};
