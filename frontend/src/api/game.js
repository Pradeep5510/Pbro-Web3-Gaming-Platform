import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

export async function submitGameResult(token, gameId, score) {
  const res = await axios.post(
    `${API}/game/submit`,
    { gameId, score },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
}
