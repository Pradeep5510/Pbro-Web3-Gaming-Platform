import { useAuth } from "../context/AuthContext";
import { useWallet } from "../context/WalletContext";

export default function WalletDisconnectButton() {
  const { logout } = useAuth();
  const wallet = useWallet();

  const handleDisconnect = () => {
    logout();          // clears JWT
    wallet.disconnect(); // clears wallet state
  };

  return (
    <button className="danger" onClick={handleDisconnect}>
      Disconnect
    </button>
  );
}
