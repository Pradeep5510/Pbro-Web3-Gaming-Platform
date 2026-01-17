import { useAuth } from "../context/AuthContext";
import { submitGameResult } from "../api/game";

export default function Games() {
  const { token } = useAuth();

  const playGame = async () => {
    await submitGameResult(token, 1, 100);
    alert("Game result submitted");
  };

  return (
    <div>
      <h2>Games</h2>
      <button onClick={playGame}>Play Demo Game</button>
    </div>
  );
}
