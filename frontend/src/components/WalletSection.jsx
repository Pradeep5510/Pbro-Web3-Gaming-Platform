import WalletConnectButton from "./WalletConnectButton";
import { useWallet } from "../context/WalletContext";
import { useAuth } from "../context/AuthContext";

export default function WalletSection() {
  const { address, disconnect } = useWallet();
  const { token, logout } = useAuth();

  const handleDisconnect = () => {
    logout();       // remove JWT
    disconnect();   // clear wallet state
  };

  // 🔹 Not connected
  if (!token || !address) {
    return <WalletConnectButton />;
  }

  // 🔹 Connected
  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <span style={{ fontWeight: "600" }}>{shortAddress}</span>

      <button
        className="danger"
        onClick={handleDisconnect}
        title="Disconnect wallet"
        style={{
          padding: "6px 10px",
          fontSize: "14px",
        }}
      >
        ⏻
      </button>
    </div>
  );
}
