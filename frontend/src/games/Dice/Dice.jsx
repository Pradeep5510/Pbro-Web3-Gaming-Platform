import { useState } from "react";
import BaseGame from "../BaseGame";

export default function Dice() {
  const [roll, setRoll] = useState(null);

  return (
    <>
      <img style={{ maxWidth: "80%", margin: "5% 10%" }} src="/images/Dice.png" alt="Dice Game" />
    <BaseGame gameId="dice">
      {({ submitResult }) => {
        const play = () => {
          const value = Math.floor(Math.random() * 6) + 1;
          setRoll(value);

          submitResult({
            score: value,
            status: value >= 4 ? "win" : "lose",
            meta: { roll: value },
          });
        };

        return (
          <div className="card text-center">
            <h2>Dice</h2>
            <button onClick={play}>Roll</button>
            {roll && <p>Rolled: {roll}</p>}
          </div>
        );
      }}
    </BaseGame>
    </>
  );
}
