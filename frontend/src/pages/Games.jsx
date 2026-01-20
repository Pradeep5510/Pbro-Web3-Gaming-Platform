import { GAME_REGISTRY } from "../games";
import GameCard from "../components/GameCard";

export default function Games() {
  return (
    <div className="container">
      <h1>Games</h1>
      <div className="grid grid-2">
        {Object.values(GAME_REGISTRY).map((game) => (
          <GameCard
            key={game.id}
            title={game.name}
            route={`/games/${game.id}`}
          />
        ))}
      </div>
    </div>
  );
}
