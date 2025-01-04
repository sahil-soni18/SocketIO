import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";
import socket from "../socket";

const GameBoard = () => {
  const { room } = useContext(GameContext);

  const handleChoice = (choice) => {
    if (room) {
      console.log("choice", choice);
      socket.emit("playerChoice", { room, choice });
    }
  };

  return (
    <div className="game-board">
      <button onClick={() => handleChoice("rock")}>Rock</button>
      <button onClick={() => handleChoice("paper")}>Paper</button>
      <button onClick={() => handleChoice("scissors")}>Scissors</button>
    </div>
  );
};

export default GameBoard;