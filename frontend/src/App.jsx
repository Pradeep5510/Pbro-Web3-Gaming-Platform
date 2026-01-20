import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { ethers } from "ethers";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Games from "./pages/Games";
import NotFound from "./pages/NotFound";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import { useWallet } from "./context/WalletContext";
import GamePlay from "./pages/GamePlay";

import "./App.css";

export default function App() {
  const wallet = useWallet();

  // 🔁 Auto-reconnect wallet on refresh
  useEffect(() => {
    async function reconnect() {
      if (!window.ethereum) return;

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_accounts", []);

        if (accounts.length > 0) {
          const signer = await provider.getSigner();
          const network = await provider.getNetwork();

          wallet.connect({
            provider,
            signer,
            address: accounts[0],
            network,
          });
        }
      } catch (err) {
        console.error("Wallet reconnect failed:", err);
      }
    }

    reconnect();
  }, [wallet]);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/games"
          element={
            <ProtectedRoute>
              <Games />
            </ProtectedRoute>
          }
        />
        <Route
          path="/games/:gameId"
          element={
            <ProtectedRoute>
              <GamePlay />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
