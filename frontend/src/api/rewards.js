import axios from "axios";

export async function fetchRewards(token) {
  return axios.get("/reward/unclaimed", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function claimRewards(token) {
  return axios.post(
    "/reward/claim",
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
}
