/* eslint-disable react-hooks/purity */
import { useState, useRef } from "react";
import BaseGame from "../BaseGame";

export default function Aviator() {
  const [multiplier, setMultiplier] = useState(1);
  const [status, setStatus] = useState("idle");
  const crashPoint = useRef((Math.random() * 4 + 1.5).toFixed(2));

  return (
    <BaseGame gameId="aviator">
      {({ submitResult }) => {
        const start = () => {
          setStatus("flying");
          const interval = setInterval(() => {
            setMultiplier((m) => +(m + 0.02).toFixed(2));
            if (multiplier >= crashPoint.current) {
              clearInterval(interval);
              setStatus("crashed");
              submitResult({
                score: 0,
                status: "lose",
              });
            }
          }, 100);
        };

        const cashOut = () => {
          setStatus("win");
          submitResult({
            score: Math.floor(multiplier * 100),
            status: "win",
            meta: { multiplier },
          });
        };

        return (
          <div className="card text-center">
            <h2>Aviator</h2>
            <h1>{multiplier.toFixed(2)}x</h1>

            {status === "idle" && <button onClick={start}>Start</button>}
            {status === "flying" && <button onClick={cashOut}>Cash Out</button>}
            {status === "crashed" && <p>💥 Crashed</p>}
          </div>
        );
      }}
    </BaseGame>
  );
}
