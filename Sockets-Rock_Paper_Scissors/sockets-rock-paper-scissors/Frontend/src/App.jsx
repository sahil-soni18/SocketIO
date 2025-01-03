import React from "react";
import { GameProvider } from "./context/GameContext";
import RoomInput from "./components/RoomInput";
import PlayAgainButton from "./components/PlayAgain";
import Game from "./components/Game";
import ScoreBoard from "./components/ScoreBoard";
import GameBoard from "./components/GameBoard";

const App = () => {
  return (
    <GameProvider>
      <div className="app">
        <h1>Rock Paper Scissors Game</h1>
        <RoomInput />
        <GameBoard />
        <ScoreBoard />
        <Game />
        <PlayAgainButton />
      </div>
    </GameProvider>
  );
};

export default App;
