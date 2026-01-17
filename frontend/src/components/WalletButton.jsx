import { connectWallet } from "../hooks/useWallet";
import { loginWithWallet } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function WalletButton() {
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const { signer, address } = await connectWallet();
      const token = await loginWithWallet(address, signer);
      login(token, address);
    } catch (err) {
      alert(err.message);
    }
  };

  return <button onClick={handleLogin}>Connect Wallet & Login</button>;
}
