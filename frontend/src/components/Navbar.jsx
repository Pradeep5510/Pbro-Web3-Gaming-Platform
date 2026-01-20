import { Link } from "react-router-dom";
import { useState } from "react";
import WalletSection from "./WalletSection";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { token } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        {/* Mobile Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>

        {/* Desktop Home */}
        <Link to="/" className="nav-link desktop-only">
          Home
        </Link>

        {/* Desktop Menus */}
        {token && (
          <>
            <div className="nav-dropdown desktop-only">
              <span className="nav-link">Games ▾</span>
              <div className="dropdown-menu">
                <Link to="/games/aviator">Aviator</Link>
                <Link to="/games/dice">Dice</Link>
                <Link to="/games/chess">Chess</Link>
                <Link to="/games/poker">Poker</Link>
                <Link to="/games/ludo">Ludo</Link>
              </div>
            </div>

            <div className="nav-dropdown desktop-only">
              <span className="nav-link">Dashboard ▾</span>
              <div className="dropdown-menu">
                <Link to="/dashboard">Overview</Link>
                <Link to="/dashboard#history">History</Link>
                <Link to="/dashboard#rewards">Rewards</Link>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="nav-right">
        <WalletSection />
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setMobileOpen(false)}>
            Home
          </Link>

          {token && (
            <>
              <div
                className="mobile-section"
                onClick={() => toggleSection("games")}
              >
                Games ▸
              </div>

              {openSection === "games" && (
                <div className="mobile-submenu">
                  <Link to="/games/aviator">Aviator</Link>
                  <Link to="/games/dice">Dice</Link>
                  <Link to="/games/chess">Chess</Link>
                  <Link to="/games/poker">Poker</Link>
                  <Link to="/games/ludo">Ludo</Link>
                </div>
              )}

              <div
                className="mobile-section"
                onClick={() => toggleSection("dashboard")}
              >
                Dashboard ▸
              </div>

              {openSection === "dashboard" && (
                <div className="mobile-submenu">
                  <Link to="/dashboard">Overview</Link>
                  <Link to="/dashboard#history">History</Link>
                  <Link to="/dashboard#rewards">Rewards</Link>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </nav>
  );
}
