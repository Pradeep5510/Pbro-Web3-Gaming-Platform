import { Link } from "react-router-dom";

export default function GameCard({ id, title, description, route }) {
  return (
    <div className="card game-card">
      <h2>{title}</h2>
      <p>{description}</p>
      <Link to={route}>
        <button>Play</button>
      </Link>
    </div>
  );
}
