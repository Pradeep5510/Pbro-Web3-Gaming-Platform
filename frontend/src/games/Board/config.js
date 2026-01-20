export const CHESS_CONFIG = {
  id: "chess",
  name: "Chess",
  type: "skill",
  mode: "multiplayer",
  rewardModel: "elo",

  rewards: {
    win: 30,
    draw: 10,
    lose: 0,
  },

  security: {
    backendValidation: true,
    antiCheat: true,
  },
};

export const LUDO_CONFIG = {
  id: "ludo",
  name: "Ludo",
  type: "chance",
  mode: "multiplayer",
  rewardModel: "placement",

  rewards: {
    first: 50,
    second: 20,
    third: 10,
    fourth: 0,
  },

  security: {
    backendValidation: true,
  },
};
