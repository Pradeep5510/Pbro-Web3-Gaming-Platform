import { useAuth } from "../context/AuthContext";
import { submitGameResult } from "../api/game";

export default function BaseGame({ gameId, children }) {
  const { token } = useAuth();

  const submitResult = async (result) => {
    await submitGameResult(token, {
      gameId,
      ...result,
    });
  };

  return children({ submitResult });
}
