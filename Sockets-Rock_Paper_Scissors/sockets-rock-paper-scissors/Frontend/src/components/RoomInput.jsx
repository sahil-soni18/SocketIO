import React, { useContext, useState } from "react";
import { GameContext } from "../context/GameContext";

const RoomInput = () => {
  const { joinRoom, leaveRoom, room } = useContext(GameContext);
  const [inputValue, setInputValue] = useState("");

  const handleJoin = () => {
    if (inputValue.trim()) {
      joinRoom(inputValue.trim());
      setInputValue(""); // Clear input after joining
    }
  };

  const handleLeave = () => {
    leaveRoom();
  };

  return (
    <div className="room-input">
      {room ? (
        <>
          <p>Joined Room: <strong>{room}</strong></p>
          <button onClick={handleLeave}>Leave Room</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter Room Name"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={handleJoin}>Join Room</button>
        </>
      )}
    </div>
  );
};

export default RoomInput;
