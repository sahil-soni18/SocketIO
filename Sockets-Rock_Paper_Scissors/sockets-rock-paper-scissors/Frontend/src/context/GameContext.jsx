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
  const [players, setPlayers] = useState([]); // Track players in the room

  useEffect(() => {
    socket.on("gameResult", (resultData) => {
      console.log("Game Result Received:", resultData);
  
      // Set result
      setResult(resultData.result);
      console.log("Player Choices:", resultData.playerChoices);
      console.log("Socket ID:", socket.id);
    

  
      // Update scores from server
      const { scores, winnerId } = resultData;
      setScore({
        player: scores[socket.id] || 0,
        opponent:
          scores[
            Object.keys(scores).find((id) => id !== socket.id)
          ] || 0,
      });
  
      // Set choices
      setPlayerChoice(resultData.playerChoices[socket.id]);
      setOpponentChoice(
        resultData.playerChoices[
          Object.keys(resultData.playerChoices).find((id) => id !== socket.id)
        ]
      );
    });

    // Listen for room state updates
    socket.on("roomState", (state) => {
      setPlayers(state.players); // Update the players list
    });

    // Cleanup listeners on unmount
    return () => {
      socket.off("gameResult");
      socket.off("roomState");
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
