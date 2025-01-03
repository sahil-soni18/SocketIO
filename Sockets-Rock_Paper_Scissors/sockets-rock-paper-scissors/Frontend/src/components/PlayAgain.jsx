import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";

const PlayAgainButton = () => {
  const { playAgain } = useContext(GameContext);

  return <button onClick={playAgain}>Play Again</button>;
};

export default PlayAgainButton;
