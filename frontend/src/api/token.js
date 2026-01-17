import { ethers } from "ethers";

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)"
];

export async function getPGTBalance(provider, userAddress) {
  const tokenAddress = import.meta.env.VITE_PGT_TOKEN_ADDRESS;

  const token = new ethers.Contract(
    tokenAddress,
    ERC20_ABI,
    provider
  );

  const balance = await token.balanceOf(userAddress);
  return ethers.formatEther(balance);
}
