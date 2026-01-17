import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

export async function claimReward(player, gameId, reward) {
  const token = localStorage.getItem("jwt");

  const res = await axios.post(
    `${API}/reward`,
    { player, gameId, reward },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;
}
