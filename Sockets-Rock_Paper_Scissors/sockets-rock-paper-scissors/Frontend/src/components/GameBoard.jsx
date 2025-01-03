import  { useState } from "react";
import socket from "../socket";  // import socket connection
// import { useContext } from "react";
// import { GameContext } from "../context/GameContext";

const GameBoard = () => {
  const [choice, setChoice] = useState("");


  const handleChoice = (selection) => {
    setChoice(selection);
    socket.emit("player-choice", selection);  // Send player's choice to the backend
  };

  return (
    <div className="game-board">
      <h2>Select Your Move</h2>
      <div>
        <button onClick={() => handleChoice("rock")}>Rock</button>
        <button onClick={() => handleChoice("paper")}>Paper</button>
        <button onClick={() => handleChoice("scissors")}>Scissors</button>
      </div>
      {choice && <p>Your choice: {choice}</p>}
    </div>
  );
};

export default GameBoard;
