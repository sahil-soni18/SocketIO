import React, { useContext } from "react";

import { GameContext } from "../context/GameContext";

const ScoreBoard = () => {

  const { score } = useContext(GameContext);
  return (
    <div className="score-board">
      <h3>Score</h3>
      <p>Player: {score.player}</p>
      <p>Computer: {score.computer}</p>
    </div>
  );
};


export default ScoreBoard;


