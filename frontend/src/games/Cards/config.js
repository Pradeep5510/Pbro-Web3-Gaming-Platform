export const POKER_CONFIG = {
  id: "poker",
  name: "Poker",
  description: "Multiplayer poker game.",
  type: "skill",
  mode: "multiplayer",
  rewardModel: "competitive",

  limits: {
    minPlayers: 2,
    maxPlayers: 6,
    minBuyIn: 100,
    maxBuyIn: 10000,
  },

  rewards: {
    rakePercentage: 2,
    winnerShare: 98,
  },

  security: {
    backendValidation: true,
    antiCheat: true,
    vrfPlanned: false,
  },
};
