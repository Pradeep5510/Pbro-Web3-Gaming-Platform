import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

export async function getProfile(token) {
  const res = await axios.get(`${API}/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
