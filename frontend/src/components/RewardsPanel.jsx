import { useState } from "react";
import { claimRewards } from "../api/rewards";

export default function RewardsPanel({ rewards, token }) {
  const [claiming, setClaiming] = useState(false);

  const total = rewards.reduce((s, r) => s + r.amount, 0);

  const handleClaim = async () => {
    setClaiming(true);
    try {
      await claimRewards(token);
      window.location.reload(); // simple & safe for MVP
    } catch (e) {
      console.error("Claim failed", e);
    } finally {
      setClaiming(false);
    }
  };

  if (total === 0) {
    return <p className="mt-2">No rewards to claim</p>;
  }

  return (
    <div className="card mt-3">
      <h3>Unclaimed Rewards</h3>
      <p>{total} PGT</p>

      <button onClick={handleClaim} disabled={claiming}>
        {claiming ? "Claiming..." : "Claim Rewards"}
      </button>
    </div>
  );
}
