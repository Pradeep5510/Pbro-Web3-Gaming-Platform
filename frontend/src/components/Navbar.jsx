import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link>{" "}
      {token && (
        <>
          <Link to="/dashboard">Dashboard</Link>{" "}
          <Link to="/games">Games</Link>{" "}
          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}
