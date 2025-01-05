// backend/server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import determineMultiplayerWinner from "./Multiplayer.js"; // Function to determine multiplayer winner
import cors from "cors";

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

const roomData = {}; // To store room and player choices

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle joining a room
  socket.on("joinRoom", (room) => {
    console.log(`User ${socket.id} joined room: ${room}`);
    
    if (!roomData[room]) {
      roomData[room] = { players: [], choices: {} };
    }
    
    console.log("Room Data: ", roomData);
    
    
    // Add player to the room
    if (!roomData[room].players.includes(socket.id)) {
      roomData[room].players.push(socket.id);
    }
    socket.join(room);
    console.log(`Room Data: `, roomData);

  // Notify the client about the room state
  io.to(room).emit("roomState", {
    players: roomData[room].players,
    choices: roomData[room].choices,
  });
  });

  // Handle player choice
  socket.on("choiceMade", ({ room, choice }) => {
    if (!roomData[room]) return;
  
    // Save the player's choice
    roomData[room].choices[socket.id] = choice;
  
    // Check if both players have made their choices
    const playerIds = roomData[room].players;
    if (
      playerIds.length === 2 &&
      roomData[room].choices[playerIds[0]] &&
      roomData[room].choices[playerIds[1]]
    ) {
      const player1Choice = roomData[room].choices[playerIds[0]];
      const player2Choice = roomData[room].choices[playerIds[1]];
  
      // Determine the winner
      const result = determineMultiplayerWinner(player1Choice, player2Choice);
  
      // Initialize scores if not already present
      if (!roomData[room].scores) {
        roomData[room].scores = { [playerIds[0]]: 0, [playerIds[1]]: 0 };
      }
  
      // let winnerId = null;
      // if (result === "Player 1 wins!") {
      //   winnerId = playerIds[0];
      //   roomData[room].scores[playerIds[0]] += 1;
      // } else if (result === "Player 2 wins!") {
      //   winnerId = playerIds[1];
      //   roomData[room].scores[playerIds[1]] += 1;
      // }

      console.log("result", result);
      console.log("player1Choice", player1Choice);
      console.log("player2Choice", player2Choice);
      // console.log("winnerId", winnerId);
      console.log("scores", roomData[room].scores);
      console.log("----------------------------------------");
      
      
      const winnerId =
      result === "Player 1 wins!"
      ? playerIds[0]
      : result === "Player 2 wins!"
      ? playerIds[1]
      : null;
      
      console.log("winnerId", winnerId);
io.to(room).emit("gameResult", {
  result,
  playerChoices: { [playerIds[0]]: player1Choice, [playerIds[1]]: player2Choice },
  winnerId,
});
  
      // Reset choices for the next round
      roomData[room].choices = {};
    }
  });
  
  

  // Handle "play again" logic
  socket.on("playAgain", (room) => {
    if (roomData[room]) {
      roomData[room].choices = {}; // Reset choices for the room
      io.to(room).emit("resetGame");
    }
  });

  // Handle leaving a room
  socket.on("leaveRoom", (room) => {
    socket.leave(room);
    console.log(`User ${socket.id} left room: ${room}`);

    if (roomData[room]) {
      roomData[room].players = roomData[room].players.filter(
        (player) => player !== socket.id
      );

      // Notify other players in the room
      io.to(room).emit("message", `User ${socket.id} has left room: ${room}`);

      // Clean up room if empty
      if (roomData[room].players.length === 0) {
        delete roomData[room];
      }
    }
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);

    // Remove the user from any room they were part of
    for (const room in roomData) {
      if (roomData[room].players.includes(socket.id)) {
        roomData[room].players = roomData[room].players.filter(
          (player) => player !== socket.id
        );
        
        io.to(room).emit("message", `User ${socket.id} disconnected`);
        io.to(room).emit("roomState", {
          players: roomData[room].players,
          choices: roomData[room].choices,
        });

        // Clean up room if empty
        if (roomData[room].players.length === 0) {
          delete roomData[room];
        }
      }
    }
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
