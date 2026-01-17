import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

export async function loginWithWallet(address, signer) {
  // 1. Get nonce
  const nonceRes = await axios.get(
    `${API}/auth/nonce?address=${address}`
  );

  const nonce = nonceRes.data.nonce;

  // 2. Sign nonce
  const signature = await signer.signMessage(nonce);

  // 3. Verify
  const verifyRes = await axios.post(
    `${API}/auth/verify`,
    { address, signature },
    { headers: { "Content-Type": "application/json" } }
  );

  const token = verifyRes.data.token;
  localStorage.setItem("jwt", token);
  return token;
}
