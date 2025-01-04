import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";
import socket from "../socket";

const Game = () => {
  const {
    room,
    players,
    score,
    playerChoice,
    opponentChoice,
    result,
    playAgain,
  } = useContext(GameContext);

  const handleChoice = (choice) => {
    if (!room) {
      alert("You must join a room to play!");
      return;
    }
    // Emit the player's choice to the server
    socket.emit("choiceMade", { room, choice });
  };

  return (
    <div>
      <h1>Rock Paper Scissors Game</h1>
      {room && <p>Joined Room: {room}</p>}

      <div>
        <h3>Players in the room:</h3>
        {players.length > 0 ? (
          <ul>
            {players.map((player, index) => (
              <li key={index}>{player}</li>
            ))}
          </ul>
        ) : (
          <p>No players in the room</p>
        )}
      </div>

      <div>
        <h3>Scoreboard</h3>
        <p>Player: {score.player}</p>
        <p>Opponent: {score.opponent}</p>
      </div>

      <div>
        <h3>Room: {room}</h3>
        <p>Your Choice: {playerChoice || "None"}</p>
        <p>Opponents Choice: {opponentChoice || "None"}</p>
        <p>Result: {result || "None"}</p>
      </div>

      <div>
        <button onClick={() => handleChoice("Rock")}>Rock</button>
        <button onClick={() => handleChoice("Paper")}>Paper</button>
        <button onClick={() => handleChoice("Scissors")}>Scissors</button>
      </div>

      <button onClick={playAgain}>Play Again</button>
    </div>
  );
};

export default Game;
