import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";

const ScoreBoard = () => {
  const { players, score } = useContext(GameContext);

  return (
    <div className="score-board">
      <h1>Players in the room: </h1>
      <ul>
    {players.map((player, index) => (
      <li key={index}>{player}</li>
    ))}
  </ul>
      <h2>Scoreboard</h2>
      {players.length > 0 ? (
        players.map((player) => (
          <p key={player}>
            {player}: {score[player] || 0} points
          </p>
        ))
      ) : (
        <p>No players in the room</p>
      )}
    </div>
  );
};

export default ScoreBoard;
