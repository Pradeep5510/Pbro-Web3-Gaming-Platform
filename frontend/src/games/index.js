import Aviator from "./Aviator/Aviator";
import { AVIATOR_CONFIG } from "./Aviator/config";
import Dice from "./Dice/Dice";
import { DICE_CONFIG } from "./Dice/config";
import Chess from "./Board/Chess";
import Ludo from "./Board/Ludo";
import Poker from "./Cards/Poker";

export const GAME_REGISTRY = {
  aviator: {
    id: "aviator",
    name: "Aviator",
    component: Aviator,
    rewardType: "multiplier",
  },
  dice: {
    id: "dice",
    name: "Dice",
    component: Dice,
    rewardType: "fixed",
  },
  chess: {
    id: "chess",
    name: "Chess",
    component: Chess,
    rewardType: "skill",
  },
  ludo: {
    id: "ludo",
    name: "Ludo",
    component: Ludo,
    rewardType: "skill",
  },
  poker: {
    id: "poker",
    name: "Poker",
    component: Poker,
    rewardType: "competitive",
  },
};
