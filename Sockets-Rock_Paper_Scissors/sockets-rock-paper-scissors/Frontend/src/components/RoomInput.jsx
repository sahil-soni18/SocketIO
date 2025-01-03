import React, { useContext, useState } from "react";
import { GameContext } from "../context/GameContext";

const RoomInput = () => {
  const [roomInput, setRoomInput] = useState("");
  const { joinRoom } = useContext(GameContext);

  const handleJoinRoom = () => {
    if (roomInput.trim() !== "") {
      joinRoom(roomInput);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter room name"
        value={roomInput}
        onChange={(e) => setRoomInput(e.target.value)}
      />
      <button onClick={handleJoinRoom}>Join Room</button>
    </div>
  );
};

export default RoomInput;
