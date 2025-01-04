import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";

const ResultDisplay = () => {
  const { result, playerChoice, opponentChoice } = useContext(GameContext);

  return (
    <div className="result-display">
      <h2>Game Result</h2>
      {result ? (
        <>
          <p>You chose: {playerChoice}</p>
          <p>Opponent chose: {opponentChoice}</p>
          <p>Result: <strong>{result}</strong></p>
        </>
      ) : (
        <p>Waiting for opponent...</p>
      )}
    </div>
  );
};

export default ResultDisplay;
