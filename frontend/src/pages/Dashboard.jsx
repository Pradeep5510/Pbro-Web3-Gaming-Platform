import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useWallet } from "../context/WalletContext";
import { claimRewards } from "../api/rewards";
import RewardsPanel from "../components/RewardsPanel";
import Loader from "../components/Loader";

export default function Dashboard() {
  const { token, authReady } = useAuth();
  const { address } = useWallet();

  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authReady || !token || !address) return;

    let mounted = true;

    async function loadDashboard() {
      try {
        const data = await claimRewards(token);
        if (mounted) setRewards(data);
      } catch (err) {
        console.error("Dashboard load failed", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, [authReady, token, address]);

  if (!authReady || loading) {
    return <Loader text="Loading dashboard..." />;
  }

  return (
    <div className="container">
      <h1>Dashboard</h1>

      <div className="grid grid-2 mt-2">
        <div className="stat">
          <span>Wallet</span>
          <strong>{address}</strong>
        </div>

        <div className="stat">
          <span>Unclaimed Rewards</span>
          <strong>
            {rewards.reduce((s, r) => s + r.amount, 0)} PGT
          </strong>
        </div>
      </div>

      <RewardsPanel rewards={rewards} token={token} />
    </div>
  );
}
