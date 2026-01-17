import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [address, setAddress] = useState(null);

  const login = (jwt, wallet) => {
    localStorage.setItem("jwt", jwt);
    setToken(jwt);
    setAddress(wallet);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setToken(null);
    setAddress(null);
  };

  return (
    <AuthContext.Provider value={{ token, address, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
