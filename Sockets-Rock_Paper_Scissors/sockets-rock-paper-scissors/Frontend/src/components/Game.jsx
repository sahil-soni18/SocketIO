import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";

const Game = () => {
  const { room, playerChoice, computerChoice, result } = useContext(GameContext);

  return (
    <div>
      <h2>Room: {room}</h2>
      <div>
        <h3>Your Choice: {playerChoice || "None"}</h3>
        <h3>Computers Choice: {computerChoice || "None"}</h3>
      </div>
      <h3>Result: {result}</h3>
    </div>
  );
};

export default Game;
