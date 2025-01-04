import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";

const PlayAgainButton = () => {
  const { playAgain, result } = useContext(GameContext);

  return (
    <div className="play-again">
      {result && <button onClick={playAgain}>Play Again</button>}
    </div>
  );
};

export default PlayAgainButton;
