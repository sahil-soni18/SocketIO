// backend/server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import determineWinner from "./game.js"
import cors from "cors";
import determineMultiplayerWinner from "./Multiplayer.js";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Allow Vite dev server
        methods: ["GET", "POST"],
      },
});

// Serve static files from the React app
app.use(express.static("../frontend/dist"));


const roomData = {};
// Handle socket connections
io.on("connection", (socket) => {
  console.log("A User Connected: ", socket.id);

  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);
    io.to(room).emit("message", `User ${socket.id} has joined room: ${room}`);
  });

  socket.on("playerChoice", ({ room, choice }) => {
    if (!roomData[room]) {
      roomData[room] = {};
    }

    roomData[room][socket.id] = choice;

    // Check if two players have chosen
    if (Object.keys(roomData[room]).length === 2) {
      const players = Object.keys(roomData[room]);
      const player1Choice = roomData[room][players[0]];
      const player2Choice = roomData[room][players[1]];

      const result = determineMultiplayerWinner(player1Choice, player2Choice);
      io.to(room).emit("gameResult", result);

      // Reset room data
      roomData[room] = {};
    }
  });

  socket.on("leaveRoom", (room) => {
    socket.leave(room);
    console.log(`User ${socket.id} left room: ${room}`);
    io.to(room).emit("message", `User ${socket.id} has left room: ${room}`);
  });

  socket.on("player-choice", (choice) => {
    console.log(`Player's Choice: ${choice}`);
    // Randomly generate the computer's choice
    const computerChoice = ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];
    console.log(`Computer's Choice: ${computerChoice}`);

    // Determine the winner
    const result = determineWinner(choice, computerChoice);
    io.emit("game-result", {
      result,
      playerChoice: choice,
      computerChoice,
      winner: result === "player" ? "player" : result === "computer" ? "computer" : "none",
    });
  });

  socket.on("playAgain", (room) => {
    io.to(room).emit("resetGame");
  });
  

  socket.on("disconnect", () => {
    console.log("A User Disconnected: ", socket.id);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
