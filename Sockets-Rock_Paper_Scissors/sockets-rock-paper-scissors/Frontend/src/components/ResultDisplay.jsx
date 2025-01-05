import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";

const ResultDisplay = () => {
  const { result, playerChoice, opponentChoice, winnerId, playerId } =
    useContext(GameContext);

  // Display the result with clarity
  const displayResult = () => {
    if (!result) return "Waiting for opponent...";
    if (result === "It's a tie!") return "It's a tie!";
    return winnerId === playerId
      ? "Congratulations! You won this round!"
      : "Oh no! Your opponent won this round.";
  };

  return (
    <div className="result-display">
      <h2>Game Result</h2>
      {result ? (
        <>
          <p>
            <strong>Your Choice:</strong> {playerChoice || "Waiting..."}
          </p>
          <p>
            <strong>Opponents Choice:</strong> {opponentChoice || "Waiting..."}
          </p>
          <p>
            <strong>Result:</strong> <span
  className={`result-message ${
    result === "It's a tie!"
      ? "tie"
      : winnerId === playerId
      ? "won"
      : "lost"
  }`}
>
  {displayResult()}
</span>

          </p>
        </>
      ) : (
        <p>Waiting for opponent...</p>
      )}
    </div>
  );
};

export default ResultDisplay;
