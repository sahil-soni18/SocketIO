import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import socket from "../socket";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [room, setRoom] = useState("");
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [result, setResult] = useState("");
  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");

  useEffect(() => {
    socket.on("game-result", (gameResult) => {
      setResult(gameResult.result);
      setPlayerChoice(gameResult.playerChoice);
      setComputerChoice(gameResult.computerChoice);

      setScore((prevScore) => ({
        ...prevScore,
        [gameResult.winner]: prevScore[gameResult.winner] + 1,
      }));
    });

    return () => {
      socket.off("game-result");
    };
  }, []);

  const joinRoom = (roomName) => {
    setRoom(roomName);
    socket.emit("joinRoom", roomName);
  };

  const playAgain = () => {
    setResult("");
    setPlayerChoice("");
    setComputerChoice("");
    socket.emit("playAgain", room);
  };

  return (
    <GameContext.Provider
      value={{
        room,
        score,
        result,
        playerChoice,
        computerChoice,
        joinRoom,
        playAgain,
        setRoom,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Define prop types
GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
