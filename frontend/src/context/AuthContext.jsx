/* eslint-disable react-hooks/set-state-in-effect */
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  // Restore JWT on refresh
  useEffect(() => {
    const saved = localStorage.getItem("jwt");
    if (saved) setToken(saved);
    setAuthReady(true);
  }, []);

  const login = (jwt) => {
    localStorage.setItem("jwt", jwt);
    setToken(jwt);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        authReady,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
