import { connectWallet } from "../hooks/useWalletConnect";
import { loginWithWallet } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useWallet } from "../context/WalletContext";

export default function WalletConnectButton() {
  const { login } = useAuth();
  const wallet = useWallet();

  const handleConnect = async () => {
    try {
      const { provider, signer, address, network } =
        await connectWallet();

      // Login via backend (JWT)
      const token = await loginWithWallet(address, signer);

      // Save auth + wallet state
      login(token, address);
      wallet.connect({ provider, signer, address, network });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <button onClick={handleConnect}>
      Connect Wallet
    </button>
  );
}
