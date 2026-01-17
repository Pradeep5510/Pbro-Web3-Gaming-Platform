import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { connectWallet } from "../hooks/useWallet";
import { getPGTBalance } from "../hooks/usePGT";

export default function Dashboard() {
  const { address } = useAuth();
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    async function loadBalance() {
      const { provider } = await connectWallet();
      const bal = await getPGTBalance(provider, address);
      setBalance(bal);
    }

    if (address) loadBalance();
  }, [address]);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Wallet: {address}</p>
      <p>PGT Balance: {balance}</p>
    </div>
  );
}
