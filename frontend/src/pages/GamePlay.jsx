import { useParams } from "react-router-dom";
import { GAME_REGISTRY } from "../games";

export default function GamePlay() {
  const { gameId } = useParams();

  const game = GAME_REGISTRY[gameId];

  if (!game) {
    return (
      <div className="container">
        <p>Game not found</p>
      </div>
    );
  }

  const GameComponent = game.component;

  return (
    <div className="container">
      <GameComponent />
    </div>
  );
}
