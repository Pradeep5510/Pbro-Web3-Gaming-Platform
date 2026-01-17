import { ethers } from "ethers";
import PGT_ABI from "../abi/PGT.json";

const PGT_ADDRESS = import.meta.env.VITE_PGT_TOKEN_ADDRESS;

export async function getPGTBalance(provider, address) {
  const contract = new ethers.Contract(
    PGT_ADDRESS,
    PGT_ABI,
    provider
  );

  const balance = await contract.balanceOf(address);
  return ethers.formatUnits(balance, 18);
}
