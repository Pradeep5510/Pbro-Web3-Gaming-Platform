import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

export async function getUserProfile(token) {
  const res = await axios.get(`${API}/user/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function getGameHistory(token) {
  const res = await axios.get(`${API}/user/history`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
