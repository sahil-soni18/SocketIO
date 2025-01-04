import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import socket from "../socket";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [room, setRoom] = useState("");
  const [score, setScore] = useState({ player: 0, opponent: 0 });
  const [result, setResult] = useState("");
  const [playerChoice, setPlayerChoice] = useState("");
  const [opponentChoice, setOpponentChoice] = useState("");
  const [players, setPlayers] = useState([]); // New state to track players in the room

  useEffect(() => {
    // Listen for game results
    socket.on("gameResult", (gameResult) => {
      setResult(gameResult.result);
      setPlayerChoice(gameResult.playerChoice);
      setOpponentChoice(gameResult.opponentChoice);

      setScore((prevScore) => ({
        ...prevScore,
        [gameResult.winner]: prevScore[gameResult.winner] + 1,
      }));
    });

    // Listen for room state updates
    socket.on("roomState", (state) => {
      setPlayers(state.players); // Update the players list
    });

    // Listen for player choices
    socket.on("playerChoice", (choices) => {
      console.log("Received player choices:", choices); // Debugging
      setPlayerChoice(choices.playerChoice);
      setOpponentChoice(choices.opponentChoice);
    });

    // Cleanup listeners on unmount
    return () => {
      socket.off("game-result");
      socket.off("roomState");
      socket.off("playerChoice");
    };
  }, []);

  const joinRoom = (roomName) => {
    setRoom(roomName);
    socket.emit("joinRoom", roomName);
  };

  const playAgain = () => {
    setResult("");
    setPlayerChoice("");
    setOpponentChoice("");
    socket.emit("playAgain", room);
  };

  console.log("Player Choice in context:", playerChoice); // Debugging

  return (
    <GameContext.Provider
      value={{
        room,
        score,
        result,
        playerChoice,
        opponentChoice,
        players, // Expose players in the context
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