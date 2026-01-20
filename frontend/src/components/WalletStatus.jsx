import { useWallet } from "../context/WalletContext";

export default function WalletStatus() {
  const { address, network } = useWallet();

  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="wallet-box">
      <p><strong>Wallet:</strong> {shortAddress}</p>
      <p><strong>Network:</strong> {network?.name}</p>
    </div>
  );
}
