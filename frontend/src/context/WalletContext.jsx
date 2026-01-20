/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState(null);
  const [network, setNetwork] = useState(null);

  const connect = ({ provider, signer, address, network }) => {
    setProvider(provider);
    setSigner(signer);
    setAddress(address);
    setNetwork(network);
  };

  const disconnect = () => {
    setProvider(null);
    setSigner(null);
    setAddress(null);
    setNetwork(null);
  };

  return (
    <WalletContext.Provider
      value={{ provider, signer, address, network, connect, disconnect }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);
// End of file: frontend/src/context/WalletContext.jsx